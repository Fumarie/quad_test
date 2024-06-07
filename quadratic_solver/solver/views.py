from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.http import JsonResponse
from rest_framework.decorators import action

from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, UserSerializer, TestSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .tests_f import get_abc, find_roots
from datetime import datetime
from .models import Test

User = get_user_model()

class UserView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        if user.is_authenticated:
            return Response({
                "user": user_serializer.data
            })
        else:
            return Response({"message": "Гость"})



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT token for the new user
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'refresh': str(refresh),
            'access': access_token,
            'user': {
                'email': user.email,
                'username': user.username,
                'name': user.name,
                'surname': user.surname,
            }
        }, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

class Quadratic_Solver(APIView):
    def get(self, request):
            user = request.user

            a = float(request.GET.get('a', 0))
            b = float(request.GET.get('b', 0))
            c = float(request.GET.get('c', 0))

            print(a)

            roots = find_roots(a, b, c)
            if roots:
                return JsonResponse({'roots': roots})
            else:
                return JsonResponse({'details': 'Нет корней'}, status=400)

class Quadratic_Tests(viewsets.ModelViewSet, APIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]

    @action(detail=False, methods=["get"], name="list")
    def list(self, request):
        user = request.user
        if user.is_authenticated:
            tests = Test.objects.filter(user=user)
            test_serializer = TestSerializer(tests, many=True)
            return Response(test_serializer.data)
        else:
            return Response({'details': 'Пользователь не авторизован.'}, status=401)

    @action(detail=False, methods=["get"], name="random")
    def random(self, request):
        a, b, c = get_abc(2)

        return JsonResponse({"a": a, "b": b, "c": c})

    @action(detail=False, methods=["post"], name="solve")
    def solve(self, request):
        user = request.user

        data = request.data
        a = data.get('a')
        b = data.get('b')
        c = data.get('c')
        X1r = data.get('user_x1')
        X2r = data.get('user_x2')

        X1, X2 = find_roots(float(a), float(b), float(c))

        X1 = round(X1, 2)
        X2 = round(X2, 2)

        if (X1 == X1r and X2 == X2r) or (X1 == X2r and X2 == X1r):
            res = 'true'
        else:
            res = 'false'

        dt_stamp = datetime.now()

        if user.is_authenticated:
            test_data = {
                'dt_stamp': dt_stamp,
                'user': user.id if user else None,
                'a': a,
                'b': b,
                'c': c,
                'X1': X1,
                'X2': X2,
                'X1r': X1r,
                'X2r': X2r,
                'res': res
            }
            test_serializer = TestSerializer(data=test_data)
            if test_serializer.is_valid():
                    test_serializer.save()
                    return Response({"result": test_serializer.data}, status=201)
            else:
                return Response(test_serializer.errors, status=400)
        else:
            test_data = {
                'a': a,
                'b': b,
                'c': c,
                'X1': X1,
                'X2': X2,
                'X1r': X1r,
                'X2r': X2r,
                'res': res
            }
            return Response({"result": test_data}, status=201)

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
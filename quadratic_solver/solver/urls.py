from django.urls import path

from .views import Quadratic_Solver, RegisterView, CustomTokenObtainPairView, UserView, Quadratic_Tests
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('solve/', Quadratic_Solver.as_view(), name='quadratic_solver'),
    path('me/', UserView.as_view(), name='user_view'),
    path('test/', Quadratic_Tests.as_view({'get': 'random'}), name='random'),
    path('test/solve/', Quadratic_Tests.as_view({'post': 'solve'}), name='solve'),
    path('test/list/', Quadratic_Tests.as_view({'get': 'list'}), name='test-list'),
]
from django.shortcuts import render
from django.http import JsonResponse
import math

def find_roots(a, b, c):
    discriminant = b**2 - 4*a*c
    if discriminant > 0:
        root1 = (-b + math.sqrt(discriminant)) / (2*a)
        root2 = (-b - math.sqrt(discriminant)) / (2*a)
        return root1, root2
    elif discriminant == 0:
        root = -b / (2*a)
        return root,
    else:
        return None

def quadratic_solver(request):
    if request.method == 'GET':
        a = float(request.GET.get('a', 0))
        b = float(request.GET.get('b', 0))
        c = float(request.GET.get('c', 0))
        roots = find_roots(a, b, c)
        if roots:
            return JsonResponse({'roots': roots})
        else:
            return JsonResponse({'error': 'No real roots'}, status=400)
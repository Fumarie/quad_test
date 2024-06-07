from django.urls import path
from .views import quadratic_solver

urlpatterns = [
    path('solve/', quadratic_solver, name='quadratic_solver'),
]
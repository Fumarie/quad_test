from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name', 'surname']

class Test(models.Model):
    dt_stamp = models.DateTimeField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    a = models.FloatField()
    b = models.FloatField()
    c = models.FloatField()
    X1 = models.CharField(max_length=100)
    X2 = models.CharField(max_length=100)
    X1r = models.CharField(max_length=100)
    X2r = models.CharField(max_length=100)
    res = models.CharField(max_length=100)
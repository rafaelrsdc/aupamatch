from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    nome_completo = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    first_name = None
    last_name = None
    date_joined = None
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []



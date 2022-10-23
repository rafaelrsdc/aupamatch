# TODO: Estabelecer características, considerar o uso inteiros para
#       representação de níveis

from django.db import models

from project.custom_auth.models import User

# Create your models here.
class Caracteristica(models.Model):
    descricao = models.CharField(max_length=100)

class AuPair(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cpf = models.CharField(max_length=14)
    telefone = models.CharField(max_length=20)
    data_nascimento = models.DateField()
    localidade = models.CharField(max_length=100)
    validade_passaporte = models.DateField()
    bio = models.TextField()
    qnt_criancas = models.IntegerField()
    recebe_consolidado_vagas = models.BooleanField(default=False)
    caracteristicas = models.ManyToManyField(Caracteristica)

class Agencia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_comercial = models.CharField(max_length=100)
    localidade = models.CharField(max_length=100)
    telefone = models.CharField(max_length=20)
    email = models.EmailField()
    cnpj = models.CharField(max_length=14)

class Familia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    localidade = models.CharField(max_length=100)
    email = models.EmailField()
    bio = models.TextField()
    qnt_filhos = models.IntegerField()

class Vaga(models.Model):
    titulo = models.CharField(max_length=100)
    data_criacao = models.DateTimeField(auto_now_add=True)
    e_prioritaria = models.BooleanField(default=False)
    data_renovacao = models.DateTimeField()
    descricao = models.TextField()
    detalhes = models.TextField()
    agencia = models.ForeignKey(Agencia, null=True, on_delete=models.CASCADE)
    au_pair_contratado = models.ForeignKey(AuPair, null=True, on_delete=models.CASCADE)
    familia = models.ForeignKey(Familia, null=True, on_delete=models.CASCADE)
    caracteristicas = models.ManyToManyField(Caracteristica)
    candidaturas = models.ManyToManyField(
        AuPair, through='Candidatura', related_name='candidaturas')

class Candidatura(models.Model): # AuPairVaga
    aupair = models.ForeignKey(AuPair, null=True, on_delete=models.CASCADE)
    vaga = models.ForeignKey(Vaga, null=True, on_delete=models.CASCADE)
    candidatou_se = models.BooleanField(default=False)


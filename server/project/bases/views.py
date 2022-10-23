from django.shortcuts import render
from rest_framework import viewsets

from .models import Caracteristica, Vaga, AuPair, Familia, Agencia, Candidatura
from .serializers import CaracteristicaSerializer, VagaSerializer, AuPairSerializer, FamiliaSerializer, AgenciaSerializer, CandidaturaSerializer

# Create your views here.
class VagaViewSet(viewsets.ModelViewSet):
    queryset = Vaga.objects.all()
    serializer_class = VagaSerializer

class CaracteristicaViewSet(viewsets.ModelViewSet):
    queryset = Caracteristica.objects.all()
    serializer_class = CaracteristicaSerializer

class AuPairViewSet(viewsets.ModelViewSet):
    queryset = AuPair.objects.all()
    serializer_class = AuPairSerializer

class FamiliaViewSet(viewsets.ModelViewSet):
    queryset = Familia.objects.all()
    serializer_class = FamiliaSerializer

class AgenciaViewSet(viewsets.ModelViewSet):
    queryset = Agencia.objects.all()
    serializer_class = AgenciaSerializer

class CandidaturaViewSet(viewsets.ModelViewSet):
    queryset = Candidatura.objects.all()
    serializer_class = CandidaturaSerializer


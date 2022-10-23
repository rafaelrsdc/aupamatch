from rest_framework import serializers

from .models import Caracteristica, AuPair, Familia, Agencia, Vaga, Candidatura


class CaracteristicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caracteristica
        fields = '__all__'

class AuPairSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuPair
        fields = '__all__'

class FamiliaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Familia
        fields = '__all__'

class AgenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agencia
        fields = '__all__'

class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = '__all__'

class CandidaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidatura
        fields = '__all__'

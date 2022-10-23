from django.contrib.auth.models import User, Group

from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True },
            'is_active': {'write_only': True },
            'is_staff': {'write_only': True },
            'is_superuser': {'write_only': True },
        }

    def save(self, **kwargs):
        if self.validated_data.get('password') is not None:
            self.validated_data['password'] = make_password(
                self.validated_data['password'])
        return super(UserSerializer, self).save(**kwargs)

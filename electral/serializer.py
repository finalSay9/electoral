from rest_framework import serializers
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password



User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('email', 'name', 'address', 'password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

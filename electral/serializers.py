from rest_framework import serializers
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password as run_validators
from django.contrib.auth.password_validation import validate_password



User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('email', 'name', 'address', 'password')

    def validate_email(self, value):
        value = value.strip().lower()
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('a user with this email already exist')
        return value

    def validate_password(self, value):
        run_validators(value)
        return value


    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

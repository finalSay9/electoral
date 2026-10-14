from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from rest_framework.throttling import AnonRateThrottle



User = get_user_model()

class RegisterThrottle(AnonRateThrottle):
    scope = "register"

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


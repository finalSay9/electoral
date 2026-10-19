from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from rest_framework.throttling import AnonRateThrottle
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LoginSerializer



User = get_user_model()

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        u = request.user
        return Response({"email": u.email, "name": u.name, "role": u.role})

class RegisterThrottle(AnonRateThrottle):
    scope = "register"

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]




class LoginThrottle(AnonRateThrottle):
    scope = "login"


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
    throttle_classes = [LoginThrottle]


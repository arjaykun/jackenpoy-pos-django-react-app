from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from .serializers import (UserSerializer, LoginSerializer,
                          CreateUserSerializer, RetrieveModifyUserSerializer,
                          ChangePasswordSerializer)
from knox.models import AuthToken


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        _, token = AuthToken.objects.create(user)
        return Response({
            'user': UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            'token': token,
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserListAPI(generics.ListCreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [permissions.AllowAny, ]
    queryset = User.objects.all()


class UserRetrieveUpdateDeleteAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RetrieveModifyUserSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = User.objects.all()


class ChangePasswordAPI(LoginRequiredMixin, generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.AllowAny, ]
    queryset = User.objects.all()

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from .serializers import (UserSerializer, LoginSerializer,
                          CreateUserSerializer, RetrieveModifyUserSerializer,
                          ChangePasswordSerializer, ChangePasswordSerializer2)
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


class ChangePasswordAPI(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.AllowAny, ]
    queryset = User.objects.all()

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.object.set_password(serializer.data.get("password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SelfChangePassword(generics.UpdateAPIView):

    serializer_class = ChangePasswordSerializer2
    model = User
    permission_classes = [permissions.AllowAny, ]
    queryset = User.objects.all()

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff']


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'password',
            'last_name',
            'is_staff']

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'])
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.is_staff = validated_data['is_staff']
        user.save()

        return user


class RetrieveModifyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_staff']


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            'Incorrect Credentials. ')


class ChangePasswordSerializer(serializers.Serializer):
    model = User
    password = serializers.CharField(
        required=True, max_length=30, min_length=6)

    # def update(self, instance, validated_data):
    #     instance.set_password(validated_data['password'])
    #     instance.save()

    #     return instance


class ChangePasswordSerializer2(serializers.Serializer):
    model = User

    new_password = serializers.CharField(required=True, max_length=30)
    old_password = serializers.CharField(required=True, max_length=30)

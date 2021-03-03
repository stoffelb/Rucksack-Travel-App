from rest_framework import serializers
from .models import User, Profile
from django import forms


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer
    
    class Meta:
        model = Profile
        fields = ('user', 'name', 'email')
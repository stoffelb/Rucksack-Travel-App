from rest_framework import serializers
from .models import User, Profile
from django import forms


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password')
        
        def create(self, validated_data):
            user = User.objects.create_user(username = validated_data['username'], password = validated_data['password'])

            return user

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer
    
    class Meta:
        model = Profile
        fields = ('user', 'name', 'email')
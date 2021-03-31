from rest_framework import serializers
from .models import User, Profile, Itinerary
from django import forms


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'first_name','last_name', 'email')
        
        def create(self, validated_data):
            user = User.objects.create_user(username = validated_data['username'], password = validated_data['password'])

            return user

class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = ('user', 'description')

class ItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Itinerary
        fields = ('user', 'title', 'budget', 'duration_magnitude', 'description', 'transportation_tag', 'accommodation_tag', 'location_tag')
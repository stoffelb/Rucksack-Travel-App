from django.shortcuts import render, redirect
from .serializers import UserSerializer, ProfileSerializer, ItinerarySerializer
from .models import User, Profile, Itinerary
from django.http import JsonResponse, Http404
from django.core.exceptions import MultipleObjectsReturned
from django.contrib.auth.decorators import login_required, user_passes_test

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
import random

@api_view(['POST', ])
def api_create_user(request, username):
    # see if user already exists
    try:
        user = User.objects.get(username=request.data['user']['username'])
    except User.DoesNotExist:
        # serialize User json data
        uSerializer = UserSerializer(data=request.data['user'])

        try:
            Profile.objects.get(email=request.data['email'])
        except MultipleObjectsReturned:
            return Response({'message': 'problem finding email'})
        except Profile.DoesNotExist:
            if uSerializer.is_valid():
                # if serialized data is valid, then save as a User model
                # uSerializer.save()
                _user = User.objects.create_user(username=uSerializer.data['username'], password=uSerializer.data['password'])
                _user.save()
                newUser = User.objects.get(username=request.data['user']['username'])
                newUser.set_password(uSerializer.data.get('password'))
                # Serialize Profile json data using newUser.id + name + email + other fields to be decided
                pSerializer = ProfileSerializer(data={'user': newUser.id, 'name': request.data['name'], 'email':request.data['email']})

                if pSerializer.is_valid():
                    # if serialized data is valid, then save as a Profile model
                    pSerializer.save()
                    try:
                        newProfile = Profile.objects.get(email=request.data['email'])
                    except Profile.DoesNotExist:
                        return Response({'message': 'Profile object does not exist'})
                    # return response that profile has been successfully created
                    return Response({"message": "Profile Created!", "email": newProfile.email, "username": newUser.username})
                else:
                    # if unsuccessful, print errors
                    print(pSerializer.errors)
                    return Response({'message':'not successful'})

    return Response({"message": "User Already Exists"})

@api_view(['POST', ])
def edit_user(request, user_id):
    if request.user.is_authenticated:
        try:
            _profile = Profile.objects.filter(user_id = user_id)
            _user = User.objects.get(id = user_id)

        except User.DoesNotExist:
            return Response("User ID Does Not Exist")
        
        # update django User model fields
        _user.username = request.data['user']['username']
        _user.set_password(request.data['user']['password']) # make sure password is actually different
        _user.save()

        return Response("Updated User")
    else:
        return Response("Could Not Edit User")

@api_view(['GET', ])
def is_online(request, user):
    _user = User.objects.get(username = user)
    try:
        _token = Token.objects.get(user_id = _user.id)
    except Token.DoesNotExist:
        return Response("user isn't logged in")

    return Response("user is logged in")


# @api_view(['Post', ])
# def change_password(request, user_id):


@api_view(['GET', ])
def api_get_user(request, username):
    if request.user.is_authenticated:
        try:
            # query user based on username
            _user = User.objects.get(username=username)
        except User.DoesNotExist:
            # if user doesn't exist, return following response
            return Response({"message": "user doesn't exist!"})
        # serialize JSON object if a user with the specified username exists
        serializer = UserSerializer(_user)
        # return 'user exists' if user exists
        return Response(serializer.data)
    else:
        return Response('whoooooooops')

@api_view(['GET', ])
def ProfileView(request, username):
    if request.user.is_authenticated:
        _user = User.objects.get(username = username)
        _profile = Profile.objects.get(user = _user)
        #query profile, itinerarys, followers, etc. that are unique to the user/profile given
        context = []
        itineraries = []
        context.insert(0,ProfileSerializer(_profile).data)

        for e in Itinerary.objects.filter(user = _user):
            itineraries.insert(0, ItinerarySerializer(e).data)

        context.insert(1, itineraries)

        return Response(context)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', ])
def MainPageView(request):
    try:
        context = []
        for e in Itinerary.objects.all():
            context.insert(0,ItinerarySerializer(e).data)
        return Response(context)
    except:
        return Response({"message": "There's nothing here !"})

@api_view(['POST', ])
def api_create_itinerary(request):
    if request.user.is_authenticated:
        # need user for itinerary
        request.data["user"] = request.user.id
        newItinerary = ItinerarySerializer(data = request.data)

        if newItinerary.is_valid():
            newItinerary.save()
            return Response("success")

        return Response("ERROR")
    else:
        return Response("please login")
    

@api_view(['GET', ])
def api_get_itinerary(request, location_tag):
    try:
        # query Itinerary based on location_tag
        _itineraryList = Itinerary.objects.filter(location_tag=location_tag)
    except Itinerary.DoesNotExist:
        # if Itinerary doesn't exist, return following response
        return Response({"message": "Itinerary doesn't exist!"})
    # serialize JSON object if a user with the specified Itinerary exists
    result_list = []
    for itinerary in _itineraryList:
        serializer = ItinerarySerializer(itinerary)
        result_list.insert(0,serializer.data)

    # return 'Itinerary exists' if user exists
    return Response(result_list)


@api_view(['POST', ])
def delete_auth_token(request):
    if request.user.is_authenticated:
        try:
            request.user.auth_token.delete()
        except:
            pass
            
        return Response("success", status=status.HTTP_202_ACCEPTED)
    else:
        return Response("login first !", status=status.HTTP_403_FORBIDDEN)

@api_view(['POST', ])
def delete_user(request, user_id):
    if request.user.is_authenticated:
        try:
            _user = User.objects.get(id = user_id)
        except User.DoesNotExist:
            return Response("User ID Does Not Exist")

        if _user.id == request.user.id:
            _user.delete()
            return Response("User Has Been Deleted")
        else:
            return Response("Unauthorized")
    
    else:
        return Response("Could Not Delete User")



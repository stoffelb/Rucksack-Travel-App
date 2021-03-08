from django.shortcuts import render, redirect
from .serializers import UserSerializer, ProfileSerializer
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
<<<<<<< HEAD
                uSerializer.save()
                # _user = User.objects.create_user(username = uSerializer.data['username'], password = uSerializer.data['password'])
                # _user.save()
=======
                # uSerializer.save()
                _user = User.objects.create_user(username=uSerializer.data['username'], password=uSerializer.data['password'])
                _user.save()
>>>>>>> 62c8ce2a73a91b0be12ffc9e014e14f3d8fdb388
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

@api_view(['GET', ])
def api_get_user(request, username):
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


@api_view(['GET', ])
def ProfileView(request, username):
    if request.user.is_authenticated:
        _user = User.objects.get(username = username)
        _profile = Profile.objects.get(user = _user)
        #query profile, itinerarys, followers, etc. that are unique to the user/profile given
        context = {}
        context['Profile']  = ProfileSerializer(_profile).data
        try:
            context['Itineraries'] = Itinerary.objects.get(user = _user)
        except:
            context['Itineraries'] = 'none'
        return Response(context)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

# def HomeView(request)
#     if request.user.is_authenticated:

#     else:

@api_view(['POST', ])
def delete_auth_token(request):
    if request.user.is_authenticated:
        try:
            request.user.auth_token.delete()
        except:
            pass
            
        return Response(status=status.HTTP_202_ACCEPTED)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
    


# User Profile Update
# @api_view(['POST', ])
# def api_update_buoy_data(request, api_key, buoy_id):
#     try:  # find account with specified api_key
#         acc = Account.objects.get(api_key=api_key)
#     except Account.DoesNotExist:
#         return Response({"message": "API key doesn't exist!"})
#
#     try:  # make sure the buoy we are updating actually exists
#         _buoy = Buoy.objects.get(id=buoy_id)
#     except Buoy.DoesNotExist:
#         # if it doesn't, send HTTP 404 response
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     # check if the given API key is the same as the API key connected to the buoy's user
#     if acc.api_key != _buoy.user.api_key:
#         return Response({"message": "Invalid API key!"})
#
#     serializer = DataSerializer(data=request.data)
#
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Buoy Updated!", "buoy_data": serializer.data})
#
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

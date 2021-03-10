from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    api_get_user,
    api_create_user,
    ProfileView,
    delete_auth_token
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    #GET requests
    path('get_user/<str:username>', api_get_user, name="get user"),
    path('<str:username>', ProfileView, name="Profile View"),

    #POST requests
    path('user_create/<str:username>', api_create_user, name="create user"),
    path('logout/', delete_auth_token, name="logout"),
    path('login/',  obtain_auth_token, ), 

]
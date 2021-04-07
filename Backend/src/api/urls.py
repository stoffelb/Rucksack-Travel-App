from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    api_get_user,
    api_create_user,
    ProfileView,
    api_create_itinerary,
    api_get_itinerary,
    delete_auth_token,
    MainPageView,
    delete_user,
    edit_user,
    update_email,
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    #GET requests
    path('get_user/<str:username>', api_get_user, name="get user"),
    path('<str:username>', ProfileView, name="Profile View"),
    path('home_view/', MainPageView, name="Main Page"),
    path('get_itinerary/<str:location_tag>',api_get_itinerary),

    #POST requests
    path('user_create/<str:username>', api_create_user, name="create user"), 
    path('logout/', delete_auth_token, name="logout"), 
    path('login/',  obtain_auth_token, ), 
    path('create_itinerary/', api_create_itinerary, name="create itinerary"),
    path('delete_user/<user_id>',  delete_user, ),
    path('edit_user/<user_id>',  edit_user, ),

    #PUT requests
    path('update_email/<token>',  update_email, ),
]
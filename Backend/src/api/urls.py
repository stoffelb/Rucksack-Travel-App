from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('user_create/<str:username>', views.api_create_user),
    path('get_user/<str:username>', views.api_get_user),
    path('<str:username>',views.ProfileView),
]
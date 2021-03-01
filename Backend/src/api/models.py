from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    bio = models.TextField()
    profile_picture = models.ImageField()


# class User(models.Model):
#     username = models.charField(max_length=100)
#     password = models.charField(max_length=256)
#     email = models.EmailField(max_length=100)
#     profile = models.OneToOneField(Profile)
#

class Tag(models.Model):
    pass


class TransportationTag(Tag):
    transport_type = models.CharField(max_length=100)


class LocationTag(Tag):
    location_name = models.CharField(max_length=100)


class AccommodationTag(Tag):
    accommodation_type = models.CharField(max_length=100)


class Itinerary(models.Model):
    itinerary_title = models.CharField(max_length=100)
    budget = models.IntegerField()
    duration_magnitude = models.IntegerField()
    tag = models.ManyToManyField(Tag)

# Create your models here.


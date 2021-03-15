from django.db import models
from django.contrib.auth.models import User

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, default=0)
    name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(max_length=254, default='')

    def str(self):  # unicode for Python 2
        return self.user.username

class TransportationTag(models.TextChoices):
    CAR = 'Car'
    TRAIN = 'Train'
    PLANE = 'Plane'
    MOTORCYCLE = 'Motorcycle'
    BICYCLE = 'Bicycle'

class AccommodationTag(models.TextChoices):
    HOTEL = 'Hotel'
    HOSTEL = 'Hostel'
    CONDO = 'Condo'
    CAMP = 'Campsite'

class Itinerary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, default='')
    budget = models.IntegerField(default=0)
    duration_magnitude = models.IntegerField(default=0)
    location_tag = models.CharField(max_length=20, default='')
    transportation_tag = models.TextField(choices=TransportationTag.choices, default='')
    accommodation_tag = models.TextField(choices=AccommodationTag.choices, default='')

    def str(self):
        return self.itinerary_title + self.user.username

    def save(self, **kwargs):
        self.location_tag = self.location_tag.lower()
        return super(Itinerary, self).save( **kwargs)


# function is needed to create an authentication token for each user
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

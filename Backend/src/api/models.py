from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, default=0)
    name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(max_length=254, default = '')

    def str(self):  # unicode for Python 2
        return self.user.username

class Tag(models.Model):
    pass


class TransportationTag(Tag):
    transport_type = models.CharField(max_length=100)


class LocationTag(Tag):
    location_name = models.CharField(max_length=100)


class AccommodationTag(Tag):
    accommodation_type = models.CharField(max_length=100)


class Itinerary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    itinerary_title = models.CharField(max_length=100)
    budget = models.IntegerField()
    duration_magnitude = models.IntegerField()
    # tag = models.ManyToManyField(Tag)

    def str(self):
        return self.itinerary_title + self.user.username
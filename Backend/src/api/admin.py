from django.contrib import admin

from api.models import Itinerary, Profile, Token

admin.site.register(Profile)
admin.site.register(Itinerary)
admin.site.register(Token)


# Register your models here.

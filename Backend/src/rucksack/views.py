from django.shortcuts import render
from django.http import HttpResponse


# HomePage
def home(request):
    return HttpResponse('<h1>RuckSack Home</h1>')
from django.shortcuts import render
from django.http import HttpResponse


# HomePage
def home(request):
    return render(request, 'rucksack/home.html')
from django.shortcuts import render
from rest_framework import viewsets
from . import models

class ActorViewSet(viewsets.ModelViewSet):
    '''
    API endpoint to view/delete Actors
    '''
    queryset = models.Actor.objects.all()
    serializer_class = models.ActorSerializer

class MovieViewSet(viewsets.ModelViewSet):
    '''
    API endpoint to view/delete Movies
    '''
    queryset = models.Movie.objects.all()
    serializer_class = models.MovieSerializer

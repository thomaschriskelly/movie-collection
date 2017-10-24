from django.db import models
from rest_framework import serializers

class Actor(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField(blank=True, null=True)
    actors = models.ManyToManyField(Actor)

    def __str__(self):
        return self.title

class ActorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Actor
        fields = 'name',

class MovieSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Movie
        fields = 'title', 'genre', 'year', 'actors'

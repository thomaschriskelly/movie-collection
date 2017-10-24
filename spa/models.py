from django.db import models

class Actor(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)
    actors = models.ManyToManyField(Actor)

    def __str__(self):
        return self.title

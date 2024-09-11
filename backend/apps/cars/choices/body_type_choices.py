from django.db import models


class BodyTypeChoices(models.TextChoices):
    Sedan = 'Sedan',
    Hatchback = 'Hatchback',
    Coupe = 'Coupe',
    Convertible = 'Convertible',
    Wagon = 'Wagon',
    Pickup_Truck = 'Pickup Truck',
    Van = 'Van',
    Minivan = 'Minivan',
    Crossover = 'Crossover',
    Roadster = 'Roadster',
    Jeep = 'Jeep',
    Limousine = 'Limousine'

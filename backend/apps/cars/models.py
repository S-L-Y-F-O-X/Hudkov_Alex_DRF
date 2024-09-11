from datetime import datetime

from django.contrib.auth import get_user_model
from django.core import validators as V
from django.db import models

from core.models import BaseModel

from apps.auto_parks.models import AutoParkModel
from apps.cars.choices.body_type_choices import BodyTypeChoices
from apps.cars.managers import CarManager


class CarModel(BaseModel):
    class Meta:
        db_table = 'cars'
        ordering = ('id',)

    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    brand = models.CharField(max_length=255, validators=(V.MinLengthValidator(2),))
    model = models.CharField(max_length=255, validators=(V.MinLengthValidator(2),))
    year = models.IntegerField(validators=(V.MinValueValidator(1990), V.MaxValueValidator(datetime.now().year)))
    price = models.IntegerField(validators=(V.MinValueValidator(0), V.MaxValueValidator(1_000_000)))
    currency = models.CharField(max_length=3, default='UAH')
    body_type = models.CharField(max_length=15, choices=BodyTypeChoices.choices)
    region = models.CharField(max_length=255, validators=(V.MinLengthValidator(2),))
    city = models.CharField(max_length=255, validators=(V.MinLengthValidator(2),))
    # auto_park = models.ForeignKey(AutoParkModel, on_delete=models.CASCADE, related_name='cars')
    # photo = models.ImageField(upload_to=FileService.upload_car_photo, blank=True)

    objects = CarManager()

from django.db import models


class CarBrand(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class CarModel(models.Model):
    name = models.CharField(max_length=100)
    brand = models.ForeignKey(CarBrand, on_delete=models.CASCADE, related_name="models")

    def __str__(self):
        return f"{self.brand.name} {self.name}"

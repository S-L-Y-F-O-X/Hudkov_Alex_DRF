from django.db import models


class ExchangeRate(models.Model):
    currency = models.CharField(max_length=3, unique=True)
    buy = models.FloatField()
    sale = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.currency}: {self.sale}"

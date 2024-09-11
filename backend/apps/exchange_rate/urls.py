from django.urls import path

from apps.exchange_rate.views import ExchangeRateView

urlpatterns = [
    path('', ExchangeRateView.as_view(), name='exchange-rates'),
]

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.exchange_rate.models import ExchangeRate


class ExchangeRateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        rates = ExchangeRate.objects.all()
        rates_data = {rate.currency: {'buy': rate.buy, 'sale': rate.sale} for rate in rates}
        return Response(rates_data)

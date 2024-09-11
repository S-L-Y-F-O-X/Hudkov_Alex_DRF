import requests
from django.core.management.base import BaseCommand

from apps.exchange_rate.models import ExchangeRate


class Command(BaseCommand):
    help = 'Update currency exchange rates'

    def handle(self, *args, **kwargs):
        response = requests.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        if response.status_code == 200:
            data = response.json()
            for rate in data:
                if rate['ccy'] in ['USD', 'EUR']:
                    ExchangeRate.objects.update_or_create(
                        currency=rate['ccy'],
                        defaults={'buy': rate['buy'], 'sale': rate['sale']}
                    )
            self.stdout.write(self.style.SUCCESS('Successfully updated exchange rates'))
        else:
            self.stdout.write(self.style.ERROR('Failed to fetch exchange rates'))

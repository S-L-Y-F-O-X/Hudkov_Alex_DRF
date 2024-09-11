from celery import shared_task
import json
from urllib.request import urlopen
from apps.exchange_rate.models import ExchangeRate


@shared_task
def update_exchange_rates():
    """Fetch exchange rates from PrivatBank and update the database using urllib."""
    url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'

    try:
        with urlopen(url) as response:
            data = json.loads(response.read().decode())

            for rate in data:
                if rate['ccy'] in ['USD', 'EUR']:
                    ExchangeRate.objects.update_or_create(
                        currency=rate['ccy'],
                        defaults={'buy': rate['buy'], 'sale': rate['sale']}
                    )
            return 'Exchange rates updated successfully'
    except Exception as e:
        return f'Failed to fetch exchange rates: {e}'

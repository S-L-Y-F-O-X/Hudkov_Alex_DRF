# from django.db.models import QuerySet
# from django.http import QueryDict
# from rest_framework.exceptions import ValidationError
#
# from apps.cars.models import CarModel
# from apps.cars.serializers import CarSerializer
#
#
# def car_filter(query: QueryDict) -> QuerySet:
#     qs = CarModel.objects.all()
#     for k, v in query.items():
#         match k:
#             case 'price_gt':
#                 qs = qs.filter(price__gt=v)
#             case 'price_lt':
#                 qs = qs.filter(price__lt=v)
#             case 'price_gte':
#                 qs = qs.filter(price__gt=v)
#             case 'price_lte':
#                 qs = qs.filter(price__lt=v)
#
#             case 'year_gt':
#                 qs = qs.filter(year__gt=v)
#             case 'year_lt':
#                 qs = qs.filter(year__lt=v)
#             case 'year_gte':
#                 qs = qs.filter(year__gt=v)
#             case 'year_lte':
#                 qs = qs.filter(year__lt=v)
#
#             case 'brand_start':
#                 qs = qs.filter(brand__istartswith=v)
#             case 'brand_end':
#                 qs = qs.filter(brand__iendswith=v)
#             case 'brand_contains':
#                 qs = qs.filter(brand__icontains=v)
#
#             case 'order':
#                 fields = CarSerializer.Meta.fields
#                 fields = [*fields, *[f'-{field}' for field in fields]]
#
#                 if v not in fields:
#                     raise ValidationError({"details":f'Please choice order from {", ".join(fields)}'})
#                 qs = qs.order_by(v)
#             case _:
#                 raise ValidationError(f"Filter {k} not supported")
#     return qs

from django_filters import rest_framework as filters

from apps.cars.choices.body_type_choices import BodyTypeChoices
from apps.cars.models import CarModel


class CarFilter(filters.FilterSet):
    year_gtd = filters.NumberFilter(field_name='year', lookup_expr='gt')
    year_range = filters.RangeFilter('year')   # пошук по діапазону
    year_in = filters.BaseInFilter('year')  # пошук по заданому року (через кому ввоити роки)
    body = filters.ChoiceFilter('body_type', choices=BodyTypeChoices.choices)  # Фільтр по типу кузова
    order = filters.OrderingFilter(         # фільтр по бренду або ціні
        fields=(
            'brand',
            'price',
            ('id', 'asd')   # псевдонім asd для id
        )
    )

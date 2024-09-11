from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission

from apps.cars.models import CarModel


class CanViewOrCreateCarsPermission(BasePermission):
    """
    Дозволяє:
    - Всім користувачам переглядати машини.
    - Продавцям створювати одну машину.
    - Преміум-продавцям створювати необмежену кількість машин.
    - Покупці не можуть створювати машини.
    - Співробітники (is_staff) та суперадміністратори (is_superuser) мають повний доступ.
    """

    def has_permission(self, request, view):
        user = request.user

        if request.method == 'GET':
            return True

        if user.is_staff or user.is_superuser:
            return True

        if request.method == 'POST':
            if user.is_buyer:
                return False

            if user.is_seller_premium:
                return True

            if user.is_seller:
                if CarModel.objects.filter(owner=user).exists():
                    raise PermissionDenied("Ви можете створити лише одну машину.")
                return True

            return False

        return False

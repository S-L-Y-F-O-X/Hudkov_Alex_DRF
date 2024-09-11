from rest_framework.permissions import BasePermission


class CanEditOrDeleteCarsPermission(BasePermission):
    """
    Дозволяє:
    - Співробітникам (is_staff) та суперадміністратору (is_superuser) редагувати та видаляти будь-які машини.
    - Власники можуть редагувати/видаляти свої машини.
    """

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_staff or user.is_superuser:
            return True
        return obj.owner == user

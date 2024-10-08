from rest_framework.permissions import BasePermission


class IsOwnerOfCar(BasePermission):
    """
    Дозволяє видаляти машину тільки її власнику.
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or request.user.is_staff:
            return True
        return obj.owner == request.user

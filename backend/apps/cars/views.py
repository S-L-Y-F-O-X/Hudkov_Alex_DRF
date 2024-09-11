from django.utils.decorators import method_decorator

from rest_framework import status
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
    GenericAPIView
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema

from core.permissions.is_can_view_or_create_cars_permission import CanViewOrCreateCarsPermission
from core.permissions.is_can_edit_and_delete_cars_permission import CanEditOrDeleteCarsPermission

from apps.cars.filter import CarFilter
from apps.cars.models import CarModel
from apps.cars.serializers import CarSerializer, CarPhotoSerializer
from core.permissions.is_owner_of_car_permission import IsOwnerOfCar
from core.services.email_service import EmailService


@method_decorator(name='get', decorator=swagger_auto_schema(security=[], operation_summary='create new car'))
class CarListView(ListCreateAPIView):
    """
    Get all cars
    """
    serializer_class = CarSerializer
    queryset = CarModel.objects.all()
    filterset_class = CarFilter
    permission_classes = [CanViewOrCreateCarsPermission]
    pagination_class = None

    def perform_create(self, serializer):
        print(f"User {self.request.user} is creating a car")
        serializer.save(owner=self.request.user)


class CarRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    get:
        get car details
    put:
        update car
    patch:
        partial update car
    delete:
        delete car
    """
    serializer_class = CarSerializer
    queryset = CarModel.objects.all()
    permission_classes = [CanEditOrDeleteCarsPermission]

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAuthenticated(), IsOwnerOfCar()]
        return (AllowAny(),)


class CarAddPhotoView(UpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CarPhotoSerializer
    queryset = CarModel.objects.all()
    http_method_names = ('put',)

    def perform_update(self, serializer):
        car = self.get_object()
        car.photo.delete()
        super().perform_update(serializer)


class TestEmailView(GenericAPIView):
    permission_classes = (AllowAny,)

    def get(self, *args, **kwargs):
        EmailService.send_test()
        return Response(status=status.HTTP_204_NO_CONTENT)

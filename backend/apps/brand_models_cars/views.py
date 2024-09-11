from rest_framework import generics
from .models import CarBrand, CarModel
from .serializers import CarBrandSerializer, CarModelSerializer
from rest_framework.permissions import IsAuthenticated


class CarBrandListCreateView(generics.ListCreateAPIView):
    queryset = CarBrand.objects.all()
    serializer_class = CarBrandSerializer
    permission_classes = [IsAuthenticated]


class CarBrandRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CarBrand.objects.all()
    serializer_class = CarBrandSerializer
    permission_classes = [IsAuthenticated]


class CarModelListCreateView(generics.ListCreateAPIView):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    permission_classes = [IsAuthenticated]


class CarModelRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    permission_classes = [IsAuthenticated]

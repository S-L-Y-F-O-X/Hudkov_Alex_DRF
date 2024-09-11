from django.urls import path

from .views import CarBrandListCreateView, CarBrandRetrieveUpdateDestroyView, CarModelListCreateView, \
    CarModelRetrieveUpdateDestroyView

urlpatterns = [
    path('/brands', CarBrandListCreateView.as_view(), name='car-brand-list-create'),
    path('/brands/<int:pk>', CarBrandRetrieveUpdateDestroyView.as_view(), name='car-brand-detail'),

    # URL для CarModel
    path('/models', CarModelListCreateView.as_view(), name='car-model-list-create'),
    path('/models/<int:pk>', CarModelRetrieveUpdateDestroyView.as_view(), name='car-model-detail'),
]

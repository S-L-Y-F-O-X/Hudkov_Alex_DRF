from django.urls import path

from apps.auto_parks.views import AutoParksListCreateView, AutoParkAddCarView

urlpatterns = [
    path('', AutoParksListCreateView.as_view()),
    path('/<int:pk>/cars', AutoParkAddCarView.as_view()),
]

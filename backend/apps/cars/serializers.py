from rest_framework import serializers
from rest_framework.serializers import ValidationError

from apps.cars.models import CarModel


class CarSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = CarModel
        fields = (
            'owner', 'id', 'brand', 'model', 'year', 'price', 'currency', 'region', 'city', 'body_type', 'created_at',
            'updated_at')


class CarPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = ('photo',)
        extra_kwargs = {'photo': {'required': True}}

from rest_framework import serializers
from apps.users.models import UserModel


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True)
    surname = serializers.CharField(write_only=True)
    age = serializers.IntegerField(write_only=True)
    phone_number = serializers.CharField(write_only=True)

    class Meta:
        model = UserModel
        fields = (
            'email', 'password', 'name', 'surname', 'age', 'phone_number', 'is_buyer', 'is_seller', 'is_seller_premium')

    def validate(self, data):
        errors = {}

        if 'email' not in data:
            errors['email'] = "This field is required."
        if 'password' not in data:
            errors['password'] = "This field is required."
        if 'name' not in data:
            errors['name'] = "This field is required."
        if 'surname' not in data:
            errors['surname'] = "This field is required."
        if 'age' not in data:
            errors['age'] = "This field is required."
        if 'phone_number' not in data:
            errors['phone_number'] = "This field is required."

        if errors:
            raise serializers.ValidationError(errors)

        return data

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            surname=validated_data['surname'],
            age=validated_data['age'],
            phone_number=validated_data['phone_number'],
            is_buyer=validated_data.get('is_buyer', False),
            is_seller=validated_data.get('is_seller', False),
            is_seller_premium=validated_data.get('is_seller_premium', False)
        )

        return user

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from core.dataclasses.user_dataclass import User
from core.services.email_service import EmailService
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken, SocketToken

from apps.auth.serializers import EmailSerializer, PasswordSerializer
from apps.users.serializers import UserSerializer

UserModel: User = get_user_model()


class ActivateUserView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def patch(self, *args, **kwargs):
        token = kwargs['token']
        user = JWTService.verify_token(token, ActivateToken)
        user.is_active = True
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class RecoveryPasswordRequestView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = EmailSerializer

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(UserModel, **serializer.data)
        EmailService.recovery_email(user)
        return Response({'detail': 'check your email'}, status.HTTP_200_OK)


class RecoverPasswordView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PasswordSerializer

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        token = kwargs['token']
        user = JWTService.verify_token(token, RecoveryToken)
        user.set_password(serializer.data['password'])
        user.save()
        return Response({'detail': 'password was changed'}, status.HTTP_200_OK)


class SocketView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, *args, **kwargs):
        token = JWTService.create_token(self.request.user, SocketToken)
        return Response({'token': str(token)}, status=status.HTTP_200_OK)

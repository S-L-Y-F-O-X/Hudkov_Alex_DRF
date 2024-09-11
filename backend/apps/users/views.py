from django.contrib.auth import get_user_model, authenticate

from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from apps.users.serializers import UserSerializer
from core.permissions.is_super_user_permission import IsSuperUser

UserModel = get_user_model()


class UserListCreateView(ListCreateAPIView):
    permission_classes = (AllowAny,)
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserToAdminView(GenericAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = UserSerializer

    def get_queryset(self):
        return UserModel.objects.exclude(pk=self.request.user.pk)

    def patch(self, *args, **kwargs):
        user = self.get_object()

        if not user.is_staff:
            user.is_staff = True
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class GetUserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_profile = user.profile

        user_details = {
            'id': user.id,
            'name': user_profile.name,
            'email': user.email,
            'is_buyer': user.is_buyer,
            'is_seller': user.is_seller,
            'is_seller_premium': user.is_seller_premium,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
        }
        return Response(user_details)


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if user is not None:

            refresh = RefreshToken.for_user(user)

            return Response({

                'access': str(refresh.access_token),
                'is_superuser': user.is_superuser,
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UpdateUserRoleView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, user_id):
        try:
            user = UserModel.objects.get(id=user_id)
            role = request.data.get('role')
            if role == 'admin':
                user.is_staff = True
            elif role == 'user':
                user.is_staff = False
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        except UserModel.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class BlockUserView(GenericAPIView):
    permission_classes = [IsSuperUser]

    def get_queryset(self):
        return UserModel.objects.exclude(pk=self.request.user.pk)

    def patch(self, request, user_id):
        try:
            user = UserModel.objects.get(id=user_id)
            user.is_active = request.data.get('is_active', user.is_active)
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        except UserModel.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class UpdateUserFieldView(APIView):
    permission_classes = [IsSuperUser]

    def patch(self, request, user_id):
        try:
            user = UserModel.objects.get(id=user_id)
            for field in ['is_seller_premium', 'is_staff', 'is_superuser']:
                if field in request.data:
                    setattr(user, field, request.data[field])
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        except UserModel.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

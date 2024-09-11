from django.urls import path

from apps.cars.views import CarRetrieveUpdateDestroyView
from apps.users.views import UserListCreateView, UserToAdminView, \
    GetUserDetailsView, BlockUserView, UpdateUserFieldView

urlpatterns = [
    path('', UserListCreateView.as_view()),
    path('/<int:pk>/admins', UserToAdminView.as_view()),
    path('/user_details', GetUserDetailsView.as_view()),
    path('/<int:user_id>/block/', BlockUserView.as_view(), name='block_user'),
    path('/<int:user_id>/', UpdateUserFieldView.as_view(), name='update_user_field'),
]

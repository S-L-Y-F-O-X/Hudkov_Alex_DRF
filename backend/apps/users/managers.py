from django.contrib.auth.models import UserManager as Manager


class UserManager(Manager):
    def create_user(self, email=None, password=None, name=None, surname=None, age=None, phone_number=None,
                    **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        if not password:
            raise ValueError('Users must have a password')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        from .models import ProfileModel

        ProfileModel.objects.create(
            user=user,
            name=name,
            surname=surname,
            age=age,
            phone_number=phone_number,
            email=email
        )

        return user

    def create_superuser(self, email=None, password=None, name=None, surname=None, age=None, phone_number=None,
                         **extra_fields):
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_active') is not True:
            raise ValueError('Superuser must have is_active=True.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, name, surname, age, phone_number, **extra_fields)

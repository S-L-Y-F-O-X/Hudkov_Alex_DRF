import os

from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template

from configs.celery import app

from core.dataclasses.user_dataclass import User
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken


class EmailService:

    @staticmethod
    @app.task
    def __send_email(to: str, template_name: str, context: dict, subject='') -> None:
        template = get_template(template_name)
        html_content = template.render(context)
        msg = EmailMultiAlternatives(subject=subject, from_email=os.environ.get("EMAIL_HOST_USER"), to=[to])
        msg.attach_alternative(html_content, 'text/html')
        msg.send()

    @classmethod
    def send_test(cls):
        cls.__send_email('uaslavinua@gmail.com', 'test.html', {}, 'Test Email')

    @classmethod
    def register_email(cls, user: User):
        token = JWTService.create_token(user, ActivateToken)
        url = f'http://localhost:8000/activate/{token}'
        (cls.__send_email.delay(
            user.email,
            template_name='register.html',
            context={'name': user.profile.name, 'url': url},
            subject='Register'
        ))

    @classmethod
    def recovery_email(cls, user: User):
        token = JWTService.create_token(user, RecoveryToken)
        url = f'http://localhost:8000/recovery/{token}'
        cls.__send_email(user.email, 'recovery.html', {'url': url}, 'Recovery password')

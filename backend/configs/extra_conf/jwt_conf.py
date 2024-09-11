from datetime import timedelta

from django.conf import settings

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=10),
    "REFRESH_TOKEN_LIFETIME": timedelta(minutes=15),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,

    # "ALGORITHM": "HS256",
    # "SIGNING_KEY": settings.SECRET_KEY,

    "AUTH_HEADER_TYPES": ("Bearer",),
    # "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
}

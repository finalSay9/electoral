from django.urls import path, include

from . import views


urlpatterns = [
    path('', views.user, name='user'),         # Matches: ://domain.com
    # Matches: ://domain.comabout/
]  
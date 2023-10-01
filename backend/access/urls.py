from django.urls import path

from .views import GetTokenView, CreateUserView

urlpatterns = [
    path("login/", GetTokenView.as_view()),
    path("signup/", CreateUserView.as_view()),
]

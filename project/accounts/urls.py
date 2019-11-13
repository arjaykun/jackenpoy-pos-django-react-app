from django.urls import path, include
from .views import LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth/', include('knox.urls')),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name="logout"),
    path('api/auth/user', UserAPI.as_view()),
]

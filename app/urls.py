from django.urls import path
from .views import login_view, register_view, movimientos_view, logout_view, check_auth_view, movimiento_detalle_view

urlpatterns = [
    path("api/login/", login_view),
    path("api/logout/", logout_view),
    path("api/register/", register_view),
    path("api/movimientos/", movimientos_view),
    path("api/check-auth/", check_auth_view),
    path("api/movimientos/<int:id>/", movimiento_detalle_view),
]
from django.contrib import admin
from .models import UserProfile, Movimiento

# Para manejar tu UserProfile en el admin
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'nombre', 'apellido', 'is_staff')
    search_fields = ('username', 'email', 'nombre', 'apellido')

# Para manejar Movimientos en el admin
@admin.register(Movimiento)
class MovimientoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'tipo', 'monto', 'fecha')
    list_filter = ('tipo', 'fecha')
    search_fields = ('usuario__username', 'descripcion')

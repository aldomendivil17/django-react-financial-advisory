from django.contrib.auth.models import AbstractUser
from django.db import models

class Nacionalidad(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    abreviacion = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.nombre
    
class Categoria(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.nombre


class UserProfile(AbstractUser):
    GENERO_CHOICES = (
        ('hombre', 'Hombre'),
        ('mujer', 'Mujer'),
        ('otro', 'Otro'),
    )
    
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    correo_electronico = models.EmailField(unique=True)
    genero = models.CharField(max_length=10, choices=GENERO_CHOICES, blank=True, null=True)
    nacionalidad = models.ForeignKey(Nacionalidad, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.username} - {self.nombre} {self.apellido}"


class Movimiento(models.Model):
    TIPO_CHOICES = (
        ('INGRESO', 'Ingreso'),
        ('EGRESO', 'Egreso'),
    )

    # Categorías para ingresos
    INGRESO_CATEGORIAS = (
        ('SUELDO', 'Sueldo'),
        ('INVERSION', 'Inversión'),
        ('REGALO', 'Regalo'),
    )

    # Categorías para egresos
    EGRESO_CATEGORIAS = (
        ('ALIMENTACION', 'Alimentación'),
        ('TRANSPORTE', 'Transporte'),
        ('RENTAS', 'Rentas'),
        ('SALUD', 'Salud'),
        ('OTROS', 'Otros'),
    )

    usuario = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    categoria = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )  # Se validará según el tipo
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    def clean(self):
        from django.core.exceptions import ValidationError
        # Validación según tipo
        if self.tipo == "INGRESO" and self.categoria not in dict(self.INGRESO_CATEGORIAS):
            raise ValidationError("Categoría de ingreso inválida")
        elif self.tipo == "EGRESO" and self.categoria not in dict(self.EGRESO_CATEGORIAS):
            raise ValidationError("Categoría de egreso inválida")

    def __str__(self):
        return f"{self.tipo} - {self.monto}"

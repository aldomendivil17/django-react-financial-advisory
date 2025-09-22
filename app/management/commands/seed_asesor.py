# app/management/commands/seed.py
from django.core.management.base import BaseCommand
from app.models import Nacionalidad, Categoria  # cambia 'app' por el nombre de tu app

class Command(BaseCommand):
    help = "Carga datos iniciales de nacionalidades y categorías"

    def handle(self, *args, **kwargs):
        # --- Nacionalidades / Paises ---
        nacionalidades = [
            {"nombre": "México", "abreviacion": "MX"},
            {"nombre": "Estados Unidos", "abreviacion": "US"},
            {"nombre": "Canadá", "abreviacion": "CA"},
            {"nombre": "España", "abreviacion": "ES"},
            {"nombre": "Argentina", "abreviacion": "AR"},
            {"nombre": "Brasil", "abreviacion": "BR"},
            {"nombre": "Francia", "abreviacion": "FR"},
            {"nombre": "Alemania", "abreviacion": "DE"},
            {"nombre": "Italia", "abreviacion": "IT"},
            {"nombre": "Japón", "abreviacion": "JP"},
        ]

        for n in nacionalidades:
            Nacionalidad.objects.get_or_create(nombre=n["nombre"], abreviacion=n["abreviacion"])

        # --- Categorías ---
        categorias = [
            {"nombre": "Vivienda", "descripcion": "Renta/hipoteca, mantenimiento, servicios (agua, luz, gas, internet)."},
            {"nombre": "Alimentación", "descripcion": "Supermercado, restaurantes, cafeterías, comida rápida."},
            {"nombre": "Transporte", "descripcion": "Gasolina, transporte público, mantenimiento de vehículo, seguros."},
            {"nombre": "Salud", "descripcion": "Seguros médicos, medicinas, consultas, tratamientos."},
            {"nombre": "Educación", "descripcion": "Colegiaturas, cursos, libros, material de estudio."},
            {"nombre": "Entretenimiento y ocio", "descripcion": "Cine, conciertos, suscripciones (Netflix, Spotify), viajes."},
            {"nombre": "Ropa y cuidado personal", "descripcion": "Ropa, calzado, peluquería, cosméticos."},
            {"nombre": "Seguros y previsión", "descripcion": "Seguros de vida, de auto, de hogar, aportaciones a retiro."},
            {"nombre": "Deudas y compromisos financieros", "descripcion": "Pagos de créditos, tarjetas, préstamos."},
            {"nombre": "Otros", "descripcion": "Regalos, emergencias, donaciones, gastos no planificados."},
        ]

        for c in categorias:
            Categoria.objects.get_or_create(nombre=c["nombre"], descripcion=c["descripcion"])

        self.stdout.write(self.style.SUCCESS("✅ Datos iniciales cargados correctamente."))

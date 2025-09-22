from rest_framework import serializers
from .models import Categoria, Movimiento

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class MovimientoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    class Meta:
        model = Movimiento
        fields = ['id', 'tipo', 'categoria', 'categoria_nombre', 'monto', 'descripcion', 'fecha']

from django.db.models import Max
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from .models import Movimiento
from .serializers import MovimientoSerializer
import json


User = get_user_model()

def login_required_json(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"success": False, "error": "No autenticado"}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapper

# --- MOVIMIENTO DETALLE ---

@csrf_exempt
@login_required_json
def movimiento_detalle_view(request, id):
    user = request.user
    if request.method == "PUT":
        data = json.loads(request.body)
        try:
            movimiento = Movimiento.objects.get(id=data.get("id"), usuario=user)
        except Movimiento.DoesNotExist:
            return JsonResponse({"success": False, "error": "Movimiento no encontrado"}, status=404)

        # Actualizar campos básicos
        movimiento.tipo = data.get("tipo", movimiento.tipo)
        movimiento.monto = data.get("monto", movimiento.monto)
        movimiento.descripcion = data.get("descripcion", movimiento.descripcion)
        movimiento.fecha = data.get("fecha", movimiento.fecha)

        # Actualizar categoría solo si viene y según el tipo
        if "categoria" in data:
            print('DATA CATEGORIA >>>', data["categoria"])
            if movimiento.tipo == "INGRESO":
                movimiento.categoria = data["categoria"]
            elif movimiento.tipo == "EGRESO":
                movimiento.categoria = data["categoria"]

        movimiento.save()
        return JsonResponse({"success": True})

    elif request.method == "DELETE":
        try:
            movimiento = Movimiento.objects.get(id=id, usuario=user)
            movimiento.delete()
            return JsonResponse({"success": True})
        except Movimiento.DoesNotExist:
            return JsonResponse({"success": False, "error": "Movimiento no encontrado"}, status=404)

# --- CHECK AUTH ---
def check_auth_view(request):
    return JsonResponse({"authenticated": request.user.is_authenticated})


# --- LOGIN ---
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user = authenticate(username=data["username"], password=data["password"])
        if user:
            login(request, user)  # guarda la sesión
            return JsonResponse({"success": True, "user": user.username})
        return JsonResponse({"success": False, "error": "Credenciales inválidas"})

# --- LOGOUT ---
@csrf_exempt
def logout_view(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"success": True})

# --- REGISTER ---
@csrf_exempt
def register_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if User.objects.filter(username=data["username"]).exists():
            return JsonResponse({"success": False, "error": "Usuario ya existe"})
        user = User.objects.create_user(
            username=data["username"],
            password=data["password"],
            nombre=data.get("nombre", ""),
            apellido=data.get("apellido", ""),
            telefono=data.get("telefono", ""),
            fecha_nacimiento=data.get("fecha_nacimiento", None)
        )
        return JsonResponse({"success": True, "user": user.username})

# --- DECORADOR LOGIN PARA APIs ---
def login_required_json(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"success": False, "error": "No autenticado"}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapper

# --- MOVIMIENTOS ---
@csrf_exempt
@login_required_json
def movimientos_view(request):
    user = request.user

    if request.method == "GET":
        movimientos = Movimiento.objects.filter(usuario=user)
        serializer = MovimientoSerializer(movimientos, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        data = json.loads(request.body)
        print('DATA POST >>>', data)

        max_id = Movimiento.objects.aggregate(max_id=Max('id'))['max_id'] or 0
        nuevo_id = max_id + 1

        movimiento_data = {
            'id': nuevo_id,
            "usuario": user,
            "tipo": data["tipo"],
            "monto": data["monto"],
            "descripcion": data.get("descripcion", ""),
            "fecha": data.get("fecha", None),
        }

        # Agregamos la categoría solo según el tipo
        if data["tipo"] == "INGRESO" and "categoria" in data:
            movimiento_data["categoria"] = data["categoria"]
        elif data["tipo"] == "EGRESO" and "categoria" in data:
            movimiento_data["categoria"] = data["categoria"]

        movimiento = Movimiento.objects.create(**movimiento_data)

        return JsonResponse({"success": True, "id": movimiento.id})


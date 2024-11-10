import bcrypt
from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import jwt
from functools import wraps
from .dbConfig import Config

def require_authentication(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token de autenticação ausente"}), 401

        try:
            token = token.split(" ")[1] if " " in token else token
            payload = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            request.user_id = payload["user_id"]  
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401

        return f(*args, **kwargs)
    return decorated_function

def encrypt(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_pass(pass_provided, pass_stored):
    if bcrypt.checkpw(pass_provided.encode('utf-8'), pass_stored):
        print("Login bem sucedido")
        return True
    return False

def generate_jwt(user_id):
    """Generate a JWT token for either a volunteer or company."""
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + timedelta(hours=1)  # Token expiration
    }
    token = jwt.encode(payload, Config.SECRET_KEY, algorithm="HS256")
    return token
from flask import Blueprint, jsonify, request
from ..models.Volunteer import Volunteer
from ..config.auth import encrypt, check_pass

volunteer_bp = Blueprint('volunteer', __name__)

@volunteer_bp.route('/volunteers/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get("email") or not data.get("senha"):
        return jsonify({"error": "Os atributos email/senha devem ser preenchidos"}), 400
    volunteer = Volunteer.find_by_email(data.get("email"))
    if not volunteer:
        return jsonify({"error": "Company not found"}), 404
    if check_pass(data.get("senha"),volunteer["senha"]):
        return jsonify({"message": "Login bem sucedido"}), 200

    return jsonify({"error": "Credenciais inválidas"}), 401


@volunteer_bp.route('/volunteers', methods=['POST'])
def create_volunteer():
    data = request.json
    if not data.get("senha") or not data.get("email"):
        return jsonify({"error": "Os atributos email/senha devem ser preenchidos"}), 400
    vol_id = Volunteer.create(data)
    if not vol_id:
        return jsonify({"error": "O email já está cadastrado no sistema"}), 400
    return jsonify({"id": str(vol_id)}), 201


@volunteer_bp.route('/volunteers/<vol_id>', methods=['GET'])
def get_volunteer(vol_id):
    volunteer = Volunteer.find_by_id(vol_id)
    if volunteer:
        volunteer["_id"] = str(volunteer["_id"])
        return jsonify(volunteer)
    return jsonify({"error": "Volunteer not found"}), 404

@volunteer_bp.route('/volunteers/<vol_id>', methods=['PUT'])
def update_volunteer(vol_id):
    data = request.json
    updated_count = Volunteer.update_volunteer(vol_id, data)
    if updated_count:
        return jsonify({"message": "Volunteer updated"})
    return jsonify({"error": "Volunteer not found"}), 404

@volunteer_bp.route('/volunteers/<vol_id>', methods=['DELETE'])
def delete_volunteer(vol_id):
    deleted_count = Volunteer.delete_volunteer(vol_id)
    if deleted_count:
        return jsonify({"message": "Volunteer deleted"})
    return jsonify({"error": "Volunteer not found"}), 404
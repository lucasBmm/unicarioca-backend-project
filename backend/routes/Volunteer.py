from flask import Blueprint, jsonify, request
from ..models.Volunteer import Volunteer
from ..config.auth import require_authentication, check_pass, generate_jwt
from ..models.VolunteerApplication import VolunteerApplication
from bson import ObjectId

volunteer_bp = Blueprint('volunteer', __name__)

@volunteer_bp.route('/volunteers/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get("email") or not data.get("senha"):
        return jsonify({"error": "Os atributos email/senha devem ser preenchidos"}), 400
    
    volunteer = Volunteer.find_by_email(data.get("email"))
    
    if not volunteer:
        return jsonify({"error": "Volunteer not found"}), 404
    
    if check_pass(data.get("senha"), volunteer["senha"]):
        token = generate_jwt(volunteer["_id"])
        return jsonify({ "token": token, "username": volunteer["username"]  }), 200

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

@volunteer_bp.route('/volunteer/applications', methods=['POST'])
def create_volunteer_application():
    data = request.json
    required_fields = ["owner", "vacancy", "interested", "position", "phone", "email"]
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({"error": f"Os atributos {', '.join(missing_fields)} devem ser preenchidos"}), 400
    application_id = VolunteerApplication.create(data)  
    if not application_id:
        return jsonify({"error": "Erro ao criar a aplicação para a vaga de voluntariado"}), 400

    return jsonify({"id": str(application_id)}), 201

@volunteer_bp.route('/volunteer/applications/<string:owner>', methods=['GET'])
def get_volunteer_applications_by_owner(owner):
    try:
        applications = VolunteerApplication.find_by_owner(owner)
        
        if not applications:
            return jsonify({"error": "Nenhuma aplicação encontrada para este proprietário"}), 404

        applications_list = []
        for application in applications:
            application["_id"] = str(application["_id"])
            if isinstance(application.get("owner"), ObjectId):
                application["owner"] = str(application["owner"])
            applications_list.append(application)

        return jsonify({"applications": applications_list}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Erro interno no servidor"}), 500

@volunteer_bp.route('/volunteers/<vol_id>', methods=['GET'])
@require_authentication
def get_volunteer(vol_id):
    try:
        from bson import ObjectId
        volunteer = Volunteer.find_by_id(ObjectId(vol_id))
        if volunteer:
            volunteer["_id"] = str(volunteer["_id"])
            volunteer = dict(volunteer)
            for key, value in volunteer.items():
                if isinstance(value, bytes):
                    volunteer[key] = value.decode('utf-8', errors='ignore')
            return jsonify(volunteer)
        return jsonify({"error": "Volunteer not found"}), 404

    except Exception as e:
        print(f"Error: {e}") 
        return jsonify({"error": "Internal Server Error"}), 500

@volunteer_bp.route('/volunteers/<vol_id>', methods=['PUT'])
@require_authentication
def update_volunteer(vol_id):
    data = request.json
    updated_count = Volunteer.update_volunteer(vol_id, data)
    if updated_count:
        return jsonify({"message": "Volunteer updated"})
    return jsonify({"error": "Volunteer not found"}), 404

@volunteer_bp.route('/volunteers/<vol_id>', methods=['DELETE'])
@require_authentication
def delete_volunteer(vol_id):
    deleted_count = Volunteer.delete_volunteer(vol_id)
    if deleted_count:
        return jsonify({"message": "Volunteer deleted"})
    return jsonify({"error": "Volunteer not found"}), 404
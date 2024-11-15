import jwt
from flask import Blueprint, jsonify, request
from ..models.Vacancy import Vacancy
from datetime import datetime
from ..config.auth import require_authentication

vacancy_bp = Blueprint('vacancy', __name__)

# Helper function to validate vacancy data
def validate_vacancy_data(data):
    required_fields = ["title", "description", "requirements", "location"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return f"Campos obrigatórios ausentes: {', '.join(missing_fields)}"
    return None

@vacancy_bp.route('/vacancies', methods=['GET'])
def find_all():
    vacancies = Vacancy.find_all()
    return jsonify(vacancies), 200

@vacancy_bp.route('/vacancies', methods=['POST'])
@require_authentication
def create_vacancy():
    data = request.json
    # Validate data
    validation_error = validate_vacancy_data(data)
    if validation_error:
        return jsonify({"error": validation_error}), 400

    vac_id = Vacancy.create(data)
    if not vac_id:
        return jsonify({"error": "Já  cadastrado no sistema"}), 400
    return jsonify({"id": str(vac_id)}), 201

@vacancy_bp.route('/vacancies/<vac_id>', methods=['GET'])
@require_authentication
def get_vacancy(vac_id):
    vacancy = Vacancy.find_by_id(vac_id)
    if vacancy:
        vacancy["_id"] = str(vacancy["_id"])
        return jsonify(vacancy)
    return jsonify({"error": "Vaga não encontrada"}), 404

@vacancy_bp.route('/vacancies/<vac_id>', methods=['PUT'])
@require_authentication
def update_vacancy(vac_id):
    data = request.json
    # Validate data
    validation_error = validate_vacancy_data(data)
    if validation_error:
        return jsonify({"error": validation_error}), 400

    updated_count = Vacancy.update_vacancy(vac_id, data)
    if updated_count:
        return jsonify({"message": "Vaga atualizada"})
    return jsonify({"error": "Vaga não encontrada"}), 404

@vacancy_bp.route('/vacancies/<vac_id>', methods=['DELETE'])
@require_authentication
def delete_vacancy(vac_id):
    deleted_count = Vacancy.delete_vacancy(vac_id)
    if deleted_count:
        return jsonify({"message": "Vaga excluída com sucesso"})
    return jsonify({"error": "Vaga não encontrada"}), 404

from flask import Blueprint, jsonify, request
from ..models.Vacancy import Vacancy

vacancy_bp = Blueprint('vacancy', __name__)

@vacancy_bp.route('/vacancies', methods=['POST'])
def create_vacancy():
    data = request.json
    vac_id = Vacancy.create(data)
    if not vac_id:
        return jsonify({"error": "O email já está cadastrado no sistema"}), 400
    return jsonify({"id": str(vac_id)}), 201

@vacancy_bp.route('/vacancies/<vac_id>', methods=['GET'])
def get_vacancy(vac_id):
    vacancy = Vacancy.find_by_id(vac_id)
    if vacancy:
        vacancy["_id"] = str(vacancy["_id"])
        return jsonify(vacancy)
    return jsonify({"error": "Vaga não encontrada"}), 404

@vacancy_bp.route('/vacancies/<vac_id>', methods=['PUT'])
def update_vacancy(vac_id):
    data = request.json
    updated_count = Vacancy.update_vacancy(vac_id, data)
    if updated_count:
        return jsonify({"message": "Vaga atualizada"})
    return jsonify({"error": "Vaga não encontrada"}), 404

@vacancy_bp.route('/vacancies/<vac_id>', methods=['DELETE'])
def delete_vacancy(vac_id):
    deleted_count = Vacancy.delete_vacancy(vac_id)
    if deleted_count:
        return jsonify({"message": "Vacancy deleted"})
    return jsonify({"error": "Vacancy not found"}), 404
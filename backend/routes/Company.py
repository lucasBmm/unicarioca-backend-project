from flask import Blueprint, jsonify, request
from ..models.Company import Company
from ..config.auth import require_authentication,check_pass, generate_jwt

company_bp = Blueprint('company', __name__)

@company_bp.route('/companies/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get("email") or not data.get("senha"):
        return jsonify({"error": "Os atributos email/senha devem ser preenchidos"}), 400

    # Find company by email
    company = Company.find_by_email(data.get("email"))
    if not company:
        return jsonify({"error": "Empresa não encontrada"}), 404
    
    # Check password
    if check_pass(data.get("senha"), company["senha"]):
        # Generate JWT token for the authenticated user
        token = generate_jwt(company["_id"])
        return jsonify({ "token": token }), 200

    return jsonify({"error": "Credenciais inválidas"}), 401


@company_bp.route('/companies', methods=['POST'])
def create_company():
    data = request.get_json()
    if not data.get("senha") or not data.get("email"):
        return jsonify({"error": "Os atributos email/senha devem ser preenchidos"}), 400
    cmp_id = Company.create(data)
    if not cmp_id:
        return jsonify({"error": "O email já está cadastrado no sistema"}), 400
    return jsonify({"id": str(cmp_id)}), 201

@company_bp.route('/companies/<cmp_id>', methods=['GET'])
@require_authentication
def get_company(cmp_id):
    print(cmp_id)
    company = Company.find_by_id(cmp_id)
    if company:
        company["_id"] = str(company["_id"])
        return jsonify(company)
    return jsonify({"error": "Empresa não encontrada"}), 404

@company_bp.route('/companies/<cmp_id>', methods=['PUT'])
@require_authentication
def update_company(cmp_id):
    data = request.get_json()
    updated_count = Company.update_company(cmp_id, data)
    if updated_count:
        return jsonify({"message": "Empresa atualizada"})
    return jsonify({"error": "Empresa não encontrada"}), 404

@company_bp.route('/companies/<cmp_id>', methods=['DELETE'])
@require_authentication
def delete_company(cmp_id):
    deleted_count = Company.delete_company(cmp_id)
    if deleted_count:
        return jsonify({"message": "Empresa deletada"})
    return jsonify({"error": "Empresa não encontrada"}), 404
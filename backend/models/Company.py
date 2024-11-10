from bson import ObjectId

from ..config.dbConfig import db
from ..config.auth import encrypt

company_collection = db.get_collection("Empresa")

class Company:
    
    @staticmethod
    def create(data):
        if company_collection.find_one({"email": data.get("email")}) :
            return ""
        print(data.get("senha"))
        data["senha"] = encrypt(data.get("senha"))
        print(data.get("senha"))
        return company_collection.insert_one(data).inserted_id

    @staticmethod
    def find_by_email(email):
        return company_collection.find_one({"email": email})

    @staticmethod
    def find_by_id(data_id):
        return company_collection.find_one({"_id": ObjectId(data_id)})

    @staticmethod
    def update_company(data_id, data):
        return company_collection.update_one({"_id": ObjectId(data_id)}, {"$set": data}).modified_count

    @staticmethod
    def delete_company(data_id):
        return company_collection.delete_one({"_id": ObjectId(data_id)}).deleted_count


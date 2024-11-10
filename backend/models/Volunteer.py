from bson import ObjectId

from ..config.dbConfig import db
from ..config.auth import encrypt

volunteers_collection = db["Voluntario"]

class Volunteer:

    @staticmethod
    def create(data):
        if volunteers_collection.find_one({"email": data.get("email")}) :
            return ""
        data["senha"] = encrypt(data.get("senha"))
        return volunteers_collection.insert_one(data).inserted_id

    @staticmethod
    def find_by_email(email):
        return volunteers_collection.find_one({"email": email})

    @staticmethod
    def find_by_id(data_id):
        return volunteers_collection.find_one({"_id": ObjectId(data_id)})

    @staticmethod
    def update_volunteer(data_id, data):
        return volunteers_collection.update_one({"_id": ObjectId(data_id)}, {"$set": data}).modified_count

    @staticmethod
    def delete_volunteer(data_id):
        return volunteers_collection.delete_one({"_id": ObjectId(data_id)}).deleted_count


from bson import ObjectId
from ..config.dbConfig import db

applications_collection = db["VolunteerApplication"]

class VolunteerApplication:

    @staticmethod
    def create(data):
        application_data = {
            "owner": ObjectId(data.get("owner")),
            "vacancy": data.get("vacancy"),
            "interested": data.get("interested"),
            "position": data.get("position"),
            "phone": data.get("phone"),
            "email": data.get("email")
        }
        return applications_collection.insert_one(application_data).inserted_id

    @staticmethod
    def find_by_email(email):
        return applications_collection.find_one({"email": email})
    
    @staticmethod
    def find_by_owner(owner):
        applications = list(applications_collection.find({"owner": ObjectId(owner)}))
    
        for application in applications:
            application["_id"] = str(application["_id"])
    
        return applications

    @staticmethod
    def find_by_id(application_id):
        return applications_collection.find_one({"_id": ObjectId(application_id)})

    @staticmethod
    def update_application(application_id, data):
        return applications_collection.update_one({"_id": ObjectId(application_id)}, {"$set": data}).modified_count

    @staticmethod
    def delete_application(application_id):
        return applications_collection.delete_one({"_id": ObjectId(application_id)}).deleted_count

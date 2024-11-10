from bson import ObjectId

from ..config.dbConfig import db

vacancy_collection = db.get_collection("Vaga")

class Vacancy:

    @staticmethod
    def create(data):
        return vacancy_collection.insert_one(data).inserted_id

    @staticmethod
    def find_by_id(data_id):
        return vacancy_collection.find_one({"_id": ObjectId(data_id)})

    @staticmethod
    def update_vacancy(data_id, data):
        return vacancy_collection.update_one({"_id": ObjectId(data_id)}, {"$set": data}).modified_count

    @staticmethod
    def delete_vacancy(data_id):
        return vacancy_collection.delete_one({"_id": ObjectId(data_id)}).deleted_count

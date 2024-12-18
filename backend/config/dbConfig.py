import os

from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    MONGO_DB = os.getenv("MONGO_DB")
    SECRET_KEY = os.getenv("SECRET_KEY")


client = MongoClient(Config.MONGO_URI)
db = client[Config.MONGO_DB]
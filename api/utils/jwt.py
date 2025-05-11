import jwt
import os
from db.user import find_user_by_id


def create_access_token(user_id):
    try:
        return jwt.encode(
            {"user_id": user_id}, os.getenv("JWT_SECRET"), algorithm="HS256"
        )
    except Exception as e:
        print("create token error", e)
        return None


def decode_access_token(token):
    try:
        access_token = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
        if not isinstance(access_token, dict):
            return None
        user_id = access_token.get("user_id")
        if not user_id:
            return None
        if not isinstance(user_id, int):
            return None
        db_user = find_user_by_id(user_id)
        if not db_user:
            return None
        if db_user["access_token"] != token:
            return None
        return db_user
    except Exception as e:
        print("decode token error", e)
        return None

from math import floor
from random import random

from db.user import (
    create_user,
    find_user_by_email,
    update_user_email_verification_code,
    update_user_password,
    update_user_access_token,
)
from flask import Blueprint, request
from utils.bcrypt import check_password, hash_password
from utils.email import send_email
from utils.general import validate_email, validate_password
from utils.jwt import create_access_token, decode_access_token

user_bp = Blueprint("user", __name__)


@user_bp.route("/register", methods=["POST"])
def register():
    try:
        request_email = str(request.json.get("email"))
        request_password = str(request.json.get("password"))

        is_email_valid, email_error = validate_email(request_email)
        if not is_email_valid:
            return {
                "success": False,
                "message": email_error,
                "data": None,
            }, 400

        is_password_valid, password_error = validate_password(request_password)
        if not is_password_valid:
            return {
                "success": False,
                "message": password_error,
                "data": None,
            }, 400

        db_user = find_user_by_email(request_email)
        if db_user:
            return {
                "success": False,
                "message": "User already exists",
                "data": None,
            }, 400

        create_user(request_email, hash_password(request_password))

        return {
            "success": True,
            "message": "User registered successfully",
            "data": None,
        }, 200
    except Exception as e:
        print("register error", e)
        return {
            "success": False,
            "message": "Failed to register user",
            "data": None,
        }, 500


@user_bp.route("/login", methods=["POST"])
def login():
    try:
        request_email = str(request.json.get("email"))
        request_password = str(request.json.get("password"))

        if not request_email or not request_password:
            return {
                "success": False,
                "message": "Email and password are required",
                "data": None,
            }, 400

        db_user = find_user_by_email(request_email)
        if not db_user:
            return {
                "success": False,
                "message": "User not found",
                "data": None,
            }, 404

        is_password_valid = check_password(request_password, db_user["password"])
        if not is_password_valid:
            return {
                "success": False,
                "message": "Invalid password",
                "data": None,
            }, 400

        access_token = create_access_token(db_user["id"])
        update_user_access_token(db_user["id"], access_token)

        return {
            "success": True,
            "message": "User logged in successfully",
            "data": {
                "access_token": access_token,
            },
        }, 200
    except Exception as e:
        print("login error", e)
        return {"success": False, "message": "Failed to login", "data": None}, 500


@user_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    try:
        request_email = str(request.json.get("email"))
        if not request_email:
            return {"success": False, "message": "Email is required", "data": None}, 400

        db_user = find_user_by_email(request_email)
        if not db_user:
            return {"success": False, "message": "User not found", "data": None}, 404

        email_verification_code = floor(random() * 1000000)
        update_user_email_verification_code(db_user["id"], email_verification_code)

        send_email(
            request_email,
            "Searchify - Password Reset",
            f"Your password reset code is {email_verification_code}",
        )

        return {
            "success": True,
            "message": "Password reset email sent",
            "data": None,
        }, 200
    except Exception as e:
        print("forgot password error", e)
        return {
            "success": False,
            "message": "Failed to forgot password",
            "data": None,
        }, 500


@user_bp.route("/change-password", methods=["POST"])
def change_password():
    try:
        request_email = str(request.json.get("email"))
        request_password = str(request.json.get("password"))
        request_email_verification_code = str(
            request.json.get("email_verification_code")
        )

        if (
            not request_email
            or not request_password
            or not request_email_verification_code
        ):
            return {
                "success": False,
                "message": "Email, password, and email verification code are required",
                "data": None,
            }, 400

        is_valid_password, password_error = validate_password(request_password)
        if not is_valid_password:
            return {
                "success": False,
                "message": password_error,
                "data": None,
            }, 400

        db_user = find_user_by_email(request_email)
        if not db_user:
            return {
                "success": False,
                "message": "User not found",
                "data": None,
            }, 400

        if int(db_user["email_verification_code"]) != int(
            request_email_verification_code
        ):
            return {
                "success": False,
                "message": "Invalid email verification code",
                "data": None,
            }, 400

        update_user_password(db_user["id"], hash_password(request_password))

        return {
            "success": True,
            "message": "Password changed successfully",
            "data": None,
        }, 200
    except Exception as e:
        print("change password error", e)
        return {
            "success": False,
            "message": "Failed to change password",
            "data": None,
        }, 500


@user_bp.route("/profile", methods=["GET"])
def profile():
    try:
        db_user = decode_access_token(request.headers.get("Authorization"))
        if not db_user:
            return {
                "success": False,
                "message": "Unauthorized",
                "data": None,
            }, 401

        return {
            "success": True,
            "message": "Profile retrieved successfully",
            "data": {
                "id": db_user["id"],
                "email": db_user["email"],
            },
        }, 200

    except Exception as e:
        print("profile error", e)
        return {
            "success": False,
            "message": "Failed to get profile",
            "data": None,
        }, 500


@user_bp.route("/logout", methods=["POST"])
def logout():
    try:
        db_user = decode_access_token(request.headers.get("Authorization"))
        if not db_user:
            return {
                "success": False,
                "message": "Unauthorized",
                "data": None,
            }, 401

        update_user_access_token(db_user["id"], None)

        return {
            "success": True,
            "message": "User logged out successfully",
            "data": None,
        }, 200
    except Exception as e:
        print("logout error", e)
        return {
            "success": False,
            "message": "Failed to logout",
            "data": None,
        }, 500

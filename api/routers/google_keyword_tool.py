from flask import Blueprint, request
from lib.selenium import get_keywords
from utils.jwt import decode_access_token
from db.geotarget import get_geotarget

google_keyword_tool_bp = Blueprint("google_keyword_tool", __name__)


@google_keyword_tool_bp.route("/search", methods=["POST"])
def search():
    try:
        db_user = decode_access_token(request.headers.get("Authorization"))
        if not db_user:
            return {
                "success": False,
                "message": "Unauthorized",
                "data": None,
            }, 401

        request_keyword = request.json.get("keyword")
        request_geotarget_id = request.json.get("geotarget_id")

        if not request_keyword or not request_geotarget_id:
            return {
                "success": False,
                "message": "Keyword and geotarget_id are required",
                "data": None,
            }, 400

        request_keyword = str(request_keyword)
        request_geotarget_id = int(request_geotarget_id)

        geotarget = get_geotarget(request_geotarget_id)
        if not geotarget:
            return {
                "success": False,
                "message": "Location not found",
                "data": None,
            }, 404

        response_keywords = {"google_ads": []}

        response_keywords = get_keywords(
            request_keyword, geotarget["uule"], geotarget["openvpn_config"]
        )

        return {
            "success": True,
            "message": "Search completed successfully",
            "data": response_keywords,
        }

    except Exception as e:
        print("search error", e)
        return {
            "success": False,
            "message": "Failed to search",
            "data": None,
        }, 500

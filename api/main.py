from flask import Flask
from flask_cors import CORS
from routers.user import user_bp
from routers.google_keyword_tool import google_keyword_tool_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(google_keyword_tool_bp, url_prefix='/google-keyword-tool')
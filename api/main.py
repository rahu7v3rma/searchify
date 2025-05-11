from flask import Flask
from flask_cors import CORS
from routers.user import user_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(user_bp, url_prefix='/user')

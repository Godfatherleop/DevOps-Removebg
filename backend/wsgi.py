from fastapi import FastAPI
from mangum import Mangum  # Use this if going for AWS lambda (ignore here)
from fastapi.middleware.wsgi import WSGIMiddleware
from main import app  # assuming your FastAPI app is in main.py

# Optional: wrap with WSGI for compatibility
from flask import Flask
flask_app = Flask(__name__)
flask_app.wsgi_app = WSGIMiddleware(app)
application = flask_app  # WSGI expects "application" variable

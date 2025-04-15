from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Enable CORS after initializing Flask app
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    db.init_app(app)
    migrate.init_app(app, db)

    # Import models so they’re registered
    from .models import User, CrimeReport, CrimeLocation, UserLocation

    # Import and register routes blueprint
    from .routes import crime_alerts_bp
    app.register_blueprint(crime_alerts_bp)

    return app

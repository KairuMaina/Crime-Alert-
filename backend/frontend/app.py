from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  # Import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)  # Enable CORS for the whole app

    db.init_app(app)
    migrate.init_app(app, db)

    # import models and routes as usual
    from .models import User, CrimeReport, CrimeLocation, UserLocation
    from .routes import crime_alerts_bp
    app.register_blueprint(crime_alerts_bp)

    return app

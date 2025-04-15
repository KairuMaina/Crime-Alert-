from app import create_app, db
from flask_migrate import Migrate

# Create Flask app instance
app = create_app()

# Initialize Migrate with app and db
migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# Database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'  # or other DB URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Example model
class CrimeReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255))

@app.route('/')
def home():
    return 'Crime Alert App'

if __name__ == '__main__':
    app.run(debug=True)

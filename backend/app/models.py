from app import db

# User Model
class User(db.Model):
    __tablename__ = 'user'
    id    = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    reports = db.relationship('CrimeReport', backref='user', lazy=True)

# Crime Report Model
class CrimeReport(db.Model):
    __tablename__ = 'crime_report'
    id            = db.Column(db.Integer, primary_key=True)
    description   = db.Column(db.String(255), nullable=False)
    date_reported = db.Column(db.String(100), nullable=False)
    user_id       = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Crime Location Model (Many-to-Many with User)
class CrimeLocation(db.Model):
    __tablename__ = 'crime_location'
    id            = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String(255), nullable=False)
    users         = db.relationship('User', secondary='user_location', backref='crime_locations')

# Association Table
class UserLocation(db.Model):
    __tablename__ = 'user_location'
    user_id        = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    location_id    = db.Column(db.Integer, db.ForeignKey('crime_location.id'), primary_key=True)
    additional_info = db.Column(db.String(255))  # User‑submittable attribute

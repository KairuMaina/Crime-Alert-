from datetime import datetime
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
    date_reported = db.Column(db.DateTime, default=datetime.utcnow)
    user_id       = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    severity_level = db.Column(db.String(20), nullable=False)  # Low, Medium, High
    location_id   = db.Column(db.Integer, db.ForeignKey('crime_location.id'), nullable=True)
    tags = db.relationship('Tag', secondary='crime_report_tag', backref='crime_reports')

# Crime Location Model (Many-to-Many with User)
class CrimeLocation(db.Model):
    __tablename__ = 'crime_location'
    id            = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String(255), nullable=False)
    users         = db.relationship('User', secondary='user_location', backref='crime_locations')
    reports       = db.relationship('CrimeReport', backref='location', lazy=True)

# Association Table
class UserLocation(db.Model):
    __tablename__ = 'user_location'
    user_id        = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    location_id    = db.Column(db.Integer, db.ForeignKey('crime_location.id'), primary_key=True)
    additional_info = db.Column(db.String(255))  # User‑submittable attribute

# Tag Model
class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(100), nullable=False, unique=True)

# Crime Report Tag Association Table
class CrimeReportTag(db.Model):
    __tablename__ = 'crime_report_tag'
    crime_report_id = db.Column(db.Integer, db.ForeignKey('crime_report.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), primary_key=True)
    user_note = db.Column(db.String(255))  # Optional extra note by the user

from app import db

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(300), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "message": self.message
        }

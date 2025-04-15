# backend/app/routes.py

from flask import Blueprint, request, jsonify
from app import db
from app.models import User, CrimeReport, CrimeLocation, UserLocation

# Blueprint definition
crime_alerts_bp = Blueprint('crime_alerts', __name__, url_prefix='/api')

# -------- User routes --------

@crime_alerts_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(name=data['name'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
    }), 201

@crime_alerts_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([
        {'id': u.id, 'name': u.name, 'email': u.email}
        for u in users
    ]), 200

# ------ CrimeReport routes -------

@crime_alerts_bp.route('/reports', methods=['POST'])
def create_report():
    data = request.get_json()
    report = CrimeReport(
        description=data['description'],
        date_reported=data['date_reported'],
        user_id=data['user_id']
    )
    db.session.add(report)
    db.session.commit()
    return jsonify({
        'id': report.id,
        'description': report.description,
        'date_reported': report.date_reported,
        'user_id': report.user_id
    }), 201

@crime_alerts_bp.route('/reports', methods=['GET'])
def get_reports():
    reports = CrimeReport.query.all()
    return jsonify([
        {
            'id': r.id,
            'description': r.description,
            'date_reported': r.date_reported,
            'user_id': r.user_id
        } for r in reports
    ]), 200

# (You can add update/delete later for full CRUD.)

# ------- (Optional) Location routes for stretch -------

@crime_alerts_bp.route('/locations', methods=['POST'])
def create_location():
    data = request.get_json()
    loc = CrimeLocation(location_name=data['location_name'])
    db.session.add(loc)
    db.session.commit()
    return jsonify({'id': loc.id, 'location_name': loc.location_name}), 201

@crime_alerts_bp.route('/locations', methods=['GET'])
def get_locations():
    locs = CrimeLocation.query.all()
    return jsonify([
        {'id': l.id, 'location_name': l.location_name}
        for l in locs
    ]), 200

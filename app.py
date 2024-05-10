from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__, static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///glamflow.db'
db = SQLAlchemy(app)

# Define data models
class Salon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    services = db.relationship('Service', backref='salon', lazy='dynamic')

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    salon_id = db.Column(db.Integer, db.ForeignKey('salon.id'), nullable=False)
    appointments = db.relationship('Appointment', backref='service', lazy='dynamic')

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)

# Routes
@app.route('/')
def home():
    # Render the home page with the search form
    return render_template('home.html')

@app.route('/search', methods=['POST'])
def search():
    # Get the search parameters from the request
    service_type = request.form.get('service_type')
    location = request.form.get('location')
    date = request.form.get('date')
    time = request.form.get('time')

    # Query the database for available appointments
    appointments = Appointment.query.filter(
        Appointment.date == datetime.strptime(date, '%Y-%m-%d').date(),
        Appointment.time == datetime.strptime(time, '%H:%M').time(),
        Service.name.ilike(f'%{service_type}%'),
        Salon.address.ilike(f'%{location}%')
    ).join(Service).join(Salon).all()

    # Prepare the search results
    results = []
    for appointment in appointments:
        salon = appointment.service.salon
        result = {
            'salon_id': salon.id,
            'salon_name': salon.name,
            'salon_address': salon.address,
            'salon_phone': salon.phone,
            'salon_rating': salon.rating,
            'service_name': appointment.service.name,
            'appointment_date': appointment.date.strftime('%Y-%m-%d'),
            'appointment_time': appointment.time.strftime('%H:%M')
        }
        results.append(result)

    # Return the search results as JSON
    return jsonify(results)

@app.route('/salon/<int:salon_id>')
def salon_details(salon_id):
    # Query the database for the salon details
    salon = Salon.query.get_or_404(salon_id)

    # Prepare the salon details
    details = {
        'salon_name': salon.name,
        'salon_address': salon.address,
        'salon_phone': salon.phone,
        'salon_rating': salon.rating,
        'services': [service.name for service in salon.services]
    }

    # Return the salon details as JSON
    return jsonify(details)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
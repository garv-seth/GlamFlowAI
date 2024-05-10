from flask import Flask, render_template, request, jsonify
from datetime import datetime
import json

app = Flask(__name__, static_folder='static')

# Load data from JSON file
with open('salons.json', 'r') as file:
    salons_data = json.load(file)

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

    # Query the JSON data for available appointments
    results = []
    for salon in salons_data:
        for service in salon['services']:
            if service['name'].lower() == service_type.lower() and salon['address'].lower() == location.lower():
                for appointment_date, appointment_times in service['timings'].items():
                    if appointment_date == date:
                        for appointment_time, status in appointment_times.items():
                            if appointment_time == time and status == 'Free':
                                result = {
                                    'salon_id': salon['id'],
                                    'salon_name': salon['name'],
                                    'salon_address': salon['address'],
                                    'salon_phone': salon['phone'],
                                    'salon_rating': salon['rating'],
                                    'service_name': service['name'],
                                    'service_price': service['price'],
                                    'appointment_date': appointment_date,
                                    'appointment_time': appointment_time
                                }
                                results.append(result)

    # Return the search results as JSON
    return jsonify(results)

@app.route('/salon/<int:salon_id>')
def salon_details(salon_id):
    # Get salon details from loaded JSON data
    for salon in salons_data:
        if salon['id'] == salon_id:
            services = [service['name'] for service in salon['services']]
            details = {
                'salon_name': salon['name'],
                'salon_address': salon['address'],
                'salon_phone': salon['phone'],
                'salon_rating': salon['rating'],
                'services': services
            }
            return jsonify(details)
    
    return jsonify({"error": "Salon not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)

from datetime import datetime
from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load salon data from JSON file
with open('salons.json', 'r') as f:
    salons = json.load(f)

@app.route("/search-appointments", methods=["GET"])
def search_appointments():
    service = request.args.get("service")
    location = request.args.get("location")
    date = request.args.get("date")
    time = request.args.get("time")

    try:
        date_obj = datetime.strptime(date, "%Y-%m-%d").date()
        time_obj = datetime.strptime(time, "%I:%M %p").time() if time else None
    except ValueError:
        return jsonify({"error": "Invalid date or time format"}), 400

    filtered_salons = salons.copy()
    if location:
        filtered_salons = [salon for salon in filtered_salons if location.lower() in salon["salon_location"].lower()]

    appointments = []
    for salon in filtered_salons:
        for service_option in salon["services"]:
            if service_option["service_name"] == service:
                for availability in service_option["availability"]:
                    available_date, available_time = availability.split(", ")
                    available_date_obj = datetime.strptime(available_date, "%Y-%m-%d").date()
                    available_time_obj = datetime.strptime(available_time, "%I:%M %p").time()

                    # Check for exact date and time match
                    if date_obj == available_date_obj and time_obj == available_time_obj:
                        appointments.append({
                            "salon_name": salon["salon_name"],
                            "salon_address": salon["salon_address"],
                            "salon_phone": salon["salon_phone"],
                            "salon_location": salon["salon_location"],
                            "salon_rating": salon["salon_rating"],
                            "service_name": service_option["service_name"],
                            "service_price": service_option["service_price"],
                            "availability": availability
                        })

    # Handle no salons found scenario
    if not appointments:
        return jsonify({"message": "No salons found for your search criteria."})

    return jsonify(appointments)

if __name__ == '__main__':
    app.run(debug=True)

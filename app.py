from datetime import datetime
from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load salon data from JSON file
with open('salons.json', 'r') as f:
    salons = json.load(f)

# Initialize bookings data
bookings = {}

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

@app.route("/book-appointment", methods=["POST"])
def book_appointment():
    global bookings
    customer_id = "1234"
    customer_name = "Aarav"
    salon_name = "The Barber Shop"
    salon_address = "789 Elm St"
    salon_phone = "(555) 555-4567"
    salon_location = "vancouver"
    salon_rating = 4.3
    service_name = "Men's Haircut"
    service_price = "38.0"
    availability = "2024-05-14, 3:00 PM"


#   "customer_id": 1234
#   "customer_name": "Aarav",
#   "salon_name": "Mane Tamers",
#   "salon_address": "10 Elm St",
#   "salon_phone": "(555) 555-1234",
#   "salon_location": "Seattle",
#   "salon_rating": 4.8,
#   "service_name": "Men's Haircut",
#   "service_price": 25.00,
#   "availability": "2024-05-20, 10:00 AM"

    # Check if customer_id and customer_name are provided
    if not customer_id or not customer_name:
        return jsonify({"error": "Customer ID and Customer Name are required"}), 400

    # Check if salon details and availability are provided
    if not (salon_name and salon_address and salon_phone and salon_location and salon_rating and
            service_name and service_price and availability):
        return jsonify({"error": "Salon details and availability are required"}), 400

    # Create or update customer booking
    if customer_id not in bookings:
        bookings[customer_id] = {"Bookings": {"upcoming": {}, "past": {}}}

    # Generate a unique booking ID
    if "counter" not in bookings[customer_id]:
        bookings[customer_id]["counter"] = 0
    bookings[customer_id]["counter"] += 1
    booking_id = bookings[customer_id]["counter"]
    print(booking_id,"bookinhhhh")
    # Add the booking details
    if salon_name not in bookings[customer_id]["Bookings"]["upcoming"]:
        bookings[customer_id]["Bookings"]["upcoming"][salon_name] = {
            "salon_address": salon_address,
            "salon_phone": salon_phone,
            "salon_location": salon_location,
            "salon_rating": salon_rating,
            "services": [],
            "availability": []
        }

    bookings[customer_id]["Bookings"]["upcoming"][salon_name]["services"].append({
        "service_name": service_name,
        "service_price": service_price
    })

    bookings[customer_id]["Bookings"]["upcoming"][salon_name]["availability"].append(availability)
    print("The bookings",bookings)
    # Write bookings data to JSON file
    with open('bookings.json', 'w') as f:
        json.dump(bookings, f, indent=4)

    return jsonify({"message": "Appointment booked successfully", "booking_id": booking_id}), 200


# Read bookings data from JSON file
try:
  with open('bookings.json', 'r') as f:
    bookings = json.load(f)
except FileNotFoundError:
  bookings = {}  # Initialize empty dictionary if file not found

@app.route("/bookings", methods=["GET"])
def get_bookings():
    """
    Get all bookings for a specific customer ID (provided as a query parameter).
    """

    customer_id = request.args.get("customer_id")

    if not customer_id:
        return jsonify({"error": "Missing customer ID"}), 400  # 400 for bad request

    if customer_id not in bookings:
        return jsonify({"error": "Customer not found"}), 404

    return jsonify(bookings[customer_id]), 200

if __name__ == '__main__':
    app.run(debug=True)
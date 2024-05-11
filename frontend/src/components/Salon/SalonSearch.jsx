import React from 'react';

const SalonSearch = ({results}) => {
  console.log("result,",results)
  let mins =  [{
    salon_id: 2,
    salon_name: "Sharp Cuts",
    salon_address: "456 Elm St",
    salon_phone: "(555) 555-5678",
    salon_rating: 4.7,
    service_name: "Men's Haircut",
    service_price: 35.00,
    appointment_date: "2024-05-12", // Replace with the selected date from your component
    appointment_time: "10:00", // Replace with the selected time from your component (assuming it's free based on the timings data)
  },]
  return (
    <div className="salon-search-results">
      {results.map((result) => (
        <div key={result.salon_id} className="salon-card">
          <img
            src="images/salon-placeholder.jpg" // Replace with placeholder or dynamic image
            alt="Salon"
          />
          <h3>{result.salon_name}</h3>
          <p className="rating">
            <span>Rating: {result.salon_rating}</span>
          </p>
          <p>
            <span className="service">Service: {result.service_name}</span>
          </p>
          <p>Date: {result.appointment_date}</p>
          <p>Time: {result.appointment_time}</p>
          <button>Book Appointment</button>
        </div>
      ))}
    </div>
  );
};

export default SalonSearch;

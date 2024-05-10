import React, { useState, useEffect } from 'react';

const SearchService = ({ onSearchResults, serviceType, location, date, time }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_type: serviceType,
            location: location,
            date: date,
            time: time,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceType && location && date && time) {
      fetchData();
    }
  }, [serviceType, location, date, time]);

  useEffect(() => {
    onSearchResults(searchResults);
  }, [searchResults, onSearchResults]);

  return (
    <div>
      {isLoading && <p>Searching for appointments...</p>}
      {error && <p>Error: {error}</p>}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result) => (
            <li key={result.salon_id} className="card">
              <img src="images/salon-placeholder.jpg" alt="Salon" /> {/* Replace with placeholder or dynamic image */}
              <h3>{result.salon_name}</h3>
              <p>
                <span className="rating">Rating: {result.salon_rating}</span>
                <span className="service">Service: {result.service_name}</span>
              </p>
              <p>Date: {result.appointment_date}</p>
              <p>Time: {result.appointment_time}</p>
              <button>Book Appointment</button> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchService;

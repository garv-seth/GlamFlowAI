import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/search', {
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

  useEffect(() => {
    generateTimeOptions();
  }, [date]);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 10; hour <= 20; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      options.push(<option key={timeString} value={timeString}>{timeString}</option>);
    }
    setAvailableTimes(options);
  };

  return (
    <section className="search-bar">
      <h2>Find Your Perfect Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="service-type">Service Type:</label>
          <select name="service-type" id="service-type" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
            <option value="">Select Service</option>
            <option value="Haircut">Haircut</option>
            <option value="Manicure">Manicure</option>
            <option value="Beard Trim">Beard Trim</option>
            {/* Add more service options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" name="location" id="location" placeholder="Enter your address or zip code" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <select name="time" id="time" value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Select Time</option>
            {availableTimes}
          </select>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Find Appointments'}
        </button>
      </form>
      {error && <p className="error-message">Error: {error}</p>}
    </section>
  );
};

export default SearchBar;

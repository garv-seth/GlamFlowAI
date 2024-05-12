import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import LandingPage from '../components/LandingPage';

const HomePage = () => {
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const handleSearch = () => {
    // Call the SearchService component with search parameters
  };

  return (
    <div className="home-page">
      <LandingPage/>
        <SearchBar
          serviceType={serviceType}
          onServiceTypeChange={setServiceType}
          location={location}
          onLocationChange={setLocation}
          date={date}
          onDateChange={setDate}
          time={time}
          onTimeChange={setTime}
          onSubmit={handleSearch}
        />
    </div>
  );
};

export default HomePage;

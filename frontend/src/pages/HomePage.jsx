import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchService from '../components/SearchService';

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
      <header>
        <h1>GlamFlow AI</h1>
      </header>
      <main>
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
        <SearchService
          serviceType={serviceType}
          location={location}
          date={date}
          time={time}
          onSearchResults={(results) => console.log('Search results:', results)}
        />
      </main>
    </div>
  );
};

export default HomePage;

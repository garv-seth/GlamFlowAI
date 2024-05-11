import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  FormErrorMessage,
  HStack,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import SalonSearch from './Salon/SalonSearch';

export default function SearchBar() {
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchResults, setSearchResults] = useState([]);
  const bg = useColorModeValue('gray.100', 'gray.900');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const sample_data = [{
      salon_id: 2,
      salon_name: "Sharp Cuts",
      salon_address: "456 Elm St",
      salon_phone: "(555) 555-5678",
      salon_rating: 4.7,
      service_name: "Men's Haircut",
      service_price: 35.00,
      appointment_date: "2024-05-12", // Replace with the selected date from your component
      appointment_time: "10:00", // Replace with the selected time from your component (assuming it's free based on the timings data)
    },{
      salon_id: 2,
      salon_name: "Queen Bee's Studio",
      salon_address: "456 Elm St",
      salon_phone: "(555) 555-5678",
      salon_rating: 4.7,
      service_name: "Men's Haircut",
      service_price: 35.00,
      appointment_date: "2024-05-12", // Replace with the selected date from your component
      appointment_time: "10:00", // Replace with the selected time from your component (assuming it's free based on the timings data)
    }]
    try {
      // const response = await fetch('http://127.0.0.1:5000/search', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     service_type: serviceType,
      //     location: location,
      //     date: date,
      //     time: time,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to fetch search results');
      // }

      // const data = await response.json();
      // // Handle search results here
      // console.log('Search results:', data);
      // Assuming you have logic to display results in a separate component
      setSearchResults(sample_data)
      //setSearchResults(data); // Pass data to SearchResults component
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
    <>
      <Box maxW="3xl" mx="auto" py={12} bg={bg} rounded="lg" shadow="md">
        <Flex justifyContent="center">
          <Heading as="h2" fontSize="xl" mb={6}>
            Find Your Perfect Appointment
          </Heading>
        </Flex>
        <form onSubmit={handleSubmit}>
          <HStack width="full" spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="service-type">Service Type:</FormLabel>
              <Select
                id="service-type"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="Select Service"
              >
                <option value="Haircut">Haircut</option>
                <option value="Manicure">Manicure</option>
                <option value="Beard Trim">Beard Trim</option>
                {/* Add more service options as needed */}
              </Select>
              <FormErrorMessage>{error && error.serviceType}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="location">Location:</FormLabel>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your address or zip code"
              />
              <FormErrorMessage>{error && error.location}</FormErrorMessage>
            </FormControl>
          </HStack>
          <HStack width="full" spacing={4} mt={4}>
  <FormControl isRequired>
    <FormLabel htmlFor="date">Date:</FormLabel>
    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    <FormErrorMessage>{error && error.date}</FormErrorMessage>
  </FormControl>
  <FormControl isRequired>
    <FormLabel htmlFor="time">Time:</FormLabel>
    <Select id="time" value={time} onChange={(e) => setTime(e.target.value)} >
      <option value="">Select Time</option>
      {availableTimes}
    </Select>
    <FormErrorMessage>{error && error.time}</FormErrorMessage>
  </FormControl>
</HStack>
<Button type="submit" isLoading={isLoading} disabled={isLoading} colorScheme="blue">
  {isLoading ? 'Searching...' : 'Find Appointments'}
</Button>
{error && <FormErrorMessage mt={4}>{error}</FormErrorMessage>}
{/* Display search results here */}

      </form>
    </Box>
    {searchResults && <SalonSearch results={searchResults}/>}
  </>
);
}

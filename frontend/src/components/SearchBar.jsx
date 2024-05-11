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
  const bg = useColorModeValue('background', 'gray.900');
  const cardBg = useColorModeValue('background', 'gray.900');
  const textColor = useColorModeValue('text', 'text');
  const buttonBg = useColorModeValue('button.bg', 'button.bg');
  const buttonText = useColorModeValue('button.text', 'button.text');
  const buttonHoverBg = useColorModeValue('button.hoverBg', 'button.hoverBg');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const sample_data = [
      {
        salon_id: 2,
        salon_name: "Sharp Cuts",
        salon_address: "456 Elm St",
        salon_phone: "(555) 555-5678",
        salon_rating: 4.7,
        service_name: "Men's Haircut",
        service_price: 35.00,
        appointment_date: "2024-05-12",
        appointment_time: "10:00",
      },
      {
        salon_id: 2,
        salon_name: "Queen Bee's Studio",
        salon_address: "456 Elm St",
        salon_phone: "(555) 555-5678",
        salon_rating: 4.7,
        service_name: "Men's Haircut",
        service_price: 35.00,
        appointment_date: "2024-05-12",
        appointment_time: "10:00",
      },
    ];
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
      // console.log('Search results:', data);
      setSearchResults(sample_data);
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
      options.push(
        <option key={timeString} value={timeString}>
          {timeString}
        </option>
      );
    }
    setAvailableTimes(options);
  };

  return (
    <>
      <Box maxW="3xl" mx="auto" py={12} bg={cardBg} rounded="lg" shadow="md">
        <Flex justifyContent="center">
          <Heading as="h2" fontSize="xl" mb={6} color={textColor}>
            Find Your Perfect Appointment
          </Heading>
        </Flex>
        <form onSubmit={handleSubmit}>
          <HStack width="full" spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="service-type" color={textColor}>
                Service Type:
              </FormLabel>
              <Select
                id="service-type"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="Select Service"
                bg={cardBg}
                color={textColor}
              >
                <option value="Haircut">Haircut</option>
                <option value="Manicure">Manicure</option>
                <option value="Beard Trim">Beard Trim</option>
              </Select>
              <FormErrorMessage>{error && error.serviceType}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="location" color={textColor}>
                Location:
              </FormLabel>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your address or zip code"
                bg={cardBg}
                color={textColor}
              />
              <FormErrorMessage>{error && error.location}</FormErrorMessage>
            </FormControl>
          </HStack>
          <HStack width="full" spacing={4} mt={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="date" color={textColor}>
                Date:
              </FormLabel>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                bg={cardBg}
                color={textColor}
              />
              <FormErrorMessage>{error && error.date}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="time" color={textColor}>
                Time:
              </FormLabel>
              <Select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                bg={cardBg}
                color={textColor}
              >
                <option value="">Select Time</option>
                {availableTimes}
              </Select>
              <FormErrorMessage>{error && error.time}</FormErrorMessage>
            </FormControl>
          </HStack>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            colorScheme="primary"
            bg={buttonBg}
            color={buttonText}
            _hover={{ bg: buttonHoverBg }}
            mt={4}
          >
            {isLoading ? 'Searching...' : 'Find Appointments'}
          </Button>
          {error && <FormErrorMessage mt={4}>{error}</FormErrorMessage>}
        </form>
      </Box>
      {searchResults && <SalonSearch results={searchResults} />}
    </>
  );
}

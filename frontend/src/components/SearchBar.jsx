import React, { useState, useEffect } from "react";
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
  Image,
  Badge,
  Text,
} from "@chakra-ui/react";

export default function SearchBar() {
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchResults, setSearchResults] = useState([]);
  const bg = useColorModeValue("background", "gray.900");
  const cardBg = useColorModeValue("background", "gray.900");
  const textColor = useColorModeValue("text", "text");
  const buttonBg = useColorModeValue("button.bg", "button.bg");
  const buttonText = useColorModeValue("button.text", "button.text");
  const buttonHoverBg = useColorModeValue("button.hoverBg", "button.hoverBg");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const serviceParam = encodeURIComponent(serviceType);
      const locationParam = encodeURIComponent(location);
      const dateParam = new Date(date).toISOString().slice(0, 10);
      const timeParam = time;
      console.log(
        "all the params",
        serviceParam,
        locationParam,
        dateParam,
        timeParam
      );
      // const serviceParam = encodeURIComponent("Men's Haircut");
      // const locationParam = encodeURIComponent("Vancouver");
      // const dateParam = "2024-05-14";
      // const timeParam = "3:00 PM";

      const url = `http://127.0.0.1:5000/search-appointments?service=${serviceParam}&location=${locationParam}&date=${dateParam}&time=${timeParam}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      console.log("Search results idddddd:", data);
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
      for (let minute = 0; minute < 60; minute += 60) {
        const time = new Date().setHours(hour, minute);
        const formattedTime = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(time);
        options.push(
          <option key={formattedTime} value={formattedTime}>
            {formattedTime}
          </option>
        );
      }
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
                <option value="Women's Haircut">Women's Haircut</option>
                <option value="Manicure">Manicure</option>
                <option value="Men's Haircut">Men's Haircut</option>
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
            {isLoading ? "Searching..." : "Find Appointments"}
          </Button>
          {error && <FormErrorMessage mt={4}>{error}</FormErrorMessage>}
        </form>
      </Box>
      {searchResults?.length > 0 && (
        <Box mt={8} px={4}>
          <Flex flexWrap="wrap" justifyContent="center">
            {searchResults.map((result, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                maxW="400px"
                width="100%"
                mx={4}
                my={2}
                boxShadow="lg"
              >
                <Image
                  src="https://th.bing.com/th/id/OIP.uzwDBm-UYBtL0ifIzs0uPgHaGL?w=199&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                  alt="Salon"
                  objectFit="cover"
                  w="100%"
                  h="200px"
                />
                <Box p={4}>
                  <Heading as="h4" size="md" mb={2}>
                    {result.salon_name}
                  </Heading>
                  <Text fontSize="md" color="gray.500" mb={2}>
                    {result.salon_address}
                  </Text>
                  <Flex alignItems="center" mb={2}>
                    <Badge colorScheme="green" mr={2}>
                      {result.salon_rating}
                    </Badge>
                    <Text fontSize="sm">Rating</Text>
                  </Flex>
                  <Text fontSize="sm" mb={2}>
                    Service: {result.service_name}
                  </Text>
                  <Text fontSize="sm" mb={2}>
                    Date & Time: {result.availability}
                  </Text>
                  <Button
                    colorScheme="primary"
                    bg={buttonBg}
                    color={buttonText}
                    _hover={{ bg: buttonHoverBg }}
                  >
                    Book Appointment
                  </Button>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
}

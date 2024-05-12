import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';

const SalonSearch = ({ results }) => {
  console.log("result,", results);

  const cardBg = useColorModeValue('background', 'gray.900');
  const cardTextColor = useColorModeValue('text', 'text');
  const buttonBg = useColorModeValue('button.bg', 'button.bg');
  const buttonText = useColorModeValue('button.text', 'button.text');
  const buttonHoverBg = useColorModeValue('button.hoverBg', 'button.hoverBg');

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} className="salon-search-results">
      {results.map((result) => (
        <Box
          key={result.salon_id}
          className="salon-card"
          bg={cardBg}
          color={cardTextColor}
          p={4}
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
        >
          <Image
            src="images/salon-placeholder.jpg" // Replace with placeholder or dynamic image
            alt="Salon"
            borderRadius="md"
            mb={4}
          />
          <Heading as="h3" size="md" mb={2}>
            {result.salon_name}
          </Heading>
          <Text className="rating" mb={2}>
            <span>Rating: {result.salon_rating}</span>
          </Text>
          <Text className="service" mb={2}>
            Service: {result.service_name}
          </Text>
          <Text mb={2}>Date: {result.appointment_date}</Text>
          <Text mb={2}>Time: {result.appointment_time}</Text>
          <Button
            bg={buttonBg}
            color={buttonText}
            _hover={{ bg: buttonHoverBg }}
          >
            Book Appointment
          </Button>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default SalonSearch;

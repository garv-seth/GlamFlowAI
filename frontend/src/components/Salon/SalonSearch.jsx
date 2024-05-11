import React from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Badge,
  Spacer,
} from '@chakra-ui/react';

const SalonSearch = ({ results }) => {
  console.log("result,", results)
  // Placeholder data
  // let mins = [{
  //   salon_id: 2,
  //   salon_name: "Sharp Cuts",
  //   salon_address: "456 Elm St",
  //   salon_phone: "(555) 555-5678",
  //   salon_rating: 4.7,
  //   service_name: "Men's Haircut",
  //   service_price: 35.00,
  //   appointment_date: "2024-05-12",
  //   appointment_time: "10:00",
  // }];

  return (
    <Box>
      {results.map((result) => (
        <Box
          key={result.salon_id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mb={4}
        >
          <Flex>
            <Image
              src="https://th.bing.com/th?id=OIP.vJ--8dAkW-8qf-oJcqJLhwHaFJ&w=300&h=208&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              alt="Salon"
              objectFit="cover"
              w="200px"
              h="150px"
            />
            <Box p="6">
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontSize="xl" fontWeight="semibold">{result.salon_name}</Text>
                <Badge colorScheme="green">{result.salon_rating}</Badge>
              </Flex>
              <Text fontSize="sm" color="gray.500" mb={2}>{result.salon_address}</Text>
              <Text fontSize="sm" mb={2}>Service: {result.service_name}</Text>
              <Text fontSize="sm" mb={2}>Date: {result.appointment_date}</Text>
              <Text fontSize="sm" mb={2}>Time: {result.appointment_time}</Text>
              <Button colorScheme="blue">Book Appointment</Button>
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default SalonSearch;

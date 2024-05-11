import React from 'react';
import {
  Box,
  chakra,
  Image,
  Flex,
  Text,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Heading,
  Icon,
  Link,
  Button,
} from '@chakra-ui/react';
import { FaPhoneAlt, FaMapMarkerAlt, FaTimesCircle } from 'react-icons/fa';

const appointments = [
    {
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpciUyMHNhbG9ufGVufDB8fDB8fHww',
        salonName: 'The Classic Cut',
        service: 'Men\'s Haircut',
        time: '2:00 PM',
        date: '2024-05-22',
        location: '456 Elm Street, Regina, SK',
        phone: '(306) 777-5678',
      },
      {
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwYXxlbnwwfHwwfHx8MA%3D%3D',
        service: 'Swedish Massage',
        time: '11:00 AM',
        date: '2024-05-28',
        location: '789 Oak Avenue, Winnipeg, MB',
        phone: '(204) 987-6543',
      },
      {
        image: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFpbCUyMGJhcnxlbnwwfHwwfHx8MA%3D%3D',
        salonName: 'Nail Bar',
        service: 'Manicure & Pedicure',
        time: '3:00 PM',
        date: '2024-06-01',
        location: '1011 Spruce Lane, Calgary, AB',
        phone: '(403) 555-0123',
      },
      {
        image: 'https://plus.unsplash.com/premium_photo-1683120989931-87c51d2f4e4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXllYnJvdyUyMCUyMHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        salonName: 'Brow Studio',
        service: 'Eyebrow Waxing & Tinting',
        time: '1:00 PM',
        date: '2024-06-08',
        location: '1234 Pine Street, Vancouver, BC',
        phone: '(604) 432-1987',
      },
      {
        image: 'https://plus.unsplash.com/premium_photo-1661407664011-fc03539b580a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVsYXhpbmclMjByb29tJTIwZmFjaWFsJTIwdHJlYXRtZW50fGVufDB8fDB8fHww',
        salonName: 'The Relaxing Room',
        service: 'Facial Treatment',
        time: '4:30 PM',
        date: '2024-06-15',
        location: '5678 Maple Road, Toronto, ON',
        phone: '(416) 222-3333',
      }
      
  // ... other appointments
];

const AppointmentCard = ({ image, salonName, service, time, date, location, phone, onCancel }) => (
  <Box
    maxW={'sm'} // Adjust maxW for desired card width
    borderWidth={1}
    borderRadius={8}
    overflow={'hidden'}
    boxShadow={'lg'}
    transition={'transform 0.3s ease-in-out'}
    _hover={{ transform: 'translateY(-5px)' }}
    mb={8}
  >
    <Image src={image} alt={salonName} roundedTop={'md'} width={'100%'} height={'180px'} objectFit={'cover'} />
    <Stack spacing={2} py={3} px={4}>
      <Text fontWeight={600}>{salonName}</Text>
      <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
        {service}
      </Text>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {time}
        </Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {date}
        </Text>
      </Flex>
      <Flex mt={2} alignItems={'center'}>
        <Icon mr={2} as={FaMapMarkerAlt} />
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {location}
        </Text>
      </Flex>
      <Flex mt={1} alignItems={'center'}>
        <Icon mr={2} as={FaPhoneAlt} />
        <Link href={`tel:${phone}`}>{phone}</Link>
      </Flex>
      <Flex mt={2} justifyContent={'flex-end'}> {/* Position cancel button */}
        <Button variant={'ghost'} size={'xs'} onClick={onCancel}>
          <Icon as={FaTimesCircle} color={'red.500'} /> Cancel
        </Button>
      </Flex>
    </Stack>
  </Box>
);

export default function AppointmentList() {
  const handleCancelAppointment = (appointment) => {
    // Implement logic to handle appointment cancellation (e.g., confirmation prompt, API call to cancel)
    console.log('Appointment cancelled:', appointment);
  };

  return (
    <>
      <Heading as="h2" size="xl" mb={8}>
        My Appointments
      </Heading>
      <SimpleGrid minChildWidth={'300px'} spacing={8}>
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.date + appointment.time}
            {...appointment}
            onCancel={() => handleCancelAppointment(appointment)} // Pass handleCancelAppointment function
          />
        ))}
      </SimpleGrid>
    </>
  );
}

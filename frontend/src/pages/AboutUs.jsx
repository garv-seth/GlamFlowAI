import React from 'react';
import { Box, Heading, Text, Stack, useColorModeValue } from '@chakra-ui/react';

function AboutUs() {
  return (
    <Box maxW="7xl" mx="auto" py={16} px={4}>
      <Heading as="h2" size="xl" mb={4}>
        About GlamGlow AI
      </Heading>
      <Stack spacing={8}>
        <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
          GlamGlow AI is a revolutionary appointment booking platform designed to empower
          both beauty professionals and clients. We understand the challenges of finding
          last-minute appointments, and that's where we come in. Our AI-powered system
          connects you with available slots at your favorite salons and spas,
          eliminating the hassle of endless phone calls and online searches.
        </Text>
        <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
          At GlamGlow AI, we believe in the importance of self-care and well-being.
          We're passionate about providing a convenient and rewarding way to schedule
          appointments that fit your busy lifestyle. By using our platform, you can:
        </Text>
        <Stack spacing={4}>
          <Text>
            - Book appointments instantly, even for the same day or next day.
          </Text>
          <Text>
            - Discover a wide range of beauty professionals and services in your area.
          </Text>
          <Text>
            - Enjoy exclusive discounts and promotions offered by salons and spas.
          </Text>
          <Text>
            - Earn loyalty points with every booking, redeemable for future appointments or rewards.
          </Text>
        </Stack>
        <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
          GlamGlow AI is committed to providing a seamless and secure user experience.
          We utilize advanced technology to ensure the confidentiality and privacy of
          your information. Join the GlamGlow AI community today and experience the
          future of beauty appointments!
        </Text>
      </Stack>
    </Box>
  );
}

export default AboutUs;

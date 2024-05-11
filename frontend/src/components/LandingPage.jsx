import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Input,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"; // Using Chakra UI SearchIcon
import ServiceCard from "./ServiceCard"; // Replace with your component for service details

export default function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <HStack width="full" justifyContent="center">
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
              color={bg}
            >
              Never Miss a Minute of Me-Time: GlamFlow AI to the Rescue!
            </Heading>
          </HStack>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="full"
          >
            <Text color="gray.500" fontSize="sm" mr={4}>
              Skip the endless scrolling and book salon appointments instantly:
            </Text>
          </Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon></SearchIcon>
            </InputLeftElement>
            <Input
              size="xl"
              type="text"
              placeHolder="Search Last minute appointments powered by AI"
            />
            <InputRightAddon>
              <Text>Search</Text>
            </InputRightAddon>
          </InputGroup>
          {/* Replace with your actual service details and button component */}
          <ServiceCard
            title="Haircut"
            description="Get a fresh cut from our expert stylists."
            buttonText="Book Haircut"
          />
          <ServiceCard
            title="Manicure"
            description="Pamper your nails with a relaxing manicure."
            buttonText="Book Manicure"
          />
          <ServiceCard
            title="Waxing"
            description="Smooth and confident with our waxing services."
            buttonText="Book Waxing"
          />
          <Button
            colorScheme="green"
            bg="green.400"
            rounded="full"
            px={6}
            _hover={{ bg: "green.500" }}
          >
            Book Now
          </Button>
        </Stack>
      </Container>
    </>
  );
}

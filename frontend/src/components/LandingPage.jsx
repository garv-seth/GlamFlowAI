import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  VStack,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import { SearchIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function LandingPage() {
  const theme = useTheme();
  const primaryColor = useColorModeValue("primary", "primary");
  const textColor = useColorModeValue("text", "text");
  const inputPlaceholderColor = useColorModeValue("gray.500", "gray.400");

  return (
    <>
      <Box
        bgImage="url('/assets/salon-image.svg')" // Ensure the image path is correct
        bgSize="cover"
        bgPosition="center"
        py={20}
      >
        <Container maxW={"7xl"}>
          <VStack spacing={{ base: 8, md: 14 }} alignItems="flex-start" textAlign="left">
            <Heading
              fontFamily="Lora"
              fontWeight={700}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
              color={theme.colors.background}  // Set the color to the background color from the theme
            >
              GlamFlow AI
            </Heading>
            <Text 
            fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} 
            fontWeight="bold" color={theme.colors.background}>
              Your AI-Powered last-minute salon saviour!
            </Text>
            <Box width="full">
              <InputGroup size="lg" boxShadow="lg" mb={4}>
                <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
                <Input
                  placeholder="Book your services..."
                  bg="white"
                  borderColor="gray.300"
                  _placeholder={{ color: inputPlaceholderColor }}
                  borderRadius="md"
                />
                <Input
                  placeholder="Where"
                  bg="white"
                  borderColor="gray.300"
                  _placeholder={{ color: inputPlaceholderColor }}
                  borderRadius="md"
                  ml={2}
                  width="30%"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    icon={<SearchIcon />}
                    colorScheme="pink"
                    aria-label="Search"
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
            <Text fontSize={{ base: "md", sm: "lg", md: "xl" }}fontWeight="bold" color={theme.colors.background}>
              or ask our AI assistant
            </Text>
            <Box width="full">
              <InputGroup size="lg" boxShadow="lg">
                <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
                <Input
                  placeholder="eg. A Vancouver salon offering both hairstyling and manicure services."
                  bg="white"
                  borderColor="gray.300"
                  _placeholder={{ color: inputPlaceholderColor }}
                  borderRadius="md"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    icon={<ArrowRightIcon />}
                    colorScheme="pink"
                    aria-label="Search AI"
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </VStack>
        </Container>
      </Box>
      <Container maxW={"5xl"} py={10}>
        <VStack spacing={4} textAlign="center">
          <Heading as="h2" fontFamily="Lora" fontSize="3xl" color={textColor}>
            About GlamFlow
          </Heading>
          <Text color={textColor} px={4}>
            GlamFlow AI is a revolutionary appointment booking platform designed to empower both beauty professionals and clients. We understand the challenges of finding last-minute appointments, and that's where we come in. Our AI-powered system connects you with available slots at your favourite salons and spas, eliminating the hassle of endless phone calls and online searches.
          </Text>
        </VStack>
      </Container>
    </>
  );
}

import React from 'react';
import {
  CardHeader,
  CardFooter,
  CardBody,
  SimpleGrid,
  Card,
  Button,
  Heading,
  Text,
  Link
} from '@chakra-ui/react';

export default function CaptionCarousel() {

  return (
    <SimpleGrid spacing={2} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
  <Card>
    <CardHeader>
      <Heading size='md'> Hair Salons</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
    <CardFooter>
    <Link to="/salon-details">
          <Button>View here</Button>
        </Link>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md'> Tattoo Parlours</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
    <CardFooter>
      <Button>View here</Button>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md'>Nail Salons</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
    <CardFooter>
      <Button>View here</Button>
    </CardFooter>
  </Card>
</SimpleGrid>
  );
}
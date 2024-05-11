import {
  CardHeader,
  CardFooter,
  CardBody,
  SimpleGrid,
  Card,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

export default function ServiceCard() {
  const cardBg = useColorModeValue('background', 'gray.900');
  const cardTextColor = useColorModeValue('text', 'text');
  const buttonBg = useColorModeValue('button.bg', 'button.bg');
  const buttonText = useColorModeValue('button.text', 'button.text');
  const buttonHoverBg = useColorModeValue('button.hoverBg', 'button.hoverBg');

  return (
    <SimpleGrid spacing={2} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      <Card bg={cardBg} color={cardTextColor}>
        <CardHeader>
          <Heading size='md'>Hair Salons</Heading>
        </CardHeader>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
          <Link href="/salon-details">
            <Button
              bg={buttonBg}
              color={buttonText}
              _hover={{ bg: buttonHoverBg }}
            >
              View here
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card bg={cardBg} color={cardTextColor}>
        <CardHeader>
          <Heading size='md'>Tattoo Parlours</Heading>
        </CardHeader>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
          <Button
            bg={buttonBg}
            color={buttonText}
            _hover={{ bg: buttonHoverBg }}
          >
            View here
          </Button>
        </CardFooter>
      </Card>
      <Card bg={cardBg} color={cardTextColor}>
        <CardHeader>
          <Heading size='md'>Nail Salons</Heading>
        </CardHeader>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
          <Button
            bg={buttonBg}
            color={buttonText}
            _hover={{ bg: buttonHoverBg }}
          >
            View here
          </Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}

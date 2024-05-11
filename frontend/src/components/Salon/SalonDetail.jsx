import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
  } from '@chakra-ui/react';
  
  export default function SalonDetail() {
    return (
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={
                'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFpciUyMHNhbG9ufGVufDB8fDB8fHww'
              }
              fit={'cover'}
              align={'center'} 
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              Hair Salon Services
            </Heading>
          </Box>

          <Stack spacing={{ base: 4, sm: 6 }} direction={'column'} divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize={'2xl'} fontWeight={'300'}>
                We offer a variety of hair care services to meet your needs. From haircuts and styling to coloring and treatments, our experienced stylists will help you achieve your desired look.
              </Text>
              <Text fontSize={'lg'}>
                Browse our services and pricing below, or book an appointment for a personalized consultation.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Services
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Haircut - $30</ListItem>
                  <ListItem>Haircut & Style - $45</ListItem>
                  <ListItem>Hair Color (Single Process) - Starting at $60</ListItem>
                  <ListItem>Hair Color (Highlights) - Starting at $80</ListItem>
                  <ListItem>Hair Extensions - Starting at $150</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Deep Conditioning Treatment - $25</ListItem>
                  <ListItem>Keratin Treatment - Starting at $200</ListItem>
                  <ListItem>Perm - Starting at $75</ListItem>
                  <ListItem>Updo - Starting at $100</ListItem>
                  <ListItem>Scalp Massage - $15 (add-on service)</ListItem>
                </List>
              </SimpleGrid>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Book Appointment
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <Text>Free Consultation</Text>
          </Stack>
        </Stack>
        </SimpleGrid>
      </Container>
    );
  }
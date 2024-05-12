import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

const userProfileData = {
  name: 'Carla',
  location: 'San Francisco, CA',
  preferences: {
    hairCare: 'Haircut, Coloring',
    nails: 'French Tip',
    tattoos: 'Sophia Lee',
    favoriteSalon: 'Mane Magic',
    favoriteColor: 'Blue',
  },
};

const BeautyCategory = ({ label, value, onEditClick }) => (
  <>
    <Text mt={2}>
      <b>{label}:</b> {value}
    </Text>
    <Button size="xs" variant="ghost" onClick={() => onEditClick(label)}>
      Edit
    </Button>
  </>
);

const UserProfile = () => {
  const [userData, setUserData] = useState(userProfileData);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setSelectedCategory('');
    setIsEditOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, preferences: { ...userData.preferences, [name]: value } });
  };

  const handleCheckboxChange = (values) => {
    setUserData({
      ...userData,
      preferences: {
        ...userData.preferences,
        hairCare: values.join(', '),
      },
    });
  };

  const getEditContent = () => {
    switch (selectedCategory) {
      case 'hairCare':
        return (
          <FormControl mt={4}>
            <FormLabel htmlFor="hairCare">Hair Care Preferences</FormLabel>
            <CheckboxGroup value={userData.preferences.hairCare.split(', ')} onChange={handleCheckboxChange}>
              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                <Checkbox value="Haircut">Haircut</Checkbox>
                <Checkbox value="Coloring">Coloring</Checkbox>
                <Checkbox value="Other">Other</Checkbox>
              </Grid>
            </CheckboxGroup>
          </FormControl>
        );
      case 'nails':
        return (
          <FormControl mt={4}>
            <FormLabel htmlFor="nails">Nail Art Preferences</FormLabel>
            <Input id="nails" value={userData.preferences.nails} onChange={handleInputChange} name="nails" />
          </FormControl>
        );
      case 'tattoos':
        return (
          <FormControl mt={4}>
            <FormLabel htmlFor="tattoos">Tattoo Artist</FormLabel>
            <Input id="tattoos" value={userData.preferences.tattoos} onChange={handleInputChange} name="tattoos" />
          </FormControl>
        );
      case 'favoriteSalon':
        return (
          <FormControl mt={4}>
            <FormLabel htmlFor="favoriteSalon">Favorite Salon</FormLabel>
            <Input id="favoriteSalon" value={userData.preferences.favoriteSalon} onChange={handleInputChange} name="favoriteSalon" />
          </FormControl>
        );
      case 'favoriteColor':
        return (
          <FormControl mt={4}>
            <FormLabel htmlFor="favoriteColor">Favorite Color</FormLabel>
            <Input id="favoriteColor" value={userData.preferences.favoriteColor} onChange={handleInputChange} name="favoriteColor" />
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Heading as="h2" size="xl" mb={4}>
        {userData.name}'s Profile
      </Heading>
      <Text fontSize="sm" color="gray.500">
        {userData.location}
      </Text>
      <Grid templateColumns="1fr" gap={4} mt={6}>
        <GridItem>
          <BeautyCategory label="Favorite Salon" value={userData.preferences.favoriteSalon} onEditClick={handleEditClick} />
          <BeautyCategory label="Tattoo Artist" value={userData.preferences.tattoos} onEditClick={handleEditClick} />
          <BeautyCategory label="Nail Clinic" value={userData.preferences.nails} onEditClick={handleEditClick} />
          <BeautyCategory label="Hair Care" value={userData.preferences.hairCare} onEditClick={handleEditClick} />
          <BeautyCategory label="Favorite Color" value={userData.preferences.favoriteColor} onEditClick={handleEditClick} />
        </GridItem>
      </Grid>

      <Modal isOpen={isEditOpen} onClose={handleEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCategory}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {getEditContent()}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserProfile;

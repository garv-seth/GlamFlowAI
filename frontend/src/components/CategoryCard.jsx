import React from 'react';
import { Box, Image, Heading, Link, useColorModeValue } from "@chakra-ui/react";

const CategoryCard = ({ imageSrc, title, href }) => {
  const cardBg = useColorModeValue("background", "gray.900");
  const cardTextColor = useColorModeValue("text", "text");
  const linkColor = useColorModeValue("primary", "primary");
  
  return (
    <Box
      as="li"
      className="card"
      bg={cardBg}
      color={cardTextColor}
      p={4}
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
    >
      <Image src={imageSrc} alt={title} borderRadius="md" mb={4} />
      <Heading as="h3" size="md" mb={2}>{title}</Heading>
      <Link href={href} color={linkColor}>
        Browse {title} Appointments
      </Link>
    </Box>
  );
};

export default CategoryCard;

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface FooterProps {
}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box as="footer" bg="whiteAlpha.800" borderTop="3px solid" borderTopColor="secondary" boxShadow="0 -4px 10px rgba(0,0,0,0.1)" p={4}>
      <Text align="center" fontSize="1.2rem" fontWeight="500" color="secondary">&copy; {new Date().getFullYear()} The LEMR Organization</Text>
    </Box>
  );
};

export default Footer;
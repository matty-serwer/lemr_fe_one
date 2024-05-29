import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Box as="header" bg="whiteAlpha.800" borderBottom="3px solid" borderBottomColor="secondary" boxShadow="lg" p={4}>
      <Text as="h1" fontSize="2.5rem" fontWeight="700" color="secondary">lemr</Text>
    </Box>
  );
};

export default Header;
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ImageComponent = ({ src, alt }) => (
  <Box display="flex" justifyContent="center" my={2}>
    <StyledImage src={src} alt={alt} />
  </Box>
);

export default ImageComponent;

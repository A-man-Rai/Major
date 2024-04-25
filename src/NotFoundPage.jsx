
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
    <Typography variant="h1" fontWeight="bold" gutterBottom>
      404 - Page Not Found
    </Typography>
    <Typography variant="h4" gutterBottom>
      Oops! Looks like you're lost.
    </Typography>
    <Typography variant="body1" gutterBottom>
      The page you are looking for might have been removed or doesn't exist.
    </Typography>
    <Button variant="contained" color="primary" component={Link} to="/">
      Go to Home Page
    </Button>
  </Container>
  
  );
};

export default NotFoundPage;

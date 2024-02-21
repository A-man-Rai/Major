import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider, Button } from '@mui/material';


export default function ApplicationSubmitted({setShowSubmitted,setShowForm}) {

  
  const handleOk = () => {
    setShowSubmitted(false);
    setShowForm(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },padding: '20px',
         borderRadius: '10px',
         boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)', }}>
          <Typography component="h1" variant="h5" sx={{fontWeight:"bold"}}>
             APPLICATION SUBMITTED
          </Typography>
          <Divider sx={{my:3}}/>
          <Typography>
           Your application has been successfully submitted wait for it to be verified by the Admin.
          </Typography>
          <Divider sx={{my:3}} />
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button variant='contained' color='primary' onClick={handleOk}>OK</Button>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

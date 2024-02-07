import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommonNavbar from "../../components/CommonNavbar"

export default function ApplicationFilled() {

  const navigate=useNavigate();

  const handleOk = () => {
    navigate("/login/dashboard");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <CommonNavbar></CommonNavbar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)', }}>
          <Typography component="h1" variant="h5" sx={{fontWeight:"bold"}}>
             APPLICATION ALREADY SUBMITTED
          </Typography>
          <Divider sx={{my:3}}/>
          <Typography>
           Looks like you have already applied for RAP wait for the confirmation.
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

import React, { useState,useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logout from './Logout';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { LoadingButton } from '@mui/lab';
const defaultTheme = createTheme();

const Dashboard = () => {
  let data;
  const userId=useSelector(state=>state.validUser.userId);
  useEffect(() => {
    const fetchData = async () => {
      try {
       // Replace this with your user ID value
        const response = await axios.get('http://localhost:9001/check', {
          params: {
            userId: userId,
          },
          withCredentials: true,
        });
         data=response.data.userApplication;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const firstname = useSelector((state) => state.register.firstname);
  const surname = useSelector((state) => state.register.surname);

  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);

  const handleApply=async()=>{
    setLoading(true);
    const response = await axios.get('http://localhost:9001/check', {
      params: {
        userId: userId,
      },
      withCredentials: true,
    });
     if(response.data.applicationSubmitted) navigate("/found");
     else navigate("/rap")
     
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#8fbc8f" }}>
        <Typography
          variant="h6"
          align="center"
          noWrap
          color="white"
          sx={{
            flex: 1,
            fontWeight: 900,
            fontSize: 18,
            '@media (max-width: 700px)': {
            fontSize: 10, // Adjust font size for smaller screens
          }
          }}
        >
          Tourism and Civil Aviation Department, Govt. of Sikkim
        </Typography>
        <Logout />
      </Toolbar>
      <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginBottom: 3 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {firstname} {surname}
          </Typography>
          <Typography variant="body1" paragraph>
            Apply for a permit and explore the beautiful destinations in Sikkim.
          </Typography>
          <LoadingButton
                    onClick={handleApply}
                
                    loading={loading}
                    loadingIndicator="Apply for RAP.."
                    variant="contained"
                    sx={{ mt: 3, mb: 2,width:"300px" }}
                 >
                  <span>Apply for RAP</span>
            </LoadingButton>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;

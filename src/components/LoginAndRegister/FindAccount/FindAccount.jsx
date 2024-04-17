import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Search from './Search';
import { setEmail } from '../../ReduxStore/slices/RegisterSlice';
import { useDispatch} from 'react-redux';
import { setForgotPassword,setInvalidEmail } from '../../ReduxStore/slices/UserSlice';
import axios from "axios";
import CommonNavbar from '../../CommonNavbar';
export default function FindAccount() {
 
  const [data, setData] = useState({
  email:""
  });
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false);
  const handleEmail = (field, value) => {
    setData({
      [field]: value,
    });
   
  };

  const handleClose = () => {
   navigate("/login")
  };
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true);
    dispatch(setEmail(data.email));
    const response = await axios.post('http://localhost:9000/forgotpassword',data, {
     withCredentials: true,
     });
    console.log(response.data);
     if(response.data.invalidEmail){
      dispatch(setInvalidEmail(true));
      }
     else if(response.data.otpsend){
     dispatch(setForgotPassword(true));
       navigate("/otp");
     }
   }  
   const styles={
    paper: {
   
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
    }
   }
 
  return (
    <React.Fragment>
      <CssBaseline />
      <CommonNavbar></CommonNavbar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper component="form" variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} onSubmit={handleSubmit} style={styles.paper}>
          <Typography component="h1" variant="h5" sx={{fontWeight:"bold"}}>
            Find Your Account
          </Typography>
          <br></br>
          <Divider sx={{my:1}}/>
          <Typography>Please enter your email address to search for your account.</Typography>
          <br></br>
            <TextField
              autoFocus
              required
              fullWidth
              margin="dense"
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              InputProps={{
                style: {
                  backgroundColor: data.email ? 'transparent' : '#f0f0f0',
                },
              }}
              onChange={(e) => handleEmail('email', e.target.value)}
            />
          <br></br>
          <Divider sx={{mt:2}} />
          
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button
                variant="outlined"
                style={{
                  color: 'black',
                  border: 'none',
                  backgroundColor: '#BEC3C9',
                }}
                onClick={handleClose}
               >
                Cancel
               </Button>
               <Search data={data} loading={loading} setLoading={setLoading}></Search>
            </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

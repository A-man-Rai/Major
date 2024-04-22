import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Divider, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import Continue from './Continue';
import { setConfirmationError,setAccountCreated } from '../../ReduxStore/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import axios from 'axios';
import CommonNavbar from '../../CommonNavbar';
import { Link as RouterLink } from 'react-router-dom';
import { setPassword } from '../../ReduxStore/slices/authSlice';
export default function OtpPage() {
  const [code, setCode] = React.useState({
    code: '',
  });
  const styles={    paper: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
  },}

  const navigate=useNavigate();
  const firstname=useSelector(state=>state.register.firstname);
  const surname=useSelector(state=>state.register.surname);
  const email=useSelector(state=>state.register.email);
  const password=useSelector(state=>state.register.password);
  const nationality=useSelector(state=>state.register.nationality);
  const forgotpassword=useSelector(state=>state.user.forgotPassword)
  const [loading ,setLoading]=useState(false);
  const dispatch=useDispatch();
  const handleCode = (field, value) => {
    setCode({
      [field]: value,
    });
  };

  const handleClose = () => {
    navigate("/login")
  };
  const [codecountdown, setCodeCountdown] = useState(299); // 5 minutes in seconds
  const [showRequestAgain, setShowRequestAgain] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCodeCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1; // Decrease by 1 second
        } else {
          clearInterval(intervalId);
          setShowRequestAgain(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [codecountdown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };


  const [countdown, setCountdown] = useState(119); 
  const [isClickable, setIsClickable] = useState(true);

  const startCountdown = () => {
    setIsClickable(false);
    
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1; 
        } else {
          clearInterval(intervalId);
          setCountdown(119); 
          setIsClickable(true);
          return 119; 
        }
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      setCountdown(119);
      setIsClickable(true);
    }, countdown * 1000);
  }; 

  useEffect(() => {
    if (countdown === 0) {
      setIsClickable(true);
    }
  }, [countdown]);

   const requestOtpAgain=async()=>{
    setShowRequestAgain(false);
    setCodeCountdown(299);
    startCountdown();
    if(forgotpassword){
      console.log("i am here and there");
      const data={
        email:email
      }
      const response = await axios.post('http://localhost:9000/forgotpassword',data, {
        withCredentials: true,
        });
     }
     else{
      
      const data={
      firstname:firstname,
      surname:surname,
      password:password,
      email:email,
      nationality:nationality,
      }
      const response = await axios.post('http://localhost:9000/register',data, {
        withCredentials: true,
       });
     }
    }
  
  const handleFormSubmit =async(e) => {
    e.preventDefault();
    //API CALL
   setLoading(true);
    if(forgotpassword){
      const data={
        email:email,
        code:code.code,
      }
      const response = await axios.post('http://localhost:9000/forgotpassword/confirm',data, {
        withCredentials: true,
      });
      console.log(response.data)
      if(response.data.validOtp){
       dispatch(setPassword(true))
       navigate("/newpassword");
      }
      else if(response.data.wrongCode){
        dispatch(setConfirmationError(true));
      }
    }
    else{
    const formData={
      firstname:firstname,
      surname:surname,
      email:email,
      password:password,
      nationality:nationality,
      otp:code,
    }
    const response = await axios.post('http://localhost:9000/register/confirm', formData, {
      withCredentials: true,
    });
    
    if(response.data.accountCreated){
      dispatch(setAccountCreated(true));
    }
    else if(response.data.wrongCode){
      dispatch(setConfirmationError(true));
    }
  }

  };

  return (
    <React.Fragment>
      <CssBaseline />
      <CommonNavbar></CommonNavbar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper style={styles.paper} component="form" variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} onSubmit={handleFormSubmit}>
          <Typography component="h1" variant="h5" sx={{fontWeight:"bold"}}>
            Enter Security Code
          </Typography>
          <br></br>
          <Divider sx={{my:1}}/>
          <Typography>Please check your emails for a message with your code.Your code is 6 numbers long.</Typography>
          <br></br>
          <Box display="flex" flexDirection="row" gap={2}>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="code"
              name="code"
              inputProps={{ minLength: 6, maxLength: 6 }}
              placeholder="Enter code"
              InputProps={{
                style: {
                  backgroundColor: code.code ? 'transparent' : '#f0f0f0',
                },
              }}
              onChange={(e) => handleCode('code', e.target.value)}
            />
                 {showRequestAgain ? (
                    <div style={{color:'blue',fontSize:'14px'}}>code expired request again</div>
                 ) : (
                  <div style={{color:'gray',fontSize:'14px'}}>{`code is valid for remaining ${formatTime(codecountdown)}`}</div>
                  )}
            </Box>
              <Box display="flex" flexDirection="column" gap={1}>
              <Typography>We sent your code to:</Typography>
              <Typography>{email}</Typography>
              </Box>
          </Box>
          <br></br>
          <Divider />
          <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} mt={2}>
          <Link
             component={RouterLink}
             onClick={requestOtpAgain}
             style={{
               textDecoration: 'none',
               cursor: isClickable ? 'pointer' : 'not-allowed',
               color: isClickable ? 'blue' : 'gray', // Adjust colors as needed
              }}>
           {isClickable ? "Didn't get a code?" : `Try again in ${Math.floor(countdown / 60)}:${countdown % 60}`}
          </Link>
            <Box display="flex" justifyContent="flex-end"  gap={2} mt={2}>
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
              <Continue loading={loading} setLoading={setLoading}></Continue>
            </Box>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
} 

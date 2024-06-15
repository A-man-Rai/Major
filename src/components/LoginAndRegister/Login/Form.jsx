import * as React from 'react';
import CommonNavbar from '../../CommonNavbar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import SignUpForm from '../SignUp/SignUpForm';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider,Toolbar,Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {Alert} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import { setFirstname,setSurname,setEmail } from '../../ReduxStore/slices/RegisterSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import { setUserId,setToken } from '../../ReduxStore/slices/ValidUserSlice';

const defaultTheme = createTheme();

export default function Form() {
  const dispatch=useDispatch();
   const[loading,setLoading]=useState(false);
  const handleSubmit = async(event) => {
    setLoading(true);
    event.preventDefault();
    //API CAll
    const response = await axios.post('http://localhost:9000/login', formValues, {
      withCredentials: true,
    });
   // console.log(response.data)
    if(response.data.validUser){
      
      localStorage.setItem("userToken",response.data.token);
     
      dispatch(setFirstname(response.data.user.firstname));
      dispatch(setSurname(response.data.user.surname));
     
      localStorage.setItem("userId",response.data.user.id)
      localStorage.setItem("email",response.data.user.email)

      navigate("/login/dashboard");
    
     
      
    }
    else if(response.data.invalidUser){
       setInvalidPassEmail(true);
       setLoading(false);
    }
  };

  const navigate = useNavigate();
  const[invalidPassEmail,setInvalidPassEmail]=useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setInvalidPassEmail(false);
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const styles = {
    link: {
      textDecoration: 'none',
      display: 'block',
      textAlign: 'center',
      margin: 'auto',
      padding: '10px',
      cursor: 'pointer',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
    },
    gridItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <ThemeProvider theme={defaultTheme}>
     <CommonNavbar></CommonNavbar>
      <Grid container component="main" sx={{ height: '80vh' ,backgroundColor:'white' }}>
        <CssBaseline />
       
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(../../../images/sikkimtourism.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'white',
            backgroundPosition: 'center',
            backgroundSize: '80%',
            border: 'none',
            
          }}
        />
        <Grid item xs={12} mt={2} sm={8} md={5} elevation={6} sx={styles.gridItem}>
          <Paper elevation={3} sx={{ height: '450px', width: '400px' }} style={styles.paper}>
            <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {invalidPassEmail && <Alert severity="error">Invalid Email or Password</Alert>}
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                fullWidth
                InputProps={{
                  style: {
                    backgroundColor: formValues.email ? 'transparent' : '#f0f0f0',
                  },
                }}
                onChange={(e) => handleInputChange('email', e.target.value)}
           
              />
              <TextField
                required
                margin="dense"
                id="password"
                name="password"
                placeholder="Password"
                fullWidth
                type="password"
                InputProps={{
                  style: {
                    backgroundColor: formValues.password ? 'transparent' : '#f0f0f0',
                  },
                }}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
               <LoadingButton
                    type="submit"
                    fullWidth
                    loading={loading}
                    loadingIndicator="Logging in...."
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                 >
                  <span>Log in</span>
                </LoadingButton>
               <Grid container>
                <RouterLink to="/find" style={{ ...styles.link, color: 'blue' }}>
                  {' '}
                  Forgotten password?
                </RouterLink>
               </Grid>
             </Box>
            <Divider variant="middle" sx={{ my: 2 }} />
            <SignUpForm setInvalidPassEmail={setInvalidPassEmail}  ></SignUpForm>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import{ useNavigate }from "react-router-dom"
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { setAdmin } from '../../ReduxStore/slices/authSlice';
import { useDispatch } from 'react-redux';
const defaultTheme = createTheme();

export default function Login() {
  const dispatch=useDispatch();
const[input ,setInput]=React.useState({
    email:"",
    password:""
})
const[showError,setShowError]=useState(false);
const handleInputChange=(e)=>{
  setShowError(false);
  let id=e.target.id
  let value=e.target.value
  setInput(prev=>{
    return {
        ...prev,                 
          [id]: value
      }
  })
}
  const handleSubmit = (event) => {
    event.preventDefault();
    if(login){
     handleLogin();
    }
    else{
   handleRegister()
    }
  };
  const [login,setLogin]=React.useState(true)
  const  toggle=()=>{
    setInput({
        email:"",
        password:""
    })
    if(login){
       setLogin(false)
    }
    else{
        setLogin(true)
    }
  }
const navigate=useNavigate()
  const handleLogin=async()=>{
    const response = await axios.post('http://localhost:9000/admin/login',input, {
        withCredentials: true,
      });
    // console.log(response.data);
      if(response.data.success){
        localStorage.setItem("token",response.data.token)
        dispatch(setAdmin(true))
        navigate("/admin/dashboard")
      }
      else{
          setShowError(true)
      }
}
  const handleRegister=async()=>{
   // console.log("inside register");
    const response = await axios.post('http://localhost:9000/admin/register',input, {
        withCredentials: true,
      });
    if(response.data.success){
        setInput({email:"",password:""})
        setLogin(true)
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
         {login ? <Typography component="h1" variant="h5">
            ADMIN LOGIN
          </Typography>  : <Typography component="h1" variant="h5">
            ADMIN REGISTER
          </Typography> }
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={input.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={input.password}
              onChange={handleInputChange}
            />
            {showError && <Alert severity="error">Invalid Email or Password</Alert>}
           {login ? <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button> : <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              REGISTER
            </Button>  }
            <Grid container>
              <Grid item  container display="flex" justifyContent="center">
              {login ? <Link href="#" variant="body2" onClick={toggle}>
                  {"Don't have an account? Register"}
                </Link> : <Link href="#" variant="body2" onClick={toggle} >
                  {"Already have an account? Log in"}
                </Link>}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider, TextField } from '@mui/material';
import ChangedPassword from './ChangedPassword';
import { useSelector ,useDispatch} from 'react-redux';
import { setPassowordChanged } from '../../ReduxStore/slices/UserSlice';
import axios from 'axios';
import { useState } from 'react';
import CommonNavbar from '../../CommonNavbar';
export default function NewPassword() {
  const [newpassword, setNewpassword] = useState({
    newpassword: '',
  });
   const[loading,setLoading]=useState(false);
  const email=useSelector(state=>state.register.email);
  const handleNewpassword = (field, value) => {
    setNewpassword({
      [field]: value,
    });
  };
  const styles={    paper: {
  
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
  },}
  const dispatch=useDispatch();

  const handleSubmit=async(e) => {
    setLoading(true);
    e.preventDefault();
    try{
      const data={
        newpassword:newpassword.newpassword,
        email:email,
      }
      const response = await axios.post('http://localhost:9000/reset',data, {
        withCredentials: true,
       });
       if(response.data.reset){
        dispatch(setPassowordChanged(true));
        }
    }
    catch(error){
     console.log(error.message);
    }
    };

  return (
    <React.Fragment>
      <CssBaseline />
      <CommonNavbar></CommonNavbar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <form onSubmit={handleSubmit} >
        <Paper style={styles.paper} componenet="form" variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} >
          <Typography component="h1" variant="h5" sx={{fontWeight:"bold"}}>
            Choose a new password
          </Typography>
          <br></br>
          <Divider sx={{my:1}}/>
          <Typography>Create a new strong password</Typography>
          <br></br>
          <Box display="flex" flexDirection="row" gap={2}>
            <TextField
              autoFocus
              required
              fullWidth
              margin="dense"
              id="newpassword"
              name="newpassword"
              type="password"
              inputProps={{ minLength: 8 }}
              placeholder="New password"
              InputProps={{
                style: {
                  backgroundColor: newpassword.newpassword? 'transparent' : '#f0f0f0',
                },
              }}
              onChange={(e) => handleNewpassword('newpassword', e.target.value)}
            />
          </Box>
          <br></br>
          <Divider />
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
             <ChangedPassword loading={loading}></ChangedPassword>
            </Box>
         </Paper>
        </form>
      </Container>
    </React.Fragment>
  );
}

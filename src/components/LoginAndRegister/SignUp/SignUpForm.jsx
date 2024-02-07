import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch} from "react-redux";
import { setEmail,setFirstname,setNationality,setPassword,setSurname } from '../../ReduxStore/slices/RegisterSlice.js';
import { LoadingButton } from '@mui/lab';
export default function SignUpForm({setInvalidPassEmail}) {

  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] =useState({
    firstname: '',
    surname: '',
    email: '',
    password: '',
    nationality: '',
  });

  const [nationalityValue, setNationalityValue] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setInvalidPassEmail(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleNationalityChange = (event, value) => {
    setNationalityValue(value);
    const selectedNationality = value && value.label ? value.label : '';
    setFormValues({
      ...formValues,
      nationality: selectedNationality,
    });
  };
  const styles ={   paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
  }}
 const[loading,setLoading]=useState(false);
  const handleSubmit = async () => {
      setLoading(true);
    const formData = { ...formValues, nationality: formValues.nationality };
    try {
      // API CALL
      const response = await axios.post('http://localhost:9000/register', formData, {
        withCredentials: true,
       });
       if(response.data.alreadyRegistered) navigate("/linked");
       
       dispatch(setPassword(response.data.hash)); //hash
       if(response.data.otpsend){
        dispatch(setEmail(formValues.email)); 
        dispatch(setFirstname(formValues.firstname)); 
        dispatch(setSurname(formValues.surname)); 
        dispatch(setNationality(formValues.nationality))
        navigate("/otp")
        }
        setLoading(false);
        handleClose();
    } 
    catch (error) {
      setLoading(false);
      console.error('Error submitting form:', error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Create new account
      </Button>
      <Dialog
        open={open}
       
        onClose={handleClose}
        
        PaperProps={{
          component:'form',
          onSubmit: (e) => {
            e.preventDefault();
            handleSubmit();
           
          },
          style: styles.paper,
         }}
       
        >
        <DialogTitle>Create a new account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            It's quick and easy
          </DialogContentText>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" flexDirection="row" gap={2}>
            <TextField
              autoFocus
              required
              fullWidth
              margin="dense"
              id="firstname"
              name="firstname"
              placeholder="First Name"
              InputProps={{
                style: {
                  backgroundColor: formValues.firstname ? 'transparent' : '#f0f0f0',
                },
              }}
              onChange={(e) => handleInputChange('firstname', e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="surname"
              fullWidth
              name="surname"
              placeholder="Surname"
              InputProps={{
                style: {
                  backgroundColor: formValues.surname ? 'transparent' : '#f0f0f0',
                },
              }}
              onChange={(e) => handleInputChange('surname', e.target.value)}
            />
          </Box>
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
            inputProps={{ minLength: 8 }}
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
          <TextField
            required
            margin="dense"
            id="nationality"
            name="nationality"
            placeholder='Nationality' 
            fullWidth
            InputProps={{
              style: {
                backgroundColor: formValues.nationality ? 'transparent' : '#f0f0f0',
              },
             }}
            onChange={(e) => handleInputChange('nationality', e.target.value)}
          />

          <Divider sx={{ my: 2 }} />
          <DialogContentText>
            By clicking Sign Up, you agree to our Terms, Privacy Policy. You may receive SMS notifications from us and can opt out at any time.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
        <LoadingButton
                    type="submit"
                    color='success'
                    loading={loading}
                    loadingIndicator="Signing in..."
                    variant="contained"
                    sx={{ width: '200px' }}
                  >
                  <span>Sign Up</span>
      </LoadingButton>
        </DialogActions>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

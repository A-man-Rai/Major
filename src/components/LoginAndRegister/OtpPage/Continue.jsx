import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import {useSelector ,useDispatch} from "react-redux";
import {setEmail,setFirstname,setNationality,setSurname,setPassword} from "../../ReduxStore/slices/RegisterSlice.js"
import { setAccountCreated ,setConfirmationError} from '../../ReduxStore/slices/UserSlice.js';
import { LoadingButton } from '@mui/lab';
export default function Continue({loading,setLoading}) {

  const email=useSelector(state=>state.register.email);
  const accountCreated=useSelector(state=>state.user.accountCreated);
  const confirmationError=useSelector(state=>state.user.confirmationError);
  const dispatch=useDispatch();

 const navigate=useNavigate();

  const handleAccountCreated= () => {
     dispatch(setAccountCreated(false))
     dispatch(setEmail(""));
     dispatch(setFirstname(""));
     dispatch(setSurname(""));
     dispatch(setPassword(""));
     dispatch(setNationality(""));

     navigate("/login");
  };
 
  const handleConfirmationError= () => {
    setLoading(false);
    dispatch(setConfirmationError(false));
  };
  const styles={    paper: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
  },}

  return (
    <React.Fragment>
      <LoadingButton
                    type="submit"
                    color='primary'
                    loading={loading}
                    ml={1}
                    loadingIndicator="Continue..."
                    variant="contained"
                  >
                  <span>Continue</span>
      </LoadingButton>
      {accountCreated &&
      <Dialog
        open={accountCreated}
        onClose={handleAccountCreated}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component:'form',
          style:styles.paper,
         }}
       
      >
       <DialogTitle id="alert-dialog-title">
          {"Account Confirmed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        You have successfully Confirmed your account with email {email}. You will use this email to log in.
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button variant="contained" onClick={handleAccountCreated}>OK</Button>
        </DialogActions>

      </Dialog>}
      { confirmationError &&
      <Dialog
        open={confirmationError}
        onClose={handleConfirmationError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component:'form',
          style: styles.paper,
         }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           The Confirmation code that you'have entered is invalid or has expired.Please make sure that you've entered your confirmation code correctly.
          </DialogContentText>
        </DialogContent>
        <DialogActions  >
          <Button variant="contained" onClick={handleConfirmationError} >Close</Button>
        </DialogActions>
      </Dialog> 

      }
    </React.Fragment>
  );
}

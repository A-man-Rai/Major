import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setInvalidEmail } from '../../ReduxStore/slices/UserSlice';
import { LoadingButton } from '@mui/lab';
export default function Search({data,loading,setLoading}) {
  
  const invalidEmail=useSelector(state=>state.user.invalidEmail);

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleClose = () => {
   dispatch(setInvalidEmail(false));
   setLoading(false);
  };

 const handleCreate=()=>{
   dispatch(setInvalidEmail(false));
   navigate("/login")
 }

  return (
    <React.Fragment>
    <LoadingButton
                    type="submit"
                    color='primary'
                    loading={loading}
                    loadingIndicator="FIND..."
                    variant="contained"
                  >
                  <span>FIND</span>
      </LoadingButton>
    {invalidEmail && 
      <Dialog
        open={invalidEmail}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"We couldn't find your account."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           It looks like {data.email} isn't connected to an account.You can create a new account with this email or try another valid email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant='contained' color='success' onClick={handleCreate}>Create new account </Button>        
        <Button variant='contained' onClick={handleClose}>Try again</Button>
        </DialogActions>
      </Dialog>}

    </React.Fragment>
  );
}

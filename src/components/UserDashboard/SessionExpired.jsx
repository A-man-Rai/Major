import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSession } from '../ReduxStore/slices/ValidUserSlice';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function SessionExpired({ }) {
const sessionExpired=useSelector(state=>state.validUser.sessionEnded);
const navigate=useNavigate();  
const dispatch=useDispatch();

const handleClose = () => {
    navigate("/",{replace:true});
   
    dispatch(setSession(false));
  };
  return (
    <React.Fragment>
      <Dialog
        open={sessionExpired}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       >
        <DialogTitle id="alert-dialog-title">
          {"SESSION EXPIRED !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your Session has expired please Login again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
           <Button variant='contained' onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


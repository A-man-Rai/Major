import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { setPassowordChanged } from '../../ReduxStore/slices/UserSlice';
import { LoadingButton } from '@mui/lab';
export default function ChangedPassword({loading}) {

const passwordChanged=useSelector(state=>state.user.passwordChanged); 
const navigate=useNavigate();
const dispatch=useDispatch();
const email=useSelector(state=>state.register.email);

 const handleClose = () => {
    dispatch(setPassowordChanged(false));
    navigate("/login")
  };

 const handleOk=()=>{
  dispatch(setPassowordChanged(false));
  navigate("/login")
 }
 const styles={    paper: {
  
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
},}

  return (
    <React.Fragment>
      <LoadingButton
                    type="submit"
                    color='success'
                    loading={loading}
                    loadingIndicator="Confirm..."
                    variant="contained"
                  >
                  <span>Confirm</span>
      </LoadingButton>
      <Dialog
        open={passwordChanged}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component:'form',
          style:styles.paper,
         }}
      >
       <DialogTitle id="alert-dialog-title">
          {"Password Changed Successfully"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        You have successfully changed your password for account linked with email {email} you can now log in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleOk}>OK</Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}

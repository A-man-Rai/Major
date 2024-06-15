import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate} from 'react-router-dom';



export default function Logout() {
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate()
  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false)};
  const handleLogout=()=>{
    setOpen(false);
    localStorage.removeItem("token")
    navigate("/admin",{replace:true});
  }
  const styles={    paper: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
  }}

  return (
    <React.Fragment>
        <Button size="small" variant="contained" color='error' onClick={handleClickOpen}> 
            Log out
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component:'form',
          style:styles.paper,
         }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Log out of your account ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Click OK to logout or you can cancel
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button style={{color:'red'}} onClick={handleLogout} autoFocus>
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

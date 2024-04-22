import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

 function Linear() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color='success'/>
    </Box>
  );
}

export default function Progress({showDialog,setShowDialog}) {

  const handleClickOpen = () => {
    setShowDialog(true);
  };

  return (
    <React.Fragment>         
      <Button variant="contained" type='submit' color='success' onClick={handleClickOpen}>
        SUBMIT
      </Button>
      <Dialog
        open={showDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your Application is Being Submitted"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your application is being submitted wait for few seconds.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
           <Linear></Linear>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

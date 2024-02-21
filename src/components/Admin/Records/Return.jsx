import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function Return({handleReturn,id}) {
  const [open, setOpen] = React.useState(false);
  const [remarks, setRemarks] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRemarks = () => {
    handleReturn(id,remarks);
    setOpen(false); 
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        RETURN
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"REMARKS"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="remarks"
            type="text"
            fullWidth
            multiline
            rows={8} 
            variant="outlined"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            sx={{ width: '400px', height: '200px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color="success" onClick={handleAddRemarks} autoFocus>
             SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

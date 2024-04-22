import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import DialogContent from '@mui/material/DialogContent';

export default function ShowDocuments({ images }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        View Documents
      </Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogContent>
          <Carousel   showStatus={false} 
            showIndicators={false} 
            showThumbs={false} >
            {images.map(ele => (
              <div key={ele.link}  style={{ width: '100%', height: '100%' }}>
                <img src={ele.link} alt={ele.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
            ))}
          </Carousel>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Box,Link } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useSelector } from 'react-redux';
const Pdf = ({ links }) => {
  const email=useSelector(state=>state.register.email)
  const folder=email.split("@");
  const starting="https://firebasestorage.googleapis.com/v0/b/documentsupload-e023f.appspot.com/o/pdf%2F"
  if (links.length === 0) {
    return (
      <Box>
        <Typography align='center' variant='h2' fontWeight="bold">Nothing's here</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h4" gutterBottom>APPROVED APPLICATIONS</Typography>
      <List>
        {links.map((link) => (
          <React.Fragment key={link.id}>
            <ListItem alignItems="center">
             
              <PictureAsPdfIcon sx={{ fontSize: 32 }} />
            
              <ListItemText primary={<Typography variant="h6" fontWeight="bold">{link.name}</Typography>} />
              
              <ListItemText primary={<Link href={starting + folder[0] + link.link}>Download</Link>}/>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Pdf;

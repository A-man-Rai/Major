import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer(props) {
  const { description} = props;

  return (
    <Box component="footer" sx={{ bgcolor:"#8fbc8f", py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="subtitle1"
          align="center"
          color="#333333"
          sx={{fontWeight:900,fontSize:15}}
          >
           <div style={{ fontFamily: 'Caveat Brush, cursive' }}>
         {description}
        </div>  
         
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
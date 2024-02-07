import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Sidebar(props) {
  const { archives, social, title } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom sx={{fontWeight:"bold"}}>
          {title}
        </Typography>
        <Typography component="div">
         <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <li><strong>Step 1:</strong>Create your account with valid email address.</li>
          <li><strong>Step 2:</strong>Apply for the permit by completing the application form and submitting the required documents.</li>
          <li><strong>Step 3:</strong>We will notify you once the application is verified.</li>
         </ul>
        </Typography>
      </Paper>
      <Typography variant="h6"  gutterBottom sx={{ mt: 3,fontWeight:"bold" }}>
        Popular Places / Attractions
      </Typography>
      {archives.map((archive) => (
        <Link display="block" variant="body1" href={archive.url} key={archive.title} sx={{color:"black",textDecoration: 'none','&:hover': {   textDecoration: 'underline',  },}}>
          {archive.title}
        </Link>
      ))}
      <Link sx={{textDecoration: 'none','&:hover': {   textDecoration: 'underline',  },}} href="https://sikkimtourism.gov.in/Public/index">visit sikkimtourism.gov.in for more....</Link>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 ,fontWeight:"bold"}}>
        Find Us On
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{textDecoration: 'none','&:hover': {   textDecoration: 'underline',  },mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  );
}

export default Sidebar;
import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


function Main(props) {
  const {  title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h3" gutterBottom>
       <strong>{title}</strong> 
      </Typography>
      <Divider />
      <Typography variant="h6" gutterBottom >
       <strong>Restricted Area Permit (RAP) for Foreigners (on arrival)</strong> 
      </Typography>
      <ul><li>Every foreigner (excluding people of Bhutanese origin), who desires to enter and stay in a Protected or Restricted Area of Sikkim, is supposed to fill up the prescribed form, attach the copy of the required documents and seek approval on the same from the delegated competent authority.</li>
      <li> Citizens of Nepal/Bangladesh may only produce a valid identity card reflecting their origin while applying for permit.</li>
      <li>All foreigners visiting State must register themselves within 24 hours of their arrival.</li> </ul>
      <br></br>
      <Typography variant="h6" gutterBottom><strong>Restricted Areas for Foreigners:</strong></Typography>
      <Typography variant="subtitle1">On issue of permit, a foreigner is allowed to visit following places strictly for the purpose of tourism only:</Typography>
      <ol><li>East: Gangtok, Rumtek, Pakyong, Barapathing, Rongli, Rhenock, Aritar, and Rorathang.</li>
      <li>West: Gyalshing, Soreng, Pemagyangtse, khechepopalri, Tashiding and Yuksom.</li>
      <li>South: Namchi and Ravangla.</li>
      <li>North: Phodong, Mangan and Singhik upto Toong. </li>
      </ol>
     <Typography variant="subtitle1"><strong>Validity of Permit:</strong> Foreigners are allowed to stay only for a maximum duration of 30 days. Application for any extension of the period of permit must be made at least 2 days before expiry of permit.</Typography>
    </Grid>
  );
}


export default Main;
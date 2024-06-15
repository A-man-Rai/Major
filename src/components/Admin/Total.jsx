import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function Total({title,count}) {
  return (
    <React.Fragment>
      <Typography variant='h5' fontWeight={"bold"}>{title}</Typography>
      <Box sx={{ textAlign: 'center' }}>
        <Typography component="p" variant="h4" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
          {count}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
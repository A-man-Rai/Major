import React from 'react'
import { Toolbar,Typography } from '@mui/material'
const CommonNavbar = () => {
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider',backgroundColor:"#8fbc8f"  }}>
        <Typography
          variant="h6"
          align="center"
          noWrap
          color="white"
          sx={{ flex: 1,fontWeight:900,fontSize:20 ,
          '@media (max-width: 700px)': {
            fontSize: 10, // Adjust font size for smaller screens
          },}}
          > 
        Tourism and Civil Aviation Department, Govt. of Sikkim
        </Typography>
       </Toolbar>
  )
}

export default CommonNavbar

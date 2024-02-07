import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
function Header(props) {
  const { sections, title } = props;
   const navigate=useNavigate();
  return (
    <React.Fragment>
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
        {title}
        </Typography>
        <Button variant="contained" size="small" onClick={()=>{navigate("/login")}}>
          Sign up
        </Button>
       </Toolbar>
       <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
        >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{textDecoration: 'none','&:hover': {   textDecoration: 'underline',  },p: 1, flexShrink: 0,fontWeight:"bold"}}
          
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}



export default Header;
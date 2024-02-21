import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Divider, Box } from '@mui/material';
import { formatDate } from "../Admin/Records/dateFormat.js";

const AllUserApplications = ({records,setDetails,setApplication,setShowStatus,setEdit}) => {
  const handleViewDetails =(application) => {
    setApplication(application)
    setShowStatus(false);
    setDetails(true);
  };

  const handleEdit=async(application)=>{
     setEdit(true)
     setShowStatus(false);
     setApplication(application)
  }
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>RECENT SUBMITS</Typography>
      <List>
        {records.map(application => (
          <React.Fragment key={application._id}>
            <ListItem alignItems="center">
              <ListItemText
                primary={application.name}
                secondary={`Date of Visit: ${formatDate(application.dateOfVisit)}`}
              />
              <ListItemText primary={`STATUS : ${application.status}`} />
              {application.status==="RETURNED BY ADMIN" ?  <Button variant='contained' color='success' sx={{width:"130px"}} onClick={()=>{handleEdit(application)}} >EDIT </Button>
               : <Button variant="contained" onClick={() => handleViewDetails(application)}>View Details</Button>}
              </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};


export default AllUserApplications;


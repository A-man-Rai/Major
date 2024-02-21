import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Divider, Box } from '@mui/material';
import { formatDate } from './dateFormat.js';
const AllRecords = ({setPage,all,title,records,setDetails,setShowRecords,setApplication,setApproved,setReturned,show,setShowButtons}) => {
  const handleViewDetails =(application) => {
   if(show){
    setShowButtons(true);
   }
   else{
    setShowButtons(false);
   }
   if(all){
   setPage(true);
   }
   else{
    setPage(false);
   }
   setShowRecords(false);
   setApproved(false);
   setReturned(false);
   setDetails(true);
   setApplication(application);
 
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <List>
        {records.map(application => (
          <React.Fragment key={application._id}>
            <ListItem>
              <ListItemText primary={application.name} secondary={`Date of Visit: ${formatDate(application.dateOfVisit)}`} />
              {title==="RETURNED APPLICATIONS"  && <ListItemText primary={`RETURNED : ${application.returned}`} />}
              <Button variant="contained" onClick={()=>handleViewDetails(application)}>View Details</Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default AllRecords;


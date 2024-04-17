import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Divider, Box } from '@mui/material';
import { formatDate } from "../Admin/Records/dateFormat.js";
import axios from 'axios';
const AllUserApplications = ({setEditImages,records,setDetails,setApplication,setShowStatus,setEdit,setLinks}) => {
  const handleViewDetails =async(application) => {
    //api call to get links
    const response = await axios.get(
      `http://localhost:9001/links/${application.id}` ,
      {
        withCredentials: true,
      }
    );
    setLinks(response.data)
    //console.log(response.data);
    setApplication(application)
    setShowStatus(false);
    setDetails(true);
  };

  const handleEdit=async(application)=>{
    const response = await axios.get(
      `http://localhost:9001/links/${application.id}` ,
      {
        withCredentials: true,
      }
    );
     setEditImages(response.data.userImages)
     setEdit(true)
     setShowStatus(false);
     setApplication(application)
  }
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>RECENT SUBMITS</Typography>
      <List>
        {records.map(application => (
          <React.Fragment key={application.id}>
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


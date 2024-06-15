import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Divider, Box } from '@mui/material';
import { formatDate } from './dateFormat.js';
import axios from 'axios';
import NotifyButton from "./NotifyButton.jsx"
const AllRecords =({setPage,all,title,records,setDetails,setShowRecords,setApplication,setApproved,setReturned,show,setShowButtons,setLinks,users,fetchApprovedApplications}) => {
    const calculateDaysLeft = (expiryDate) => {
        const currentDate = new Date();
        const expiry = new Date(expiryDate);
        const timeDifference = expiry - currentDate;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return daysDifference;
      };
    const findEmailById = (users, id) => {
        const user = users.find(user => user.id === id);
        return user ? user.email : null;
      };
  const handleViewDetails =async(application) => {
 //  console.log(application);
    const response = await axios.get(
      `http://localhost:9001/links/${application.id}` ,
      {
        withCredentials: true,
      }
    );
    setLinks(response.data.userImages)
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
          <React.Fragment key={application.id}>
            <ListItem>
              <ListItemText primary={<>ID: {application.id}<br></br>NAME: {application.name}<br></br> USER ID :{application.userId}</>} secondary={
                   <>
            Date of Visit: {formatDate(application.dateOfVisit)}
            <br />
            {calculateDaysLeft(application.expiry)>0 && (<strong>Expires In: {calculateDaysLeft(application.expiry)+" days"}</strong>)}
          </>
               } />
              {title==="RETURNED APPLICATIONS"  && <ListItemText primary={`RETURNED : ${application.returned}`} />}
            <Box display="flex" gap={2}>
               <NotifyButton application={application} day={calculateDaysLeft(application.expiry)} email={findEmailById(users,application.userId)} fetchApprovedApplications={fetchApprovedApplications}></NotifyButton>
              <Button variant="contained" onClick={()=>handleViewDetails(application)}>View Details</Button>
            </Box>   
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default AllRecords;


import React, { useState } from 'react';
import { Typography, Paper, Box, Grid, Button } from '@mui/material';
import { formatDate } from './dateFormat.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import Return from './Return.jsx';
import ShowDocuments from '../../UserDashboard/ShowDocuments.jsx';
const AllDetailsPage = ({users,links,page,application, setShowRecords,setReturned,setDetails ,setRecords,showButtons}) => {
  const styles = {
    paper: {
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
    },
    backButton: {
      marginBottom: '20px',
    },
    buttonGroup: {
      marginTop: '20px',
    },
    field: {
      marginBottom: '10px',
    },
  };

  const handleApprove=async(application)=>{

  const token=localStorage.getItem("token");

  const response2=await axios.patch(`http://localhost:9001/approved/${application.id}` ,{},{
    headers: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true,
  })
  //console.log(response2.data);
    setRecords(prevRecords => prevRecords.filter(record => record.id !==application.id));
    setDetails(false);
    if(page){
      setShowRecords(true);
    }
    else{
      setReturned(true);
    }
  }

  const handleReturn=async(id,remarks)=>{
    const token=localStorage.getItem("token");
  const response=await axios.patch(`http://localhost:9001/return/${id}`,{data:remarks}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }, 
    withCredentials: true,
  })
  setRecords(prevRecords => prevRecords.filter(record => record.id !== id));
  setDetails(false);
  if(page){
    setShowRecords(true);
  }
  else{
    setReturned(true);
  }
  }

  const handleReject=async(id)=>{
    try {
      //console.log(localStorage.getItem("token"));
    const response=await axios.patch(`http://localhost:9001/reject/${id}`,{},{
      headers: {
        'Authorization':`Bearer ${localStorage.getItem("token")}`
      },
      withCredentials: true,
    })
  //  console.log(response.data);
        setRecords(prevRecords => prevRecords.filter(record => record.id !== id));
    } 
    catch (error) {
      console.error('Error deleting applications:', error);
    }
    setDetails(false);
    if(page){
      setShowRecords(true);
    }
    else{
      setReturned(true);
    }
  }


  const user=users.find(user => user.id === application.userId)
  const email=user.email;
  const starting="https://firebasestorage.googleapis.com/v0/b/documentsupload-e023f.appspot.com/o/"
  const arr=email.split("@");
  const folder=arr[0];
  //console.log(links);
  const images=[{link:starting + folder + links[0].link,name:"first"},
               {link:starting + folder + links[1].link,name:"second"},
               {link:starting + folder + links[2].link,name:"third"}]
          
  return (
    <Box>
      <ArrowBackIcon
        onClick={() => {
          setDetails(false);
          setShowRecords(true);
        }}
        style={styles.backButton}
      />
      <Paper variant="contained" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={styles.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              APPLICATION FOR RESTRICTED AREA
            </Typography>
            <Box style={styles.field}>
              <Typography>Name : {application.name}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Dob : {formatDate(application.dob)}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Date of Visit : {formatDate(application.dateOfVisit)}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Nationality : {application.nationality}</Typography>
            </Box>
            <Box style={styles.field}>
             <Typography>Occupation : {application.occupation}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Duration of Stay : {formatDate(application.durationOfStay)}</Typography>
            </Box>
            <Box style={styles.field}>
            <Typography>Residential Address: {application.residentialAddress}</Typography>
            </Box>
            <Box style={styles.field}>
            <Typography>Travel Arrangement By: {application.travelArrangementBy}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: {  md: 6 }}}>
           <Box style={styles.field}>
           <Typography>Ilp No : {application.ilpNo}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Passport No: {application.passportNo}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Passport Valid Upto: {formatDate(application.passportValidUpto)}</Typography>
            </Box>
            
            <Box style={styles.field}>
              <Typography>Visa No: {application.visaNo}</Typography>
            </Box>
            <Box style={styles.field}>
             <Typography>Visa Issue: {formatDate(application.visaIssue)}</Typography>
            </Box>
            <Box style={styles.field}>
            <Typography>Visa Valid Upto: {formatDate(application.visaValidUpto)}</Typography>
            </Box>
        {!showButtons &&   <ShowDocuments images={images}></ShowDocuments>}
        {showButtons && <Box display='flex' gap={2} style={styles.buttonGroup} mt={3}>
           <ShowDocuments images={images}></ShowDocuments>
              <Button variant="contained" color="success" onClick={()=>handleApprove(application)}>
                APPROVE
              </Button>
              <Return handleReturn={handleReturn} id={application.id}></Return>
              <Button variant="contained" color="error" onClick={()=>handleReject(application.id)}>
                REJECT
              </Button>
            </Box>}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AllDetailsPage;

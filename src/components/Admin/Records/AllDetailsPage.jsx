import React, { useState } from 'react';
import { Typography, Paper, Box, Grid, Button } from '@mui/material';
import { formatDate } from './dateFormat.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import Return from './Return.jsx';

const AllDetailsPage = ({ page,application, setShowRecords,setReturned,setDetails ,setRecords,showButtons}) => {
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
  const data={
    userId:application.userId,
    name: application.name,
    dob: application.dob,
    occupation:application.occupation,
    nationality:application.nationality,
    passportNo:application.passportNo,
    dateOfIssue:application.passportDateOfIssue,
    validUpTo:application.passportValidUpto,
    ilpNo: application.ilpNo,
    visaNo: application.visaNo,
    visaIssue: application.visaIssue,
    visaValidUpto: application.visaValidUpto,
    residentialAddress: application.residentialAddress,
    dateOfVisit: application.dateOfVisit,
    durationOfStay: application.durationOfStay,
    travelArrangement: application.travelArrangementBy,
  }
  const response = await axios.post('http://localhost:9002/approve',data, {
    withCredentials: true,
  });
  const response2=await axios.patch(`http://localhost:9001/approved/${application._id}` ,{
    withCredentials: true,
  })
    setRecords(prevRecords => prevRecords.filter(record => record._id !==application._id));
    setDetails(false);
    if(page){
      setShowRecords(true);
    }
    else{
      setReturned(true);
    }
  }

  const handleReturn=async(id,remarks)=>{
  const response=await axios.patch(`http://localhost:9001/return/${id}`,{data:remarks},{
    withCredentials: true,
  })
  setRecords(prevRecords => prevRecords.filter(record => record._id !== id));
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
    
    const response=await axios.patch(`http://localhost:9001/reject/${id}`,{
    withCredentials: true,
  })
        setRecords(prevRecords => prevRecords.filter(record => record._id !== id));
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
  
        {showButtons && <Box display='flex' gap={2} style={styles.buttonGroup} mt={3}>
              <Button variant="contained" color="success" onClick={()=>handleApprove(application)}>
                APPROVE
              </Button>
              <Return handleReturn={handleReturn} id={application._id}></Return>
              <Button variant="contained" color="error" onClick={()=>handleReject(application._id)}>
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

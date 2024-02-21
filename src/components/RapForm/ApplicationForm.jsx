import React, { useState,useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider, Button,Grid} from '@mui/material';
import Field from './Field';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from './Calendar';
import { useSelector ,useDispatch} from 'react-redux';
import { setSession } from '../ReduxStore/slices/ValidUserSlice';
import axios from 'axios';
export default function ApplicationForm({setShowSubmitted,setShowForm,setRecords}) {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const dispatch=useDispatch();
  const userId=useSelector(state=>state.validUser.userId);
  const token=useSelector(state=>state.validUser.token);
  const [data, setData] = useState({
    userId:userId,
    name: "",
    dob: "",
    occupation:"",
    nationality:"",
    passportNo:"",
    dateOfIssue: "",
    validUpTo:"",
    ilpNo: "",
    visaNo: "",
    visaIssue: "",
    visaValidUpto: "",
    residentialAddress: "",
    dateOfVisit: "",
    durationOfStay: "",
    travelArrangement: "",
  });

  const handleFieldChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (
        data.dob !== "" &&
        data.dateOfIssue !== "" &&
        data.validUpTo !== "" &&
        data.visaIssue !== "" &&
        data.visaValidUpto !== "" &&
        data.dateOfVisit !== "" &&
        data.durationOfStay !== ""
      ) {
        const response = await axios.post(
          'http://localhost:9001/submit',
          data,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        );
  
        if (response.data.submit) {
          setShowForm(false);
          setShowSubmitted(true);
          setRecords(data);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
         dispatch(setSession(true));
        console.log('Token expired. Please log in again.');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };
  


  const styles = {
    paper: {
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
    }
  };
 
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4  }} >
      <Paper
      component="form"
      variant="contained"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      onSubmit={handleSubmit}
      style={styles.paper}
    >
    <Grid container gap={2} alignItems="center">
      <Grid item xs={12} md={7}>
        <Typography component="h1" variant="h5" sx={{ fontWeight:"bold" }}>
          APPLICATION FOR RESTRICTED AREA
        </Typography>
      </Grid>
    </Grid>
    
          <Divider sx={{ my: 1 }} />
           <Field id={"name"}  placeholder={"Name of Applicant"} handleFieldChange={handleFieldChange} data={data}/>
           <Calendar id={"dob"} placeholder={"Date Of Birth (DD/MM/YYYY)"} handleFieldChange={handleFieldChange} data={data}></Calendar>
           <Field id={"nationality"} placeholder={"Nationality"} handleFieldChange={handleFieldChange} data={data}/>
           <Field id={"occupation"} placeholder={"Occupation"} handleFieldChange={handleFieldChange} data={data}/>
         
          <Box display="flex" flexDirection="row" gap={2}>
          <Field id={"passportNo"} placeholder={"Passport No"} handleFieldChange={handleFieldChange} data={data}/>
          <Calendar id={"dateOfIssue"} placeholder={"Date Of Issue"} handleFieldChange={handleFieldChange} data={data} ></Calendar>
           </Box>

          <Calendar id={"validUpTo"} placeholder={"Valid up to"} handleFieldChange={handleFieldChange} data={data} ></Calendar>
          <Field id={"ilpNo"} placeholder={"I.L.P. No"} handleFieldChange={handleFieldChange} data={data}/>
          <Typography sx={{mt:1,mb:1,fontWeight:400}}> Visa Details:</Typography>

          <Box display="flex" flexDirection="row" gap={2}>
          <Field id={"visaNo"} placeholder={"1. No"} handleFieldChange={handleFieldChange} data={data}/>
          <Calendar id={"visaIssue"} placeholder={"2. Issue"} handleFieldChange={handleFieldChange} data={data}></Calendar>
          </Box>
            
          <Calendar id={"visaValidUpto"} placeholder={"3. valid up to"} handleFieldChange={handleFieldChange} data={data}></Calendar>
          <Field id={"residentialAddress"} placeholder={"Residential Address"} handleFieldChange={handleFieldChange} data={data}/>
          <Calendar id={"dateOfVisit"} placeholder={"Date of visit"} handleFieldChange={handleFieldChange} data={data}></Calendar>
         
          <Calendar id={"durationOfStay"} placeholder={"Duration of stay "} handleFieldChange={handleFieldChange} data={data}></Calendar>

          <Field id={"travelArrangement"} placeholder={"Travel arrangement made by"} handleFieldChange={handleFieldChange} data={data}/>
         <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
         <Button variant='contained' type='submit' color='success'>SUBMIT</Button>
         </Box>
       
        </Paper>
      </Container>
    </React.Fragment>
  );
}

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
import UploadButton from "./UploadButton"
import UploadDone from './UploadDone';
import {imageDB} from "../../firebaseConfig.js"
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import Progress from './Progress.jsx';

export default function ApplicationForm({setShowSubmitted,setShowForm,setRecords}) {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
const[image4,setImage4]=useState(null)
const [image1,setImage1]=useState(null);
const [image2,setImage2]=useState(null);
const [image3,setImage3]=useState(null);
const[showDialog,setShowDialog]=useState(false);
  const dispatch=useDispatch();
  const userId=localStorage.getItem("userId");
  const token=localStorage.getItem("userToken");
  const email=localStorage.getItem("email");

  const [data, setData] = useState({
    userId:parseInt(userId),
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
    urlA:"",
    urlB:"",
    urlC:""
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
        data.name !=="" &&
        data.dob !== "" &&
        data.occupation !== "" &&
        data.nationality !== "" &&
        data.passportNo  !== "" &&
        data.dateOfIssue !== "" &&
        data.validUpTo !== "" &&
        data.ilpNo !== "" &&
        data.visaNo !== "" &&
        data.visaIssue !== "" &&
        data.visaValidUpto !== "" &&
        data.dateOfVisit !== "" &&
        data.durationOfStay !== "" &&
        data.residentialAddress !== "" &&
        data.travelArrangement !== "" &&
        image1!=null &&
        image2!=null &&
        image3!=null 
      ) {
        setShowDialog("true")
        const arr=email.split("@");
        const folder=arr[0];
        const image1Ref=ref(imageDB,`${folder}/${Date.now()}-${image1.name}`)
        const image2Ref=ref(imageDB,`${folder}/${Date.now()}-${image2.name}`)
        const image3Ref=ref(imageDB,`${folder}/${Date.now()}-${image3.name}`)
        const image4Ref=ref(imageDB,`${folder}/${Date.now()}-${image4.name}`)
        const a= await uploadBytes(image1Ref,image1)
        const b= await uploadBytes(image2Ref,image2)
        const c= await uploadBytes(image3Ref,image3)
        const d= await uploadBytes(image4Ref,image4)
        const urlA=await getDownloadURL(a.ref)
        const urlB=await getDownloadURL(b.ref)
        const urlC=await getDownloadURL(c.ref)
        const urlD=await getDownloadURL(d.ref)
          const array1=urlA.split(folder)
          const array2=urlB.split(folder)
          const array3=urlC.split(folder)
          const array4=urlD.split(folder)
          data.urlA=array1[1];
          data.urlB=array2[1];
          data.urlC=array3[1];
          data.urlD=array4[1];
         // console.log(array1)
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
          
          const response = await axios.post(
            'http://localhost:9000/count',
          {email:email},
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        
          );
          //console.log("here");
          //console.log(response.data);
         const response2=await axios.post("http://localhost:9001/records",{},{withCredentials: true})
         console.log(response2.data);
          setShowForm(false);
          setShowDialog(false)
          setShowSubmitted(true);
          setRecords(data);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
         dispatch(setSession(true));
       // console.log('Token expired. Please log in again.');
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
           <Calendar id={"dob"} placeholder={"Date Of Birth (DD/MM/YYYY)"} handleFieldChange={handleFieldChange} data={data} maxDate={new Date('2005-12-31')}></Calendar>
           <Field id={"nationality"} placeholder={"Nationality"} handleFieldChange={handleFieldChange} data={data}/>
           <Field id={"occupation"} placeholder={"Occupation"} handleFieldChange={handleFieldChange} data={data}/>
         
          <Box display="flex" flexDirection="row" gap={2}>
          <Field id={"passportNo"} placeholder={"Passport No"} handleFieldChange={handleFieldChange} data={data}/>
          <Calendar id={"dateOfIssue"} placeholder={"Date Of Issue"} handleFieldChange={handleFieldChange} data={data} maxDate={new Date()} ></Calendar>
           </Box>

          <Calendar id={"validUpTo"} placeholder={"Valid up to"} handleFieldChange={handleFieldChange} data={data} minDate={new Date()}></Calendar>
          <Field id={"ilpNo"} placeholder={"I.L.P. No"} handleFieldChange={handleFieldChange} data={data}/>
          <Typography sx={{mt:1,mb:1,fontWeight:400}}> Visa Details:</Typography>

          <Box display="flex" flexDirection="row" gap={2}>
          <Field id={"visaNo"} placeholder={"1. No"} handleFieldChange={handleFieldChange} data={data}/>
          <Calendar id={"visaIssue"} placeholder={"2. Issue"} handleFieldChange={handleFieldChange} data={data} maxDate={new Date()}></Calendar>
          </Box>
            
          <Calendar id={"visaValidUpto"} placeholder={"3. valid up to"} handleFieldChange={handleFieldChange} data={data} minDate={new Date()}></Calendar>
          <Field id={"residentialAddress"} placeholder={"Residential Address"} handleFieldChange={handleFieldChange} data={data}/>
          <Calendar id={"dateOfVisit"} placeholder={"Date of visit"} handleFieldChange={handleFieldChange} data={data}  minDate={new Date()}></Calendar>
         
          <Calendar id={"durationOfStay"} placeholder={"Duration of stay "} handleFieldChange={handleFieldChange} data={data} minDate={new Date()}></Calendar>

          <Field id={"travelArrangement"} placeholder={"Travel arrangement made by"} handleFieldChange={handleFieldChange} data={data}/>
          <Box display="flex" justifyContent="space-evenly">
          {image4 ?<UploadDone set={setImage4}/>: <UploadButton name="PASSPHOTO" set={setImage4}/>}
          {image1 ?<UploadDone set={setImage1}/>: <UploadButton name="PASSPORT" set={setImage1} /> }
          {image2 ?<UploadDone set={setImage2}/>: <UploadButton name="VISA" set={setImage2}/> }
          {image3 ?<UploadDone set={setImage3}/>: <UploadButton name="ILP" set={setImage3}/>}
          </Box>
         <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
         <Progress showDialog={showDialog} setShowDialog={setShowDialog}></Progress>
         </Box>
       
        </Paper>
      </Container>
    </React.Fragment>
  );
}

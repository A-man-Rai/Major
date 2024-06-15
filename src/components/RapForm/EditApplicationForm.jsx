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
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setSession } from '../ReduxStore/slices/ValidUserSlice';
import UploadDone from './UploadDone';
import UploadEditButton from "./UploadEditButton"
import ShowDocuments from '../UserDashboard/ShowDocuments';
export default function EditApplicationForm({setEditImages,editImages,application,setEdit,setShowSubmitted,setRecords}) {
// console.log(editImages);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
const dispatch=useDispatch();
const token=localStorage.getItem("userToken");

  const [data, setData] = useState({
    id:application.id,
    name:application.name,
    dob: application.dob,
    occupation:application.occupation,
    nationality:application.nationality,
    passportNo:application.passportNo,
    passportDateOfIssue:application. passportDateOfIssue,
    passportValidUpto:application.passportValidUpto,
    ilpNo:application. ilpNo,
    visaNo: application.visaNo,
    visaIssue:application.visaIssue,
    visaValidUpto:application. visaValidUpto,
    residentialAddress:application. residentialAddress,
    dateOfVisit: application. dateOfVisit,
    durationOfStay: application.durationOfStay,
    travelArrangementBy: application.travelArrangementBy,
  });
  const handleFieldChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch('http://localhost:9001/update', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      });
      setRecords(response.data.updatedForm);
      setEdit(false);
      setShowSubmitted(true);
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
 const[image1,setImage1]=useState(null);
 const[image2,setImage2]=useState(null);
 const[image3,setImage3]=useState(null);
 const[image4,setImage4]=useState(null);
 const email=localStorage.getItem("email")
 const starting="https://firebasestorage.googleapis.com/v0/b/documentsupload-e023f.appspot.com/o/"
 const arr=email.split("@");
 const folder=arr[0];
 const images=[{link:starting + folder + editImages[0].link,name:"first"},
              {link:starting + folder + editImages[1].link,name:"second"},
              {link:starting + folder + editImages[2].link,name:"third"},
              {link:starting + folder + editImages[3].link,name:"third"},
            ]
           
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4  }} >
      <Paper
      variant="contained"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    
      style={styles.paper}
    >
    <Grid container gap={2} alignItems="center">
      <Grid item xs={12} md={7}>
        <Typography component="h1" variant="h5" sx={{ fontWeight:"bold",mb:2 }}>
          EDIT YOUR APPLLICATION
        </Typography>
        <Typography>
            REMARKS BY ADMIN : {application.remarks}
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
          <Calendar id={"passportDateOfIssue"} placeholder={"Date Of Issue"} handleFieldChange={handleFieldChange} data={data} ></Calendar>
           </Box>

          <Calendar id={"passportValidUpto"} placeholder={"Valid up to"} handleFieldChange={handleFieldChange} data={data} ></Calendar>
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

          <Field id={"travelArrangementBy"} placeholder={"Travel arrangement made by"} handleFieldChange={handleFieldChange} data={data}/>
         
          <Box display="flex" justifyContent="space-evenly" mt={3}>
          <ShowDocuments images={images}></ShowDocuments>
          {image4 ?<UploadDone set={setImage4}/>: <UploadEditButton formId={editImages[3].formId} setEditImages={setEditImages} id={editImages[3].id} name="PASSPHOTO" set={setImage4}/>}
          {image1 ?<UploadDone set={setImage1}/>: <UploadEditButton formId={editImages[0].formId} setEditImages={setEditImages} id={editImages[0].id} name="PASSPORT" set={setImage1} /> }
          {image2 ?<UploadDone set={setImage2}/>: <UploadEditButton formId={editImages[1].formId} setEditImages={setEditImages} id={editImages[1].id} name="VISA" set={setImage2}/> }
          {image3 ?<UploadDone set={setImage3}/>: <UploadEditButton formId={editImages[2].formId} setEditImages={setEditImages} id={editImages[2].id} name="ILP" set={setImage3}/>}
          </Box>
         
         <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
         <Button variant='contained' onClick={handleSubmit} color='success'>SUBMIT</Button>
         </Box>
        
        </Paper>
      </Container>
    </React.Fragment>
  );
}

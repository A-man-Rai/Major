import React, { useState,useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider, Button,Grid,TextField} from '@mui/material';
import { styled } from '@mui/material/styles';
import Field from './Field';
import CloseIcon from '@mui/icons-material/Close';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import CommonNavbar from '../CommonNavbar';
import { useDispatch,useSelector } from 'react-redux';
import { setName,setDob,setOccupation,setNationality,setDateOfIssue,setValidUpTo,setIlpNo,setVisaNo,setVisaIssue,
setVisaValidUpto,setResidentakAddress,setDateOfVisit,setDurationOfStay,setTravelArrangement, setPassportNo,setPassphoto
} from '../ReduxStore/slices/FormSlice';
export default function ApplicationForm() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const name=useSelector(state=>state.form.name);
  const dob=useSelector(state=>state.form.dob);
  const occupation=useSelector(state=>state.form.occupation);
  const nationality=useSelector(state=>state.form.nationality);
  const passportNo=useSelector(state=>state.form.passportNo)
  const dateOfIssue=useSelector(state=>state.form.dateOfIssue);
  const validUpTo=useSelector(state=>state.form.validUpTo);
  const ilpNo=useSelector(state=>state.form.ilpNo);
  const visaNo=useSelector(state=>state.form.visaNo);
  const visaIssue=useSelector(state=>state.form.visaIssue);
  const visaValidUpto=useSelector(state=>state.form.visaValidUpto);
  const residentialAddress=useSelector(state=>state.form.residentialAddress);
  const dateOfVisit=useSelector(state=>state.form.dateOfVisit);
  const durationOfStay=useSelector(state=>state.form.durationOfStay);
  const travelArrangement=useSelector(state=>state.form.travelArrangement);
  const passphoto=useSelector(state=>state.form.passphoto);
  const userId=useSelector(state=>state.validUser.userId);
  
  const dispatch=useDispatch();
  const [data, setData] = useState({
    name: name,
    dob: dob,
    occupation:occupation,
    nationality:nationality,
    passportNo: passportNo,
    dateOfIssue: dateOfIssue,
    validUpTo:validUpTo,
    ilpNo: ilpNo,
    visaNo: visaNo,
    visaIssue: visaIssue,
    visaValidUpto: visaValidUpto,
    residentialAddress: residentialAddress,
    dateOfVisit: dateOfVisit,
    durationOfStay: durationOfStay,
    travelArrangement: travelArrangement,
  });

  const handleFieldChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setName(data.name));
    dispatch(setDob(data.dob.toString()));
    dispatch(setNationality(data.nationality));
    dispatch(setOccupation(data.occupation));
    dispatch(setPassportNo(data.passportNo));
    dispatch(setDateOfIssue(data.dateOfIssue.toString()  ));
    dispatch(setIlpNo(data.ilpNo));
    dispatch(setValidUpTo(data.validUpTo.toString() ));
    dispatch(setVisaNo(data.visaNo));
    dispatch(setVisaIssue(data.visaIssue.toString()));
    dispatch(setVisaValidUpto(data.visaValidUpto.toString()));
    dispatch(setResidentakAddress(data.residentialAddress));
    dispatch(setDateOfVisit(data.dateOfVisit.toString()));
    dispatch(setDurationOfStay(data.durationOfStay.toString()));
    dispatch(setTravelArrangement(data.travelArrangement));
    dispatch(setPassphoto(selectedPhoto));
    if(data.dob && data.dateOfIssue && data.dateOfVisit && data.visaIssue && data.visaValidUpto && data.durationOfStay && selectedPhoto)navigate("/rap/doc");
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const styles = {
    paper: {
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
    }
  };

  const [selectedPhoto, setSelectedPhoto] = useState(passphoto);
  const navigate=useNavigate();
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInKB = file.size / 1024; // Convert bytes to KB

      if (fileSizeInKB >= 50 && fileSizeInKB <= 2048) {
      
        const reader = new FileReader();

        reader.onload = (e) => {
          setSelectedPhoto(e.target.result);
        };

        reader.readAsDataURL(file);
      } else {

        setSelectedPhoto(null); // Reset selectedSignature
      }
    }
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <CommonNavbar></CommonNavbar>
      <Container component="main" maxWidth="lg" sx={{ mb: 4  }} >
      <Paper
      component="form"
      variant="contained"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      onSubmit={handleSubmit}
      style={styles.paper}
    >
    <Grid container gap={2} alignItems="center">
      <Grid item xs={12} md={3}> 
      <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="row" >
      <Box
          style={{
            width: '150px',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selectedPhoto ? 'transparent' : 'lightgray',
            border: '1px solid #ccc',
            backgroundImage: selectedPhoto ? `url(${selectedPhoto})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            fontWeight:"bold"
          }}
        >{!selectedPhoto && <div style={{
        textAlign: 'center',
      }}>Allowed Size: 50KB - 2MB</div>}</Box>
        {selectedPhoto && <CloseIcon onClick={()=>{setSelectedPhoto(null)}}></CloseIcon>}
        </Box>
        {!selectedPhoto && <Button sx={{width:150}} color='success' component="label" variant="contained">
              Upload Photo
          <VisuallyHiddenInput type="file" onChange={handlePhotoUpload} />
        </Button>}
        </Box>

      </Grid>
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
                
          <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button variant="contained" type="submit" color='success'>
              NEXT
          </Button>
          </Box>   
        </Paper>
      </Container>
    </React.Fragment>
  );
}

import React from 'react'
import { useState ,useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {Box,styled,Button,Grid} from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import CommonNavbar from '../CommonNavbar';
import { setSignaturePhoto,setVisaPhoto,setPassportPhoto } from '../ReduxStore/slices/FormSlice';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
const DocumentUploads = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const VisuallyHidden = styled('input')({
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
    const signaturePhoto=useSelector(state=>state.form.signaturePhoto);
    const passportPhoto=useSelector(state=>state.form.passportPhoto);
    const visaPhoto=useSelector(state=>state.form.visaPhoto);
    const dispatch=useDispatch();
    const StyledPaper = styled(Paper)(({ theme }) => ({
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
        },
        width: '100%',
        minHeight: '500px',
        backgroundColor: '#f4f4f4', // Set a background color
        borderRadius: '10px', // Add border-radius for rounded corners
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
      }));
      
    const [selectedPassport, setSelectedPassport] = useState(passportPhoto);
    const [selectedVisa, setSelectedVisa] = useState(visaPhoto);
    const [selectedSignature, setSelectedSignature] = useState(signaturePhoto);
    const navigate=useNavigate();
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
   
    const handlePassportUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSizeInKB = file.size / 1024;
            if (fileSizeInKB >= 50 && fileSizeInKB <= 2048) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setSelectedPassport(e.target.result);
          };
          reader.readAsDataURL(file);
        }
        else{
            setSelectedPassport(null);
        }
      };
    }
    
      const handleVisaUpload = (event) => {
        const file = event.target.files[0];
    
        if (file) {
            const fileSizeInKB = file.size / 1024; 
         if (fileSizeInKB >= 50 && fileSizeInKB <= 2048) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setSelectedVisa(e.target.result);
          };
          reader.readAsDataURL(file);
        }
        else{
            setSelectedVisa(null)
        }
       };
      }

      const handleSignatureUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const fileSizeInKB = file.size / 1024; // Convert bytes to KB
    
          if (fileSizeInKB >= 50 && fileSizeInKB <= 2048) {
          
            const reader = new FileReader();
    
            reader.onload = (e) => {
              setSelectedSignature(e.target.result);
            };
    
            reader.readAsDataURL(file);
          } else {

            setSelectedSignature(null); // Reset selectedSignature
          }
        }
       };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(selectedPassport && selectedSignature && selectedVisa){
          const formData={
            name: name,
            userId:userId,
            dob: dob,
            nationality: nationality,
            occupation: occupation,
            passportNo:passportNo,
            passportdateOfIssue:dateOfIssue,
            passportValidUpto:validUpTo,
            ilpNo: ilpNo,
            visaNo: visaNo,
            visaIssue: visaIssue,
            visaValidUpto: visaValidUpto,
            residentialAddress:residentialAddress,
            dateOfVisit: dateOfVisit,
            durationOfStay: durationOfStay,
            travelArrangementBy: travelArrangement,
            passphoto: JSON.stringify({passphoto}),
            signature:JSON.stringify({selectedSignature}),
            passport:JSON.stringify({selectedPassport}),
            visa:JSON.stringify({selectedVisa}),
          }
          const response = await axios.post('http://localhost:9001/submit', formData, {
            withCredentials: true,
          });
          if(response.data.submit)navigate("/submitted");
          
         }
        else{
        //
        }
      }

      const handlePrevious=()=>{
        dispatch(setPassportPhoto(selectedPassport));
        dispatch(setSignaturePhoto(selectedSignature));
        dispatch(setVisaPhoto(selectedVisa));
        navigate("/rap")
      }

  return (
        <React.Fragment>
          <CssBaseline />
        <CommonNavbar></CommonNavbar>
          <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
            <StyledPaper
              component="form"
              variant="outlined"
              onSubmit={handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} >
                  <Box display="flex" flexDirection="column" gap={2}>
                {!selectedPassport &&   <Button  color='success' component="label" variant="contained">
                    Upload Passport
                    <VisuallyHidden
                      type="file"
                      onChange={handlePassportUpload}
                      accept="image/*"
                    />
                  </Button>}
                  <Box display="flex" flexDirection="row">
                  <Box
                    style={{
                        display: 'flex',
                       flexDirection: 'column',
                     justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '250px',
                      backgroundColor: selectedPassport
                        ? 'transparent'
                        : 'lightgray',
                      border: '1px solid #ccc',
                      backgroundImage: selectedPassport
                        ? `url(${selectedPassport})`
                        : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      fontWeight:"bold"
                    }}
                  > {!selectedPassport && <div style={{
        textAlign: 'center',
      }}> Allowed Size: 50KB - 2MB</div>}</Box>
                  {selectedPassport && <CloseIcon onClick={()=>{setSelectedPassport(null)}}/>}
                  </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" gap={2}>  
                 {!selectedVisa && <Button color='success' component="label" variant="contained">
                    Upload Visa
                    <VisuallyHidden
                      type="file"
                      onChange={handleVisaUpload}
                      accept="image/*"
                    />
                  </Button>}
                  <Box display="flex" flexDirection="row">
                  <Box
                    style={{
                      width: '100%',
                      height: '250px',
                      display: 'flex',
                       flexDirection: 'column',
                     justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: selectedVisa ? 'transparent' : 'lightgray',
                      border: '1px solid #ccc',
                      backgroundImage: selectedVisa
                        ? `url(${selectedVisa})`
                        : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      fontWeight:"bold"
                    }}
                    >{!selectedVisa && <div> Allowed Size: 50KB - 2MB</div>}</Box>
                    {selectedVisa && <CloseIcon onClick={()=>{setSelectedVisa(null)}}/>}
                   </Box>
                   </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" gap={2}>  
                  {!selectedSignature && <Button color='success' component="label" variant="contained">
                    Upload Signature
                    <VisuallyHidden
                      type="file"
                      onChange={handleSignatureUpload}
                    />
                  </Button>}
                  <Box display="flex" flexDirection="row">
                  <Box
                    style={{
                      width: '100%',
                      height: '250px',
                      display: 'flex',
                       flexDirection: 'column',
                     justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: selectedSignature
                        ? 'transparent'
                        : 'lightgray',
                      border: '1px solid #ccc',
                      backgroundImage: selectedSignature
                        ? `url(${selectedSignature})`
                        : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      fontWeight:"bold"
                    }}
                  >{!selectedSignature && <div> Allowed Size: 50KB - 2MB</div>}</Box>
                  {selectedSignature && <CloseIcon onClick={()=>{setSelectedSignature(null)}}/>}
                  </Box>
                  </Box>
                </Grid>

              </Grid>
            </StyledPaper>
            
            <Box display="flex" flexDirection="row"  justifyContent="space-between" mt={2} ml={5} >
            <Button variant='contained' color='success' onClick={handlePrevious} >PREV</Button>
            <Button variant='contained' type='submit' color='success' onClick={handleSubmit}>SUBMIT</Button>
            </Box>
            
          </Container>
        </React.Fragment>
  )
}

export default DocumentUploads

import React, { useEffect, useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link,Box} from '@mui/material'
import Logout from './Logout';
import ApplicationSubmitted from '../RapForm/ApplicationSubmitted';
import ApplicationForm from "../RapForm/ApplicationForm"
import AllUserApplications from './AllUserApplications';
import AllDetails from './AllDetails';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { setSession } from '../ReduxStore/slices/ValidUserSlice';
import EditApplicationForm from '../RapForm/EditApplicationForm';
import SessionExpired from './SessionExpired';
import Pdf from "./Pdf"
const defaultTheme = createTheme();
const Dashboard = () => {
  const dispatch=useDispatch();
  const [showForm,setShowForm]=useState(true);
  const [showDownload,setShowDownload]=useState(false);
  const[showStatus,setShowStatus]=useState(false);
  const [links,setLinks]=useState([]);
  const[submitted,setShowSubmitted]=useState(false);

  const[details,setDetails]=useState(false);
  const[application,setApplication]=useState({});
 const [edit,setEdit]=useState(false);
 const[editImages,setEditImages]=useState([]);

  const handleApply=async()=>{
    setEdit(false)
    setDetails(false)
    setShowSubmitted(false)
    setShowDownload(false);
    setShowStatus(false);
    setShowForm(true);   
  }
  const handleDownload=async()=>{
    setEdit(false)
    setDetails(false)
    setShowSubmitted(false)
    setShowStatus(false);
    setShowForm(false);  
    setShowDownload(true); 
  }

  const handleStatus=async()=>{
    setEdit(false)
    setDetails(false)
    setShowSubmitted(false)
    setShowForm(false);  
    setShowDownload(false); 
    setShowStatus(true);
  }
  const[pdfLinks,setPdfLinks]=useState([])
  const [records,setRecords]=useState([]);
  const userId=useSelector(state=>state.validUser.userId);
  const token=useSelector(state=>state.validUser.token)
  useEffect(()=>{
   fetchApplications();
   fetchPdfLinks();
  },[records,pdfLinks])
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/verify`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(setSession(true));
         // console.log('Token expired. Please log in again.');
        } else {
          console.error('An error occurred:', error);
        }
      }
    };
    checkSession(); 
    const intervalTime = 1 * 60 * 1000;
    const intervalId = setInterval(checkSession, intervalTime);
    return () => clearInterval(intervalId);
  }, []); 

  
  const fetchPdfLinks=async()=>{
    const response = await axios.get(
      `http://localhost:9000/pdf/${userId}` ,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      }
    ); 
     
    if (JSON.stringify(response.data.data) !== JSON.stringify(pdfLinks)) {
      setPdfLinks(response.data.data);  
      console.log(pdfLinks);    
    } 
  }

  const fetchApplications = async () => {
    try {
        const response = await axios.get(
          `http://localhost:9001/applications/${userId}` ,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        );
      // console.log(response.data.userApplications);
        if (JSON.stringify(response.data.userApplications) !== JSON.stringify(records)) {
          setRecords(response.data.userApplications);      
        }     
    } 
    catch (error) {
      if (error.response && error.response.status === 401) {
         dispatch(setSession(true));
       // console.log('Token expired. Please log in again.');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  const sections=[{title:"Apply",click:handleApply},{title:"download",click:handleDownload},{title:"check status",click:handleStatus}]

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#8fbc8f" }}>
        <Typography
          variant="h6"
          align="center"
          noWrap
          color="white"
          sx={{
            flex: 1,
            fontWeight: 900,
            fontSize: 18,
            '@media (max-width: 700px)': {
            fontSize: 10, // Adjust font size for smaller screens
          }
          }}
        >
          Tourism and Civil Aviation Department, Govt. of Sikkim
        </Typography>
        <Logout />
      </Toolbar>
      <Toolbar
  component="nav"
  variant="dense"
  sx={{
    justifyContent: 'space-around',
  }}
>
  {sections.map((section) => (
    <Link
      color="inherit"
      key={section.title}
      variant="body1" 
      sx={{
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
          cursor: 'pointer',
        },
        p: 1,
        flexShrink: 0,
        fontWeight: 'bold',
        marginRight: '20px', 
      }}
      onClick={section.click}
    >
      {section.title}
    </Link>
  ))}
  <Box
    sx={{
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%', // Full width
      borderBottom: '2px solid black', // Black bottom border
    }}
  />
</Toolbar>

      <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
           <SessionExpired/>
          {showForm && <ApplicationForm setShowSubmitted={setShowSubmitted} setShowForm={setShowForm} setRecords={setRecords}></ApplicationForm>}
          {submitted && <ApplicationSubmitted   setShowSubmitted={setShowSubmitted} setShowForm={setShowForm}></ApplicationSubmitted>}
          {showDownload && <Pdf links={pdfLinks}/>}
          {showStatus && <AllUserApplications setEditImages={setEditImages}  setEdit={setEdit}  setShowStatus={setShowStatus}  setApplication={setApplication} setDetails={setDetails} records={records} setLinks={setLinks}></AllUserApplications>}
          {details && <AllDetails application={application} setShowStatus={setShowStatus} setDetails={setDetails} links={links}></AllDetails>}
          {edit && <EditApplicationForm setEditImages={setEditImages} editImages={editImages} application={application} setEdit={setEdit} setShowSubmitted={setShowSubmitted} setRecords={setRecords}></EditApplicationForm>}
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;

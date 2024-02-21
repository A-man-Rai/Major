import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useState ,useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AllRecords from '../Records/AllRecords';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from 'axios';
import AllDetailsPage from '../Records/AllDetailsPage';
import UsersTable from '../Users/UsersTable';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();
export default function AdminDashboard() {
  
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [showRecords,setShowRecords]=useState(false);
  const [details,setDetails]=useState(false);
  const[returned,setReturned]=useState(false);
  const[approved,setApproved]=useState(false);
  const[dashboard,setDashboard]=useState(true);

  const handleDashboard=()=>{
    setDashboard(true)
    setDetails(false);
    setReturned(false);
    setApproved(false)
    setShowRecords(false);
  }
  const handleRecords=()=>{
    setDashboard(false)
    setDetails(false);
    setReturned(false);
    setApproved(false)
    setShowRecords(true); 
  }
  const handleReturned=()=>{
    setDashboard(false)
    setDetails(false);
    setShowRecords(false);
    setApproved(false)
    setReturned(true); 
  }
  const handleApprove=()=>{
    setDashboard(false)
    setDetails(false);
    setReturned(false);
    setShowRecords(false); 
    setApproved(true)
  }

  const[application,setApplication]=useState({});
  const [records,setRecords]=useState([]);
  const [approvedApplications,setApprovedApplications]=useState([]);
  const [returnedRecords, setReturnedRecords] = useState([]);
  const [users,setUsers]=useState([]);
  useEffect(() => {
    
    fetchApprovedApplications();
    fetchApplications();
    fetchReturnedApplications();
   
  },[records,approvedApplications,returnedRecords]);
 
  useEffect(()=>{fetchUsers();},[])

  const fetchUsers=async()=>{
    try {
      const response = await axios.get('http://localhost:9000/user', {
        withCredentials: true,
      });
     // console.log(response.data);
      if (JSON.stringify(response.data) !== JSON.stringify(users)) {
        setUsers(response.data) 
       }
     }
    catch (error) {
      console.error('Error fetching applications:', error);
    }
   }

  const fetchApprovedApplications = async () => {
    try {
      const response = await axios.get('http://localhost:9002/approve', {
        withCredentials: true,
      });
      if (JSON.stringify(response.data.userApplications) !== JSON.stringify(approvedApplications)) {
        setApprovedApplications(response.data.userApplications) 
    
       // console.log(response.data.userApplications);
      }    
    } 
    catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchApplications = async () => {
  try {
    const response = await axios.get('http://localhost:9001/applications' ,{
      withCredentials: true,
      });
      if (JSON.stringify(response.data.userApplications) !== JSON.stringify(records)) {
        setRecords(response.data.userApplications);
        //console.log(response.data.userApplications);
      }     
  } 
  catch (error) {
    console.error('Error fetching applications:', error);
  }
};


const fetchReturnedApplications=async()=>{
  try {
    const response = await axios.get('http://localhost:9001/applications/returned' ,{
      withCredentials: true,
      });
      if (JSON.stringify(response.data.userReturnedApplications) !== JSON.stringify(returnedRecords)) {
        setReturnedRecords(response.data.userReturnedApplications);
      //console.log(response.data.userReturnedApplications);
      }
  } catch (error) {
    console.error('Error fetching applications:', error);
  }
}
 
const[showButtons,setShowButtons]=useState(false);
const[page,setPage]=useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', 
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <React.Fragment>
    <ListItemButton onClick={handleDashboard}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  
    <ListItemButton onClick={handleRecords}>
      <ListItemIcon  >
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Records" />
    </ListItemButton>

    <ListItemButton onClick={handleReturned}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Returned Records" />
    </ListItemButton>

    <ListItemButton onClick={handleApprove}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Approved Records" />
    </ListItemButton>
  </React.Fragment>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid >
          {dashboard && <UsersTable data={users}/>}
          {showRecords && <AllRecords title={"PENDING APPLICATIONS"} records={records} setDetails={setDetails} setShowRecords={setShowRecords} setApplication={setApplication} 
          setApproved={setApproved}  setPage={setPage} show={true} setShowButtons={setShowButtons} setReturned={setReturned} all={true}></AllRecords>}

          {details && <AllDetailsPage  page={page} application={application} setDetails={setDetails} setShowRecords={setShowRecords} setReturned={setReturned} setRecords={setRecords} showButtons={showButtons}></AllDetailsPage>}

          {returned && <AllRecords title={"RETURNED APPLICATIONS"} records={returnedRecords} setDetails={setDetails} setShowRecords={setShowRecords} setApplication={setApplication} 
          setApproved={setApproved} setReturned={setReturned} show={true}  setShowButtons={setShowButtons} all={false} setPage={setPage} 
          ></AllRecords>} 
          {approved &&  <AllRecords title={"APPROVED APPLICATIONS"} records={approvedApplications} setDetails={setDetails} setShowRecords={setShowRecords} setApplication={setApplication} 
          setApproved={setApproved} setReturned={setReturned} show={false} setShowButtons={setShowButtons} all={false} setPage={setPage} 
          ></AllRecords> }
          </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
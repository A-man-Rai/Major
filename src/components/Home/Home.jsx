import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {Box} from "@mui/material"
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';;
import FacebookIcon from '@mui/icons-material/Facebook';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Main from './Main';

const sections = [
  { title: 'HOME', url: '#' },
  { title: 'MY GOVERNMENT', url: 'https://sikkim.gov.in/' },
  { title: "TIC & FRO", url: 'https://www.sikkimtourism.gov.in/Public/ExploreByMap/Map/TIC' },
  { title: 'RAP & PAP', url: 'https://www.sikkimtourism.gov.in/Public/TravellerEssentials/pap' },
  { title: 'TRAVEL AGENTS', url: 'https://www.sikkimtourism.gov.in/Public/TravellerEssentials/travelagents' },
  { title: 'FAQ', url: 'https://www.sikkimtourism.gov.in/Public/TravellerEssentials/rap' },
  { title: 'ABOUT', url: '#' },
  { title: 'CONTACT US', url: '#' },
];

const mainFeaturedPost = {
  title: 'Sikkim were nature smiles',
  description:
    "Sikkim (/ˈsɪkɪm/) is a state in northeastern India. It borders Tibet in the north and northeast, Bhutan in the east, Nepal in the west, and West Bengal in the south. Sikkim is also located close to India's Siliguri Corridor near Bangladesh...",
  image: '../../../images/cover.jpg',
  imageText: 'main image description',
  linkText: 'Continue Reading...',
};

const featuredPosts = [
  {
    title: 'Tsongmo Lake',
    date: 'Nov 12',
    description:
    "Tsomgo Lake, also known as Tsongmo Lake or Changu Lake, is a glacial lake in the East Sikkim district of the Indian state of Sikkim, some 40 kilometres (25 mi) from the capital Gangtok. Located at an elevation of 3,753 m (12,313 ft), the lake remains frozen...",
    image: '../../../images/tsongmolake.webp',
    imageLabel: 'Image Text',
    link:"https://sikkimtourism.gov.in/Public/ExperienceSikkim/GetLakesDetailsById/28"
  },
  {
    title: 'Tathagata Tsal',
    description:
    'The Buddha Park of Ravangla, also known as Tathagata Tsal, is situated near Rabong (Ravangla) in South Sikkim district, Sikkim, India. It was constructed between 2006 and 2013 and features a 130-foot (40 m) high statue of the Buddha as its centerpiece...',
    image: '../../../images/buddhapark.jpg',
    imageLabel: 'Image Text',
    link:"https://www.sikkimtourism.gov.in/Public/PlacesToGo/popularattractiondetails/PA20A004"
  },
];


const sidebar = {
  title: 'Present Process Flow to apply for RAP',
  archives: [
    { title: 'Black Cat Museum', url: 'https://sikkimtourism.gov.in/Public/PlacesToGo/PopularAttractionDetails/PA22A011' },
    { title: 'Gangtok', url: 'https://sikkimtourism.gov.in/Public/PlacesToGo/PopularPlaceDetails/PA20A002' },
    { title: 'Gurudongmar Lake', url: 'https://sikkimtourism.gov.in/Public/ExperienceSikkim/GetLakesDetailsById/25' },
    { title: 'Khecheopalri Lake', url: 'https://sikkimtourism.gov.in/Public/ExperienceSikkim/GetLakesDetailsById/26' },
    { title: 'Namchi', url: 'https://sikkimtourism.gov.in/Public/PlacesToGo/PopularPlaceDetails/PA20A006' },
    { title: 'Nathula', url: 'https://sikkimtourism.gov.in/Public/PlacesToGo/PopularAttractionDetails/PA20A009' },
    { title: 'Pelling', url: 'https://sikkimtourism.gov.in/Public/PlacesToGo/PopularPlaceDetails/PA20A005' },
    { title: 'Siddheswara Dham', url: 'https://sikkimtourism.gov.in/Public/ThingsToDo/PilgrimageDetails/PL20A027?Type=Temple' },
    { title: 'Zuluk', url: 'https://sikkimtourism.gov.in/Public/PlacesToGo/PopularPlaceDetails/PA20A001' },
  ],
  social: [
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Instagram', icon: InstagramIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box>
        <Header title=" Tourism and Civil Aviation Department, Govt. of Sikkim" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} position={"top"}/>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title='Restricted Areas Permits in Sikkim (For Foreign Tourists)'></Main>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Box>
      <Footer
        title="Footer"
        description="© Designed and Developed By "
      />
    </ThemeProvider>
  );
}
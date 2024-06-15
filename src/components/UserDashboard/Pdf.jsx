import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Box, Link } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useSelector } from 'react-redux';

const Pdf = ({ links }) => {
  const downloadFile = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
  
      let filename = '';
  
      // Extract filename from the URL or Content-Disposition header
      const matches = url.match(/\/([^/]+)\?(.+)/);
      if (matches && matches.length >= 2) {
        filename = decodeURIComponent(matches[1]);
      } else {
        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+)"?/);
          if (match) {
            filename = match[1];
          }
        }
      }
  
      const link = document.createElement('a');
      const urlObject = URL.createObjectURL(blob);
      link.href = urlObject;
      link.setAttribute('download', filename);
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
  
  const DownloadLink = ({ url }) => {
    const handleDownload = (e) => {
      e.preventDefault();
      downloadFile(url);
    };

    return (
      <Link href={url} onClick={handleDownload}>
        Download
      </Link>
    );
  };

  const email = localStorage.getItem("email");
  const folder = email.split('@');
  const starting = 'https://firebasestorage.googleapis.com/v0/b/documentsupload-e023f.appspot.com/o/pdf%2F';

  if (links.length === 0) {
    return (
      <Box>
        <Typography align="center" variant="h2" fontWeight="bold">
          Nothing's here
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        APPROVED APPLICATIONS
      </Typography>
      <List>
        {links.map((link) => (
          <React.Fragment key={link.id}>
            <ListItem alignItems="center">
              <PictureAsPdfIcon sx={{ fontSize: 32 }} />
              <ListItemText primary={<Typography variant="h6" fontWeight="bold">{link.name}</Typography>} />
              <ListItemText primary={<DownloadLink url={starting + folder[0] + link.link} />} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Pdf;

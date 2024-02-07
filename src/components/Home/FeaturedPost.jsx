import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

function FeaturedPost(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea  >
        <Card sx={{ display: 'flex',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',}}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" fontWeight="bold" mb={1}>
              {post.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Link variant="subtitle1" href={post.link}   sx={{ textDecoration: 'none','&:hover': {   textDecoration: 'underline',  },}}>
             Continue reading...
            </Link>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}



export default FeaturedPost;
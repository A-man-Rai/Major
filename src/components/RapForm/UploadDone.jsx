import React from 'react'
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import Button from '@mui/material/Button';

const UploadDone = ({set}) => {
    const handleClick=()=>{
        set(null)
    }
  return (
  
      <Button variant="outlined" color="success" startIcon={<CloudDoneIcon/>} onClick={handleClick}>
      DONE
      </Button>
 
  )
}

export default UploadDone

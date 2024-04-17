import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector } from 'react-redux';
import { imageDB } from '../../firebaseConfig';
import axios from 'axios';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
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

export default function InputFileUpload({formId,setEditImages,id,name,set}) {

  const email=useSelector(state=>state.register.email)
  const token=useSelector(state=>state.validUser.token);
  const handleFileInputChange = async(e) => {
    const data={
      url:""
    }
    const file = e.target.files[0]; 
    set(file); 

    const arr=email.split("@");
    const folder=arr[0];
    const imageRef=ref(imageDB,`${folder}/${Date.now()}-${file.name}`)
    const a= await uploadBytes(imageRef,file)
    const url=await getDownloadURL(a.ref)
      const array1=url.split(folder)
      data.url=array1[1];
     
      const response = await axios.patch(
        `http://localhost:9001/links/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true,
        }
      );
      //const existingForm=response.data.existingForm

      //console.log(existingForm);
      const response1 = await axios.get(
        `http://localhost:9001/links/${formId}` ,
        {
          withCredentials: true,
        }
      );
      console.log(response1.data.userImages);
       setEditImages(response1.data.userImages)
     /* setEditImages(prevImages => {
        return prevImages.map(image => {
          // Check if the image id matches any id in existingForm
          if (existingForm.id === image.id) {
            // If the id matches, update the link property of the image
            return { ...image, link: existingForm.link};
          }
          // If the id doesn't match, return the original image
          return image;
        });
      });**/
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload {name}
      <VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
    </Button>
  );
}

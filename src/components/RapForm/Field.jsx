import React from 'react'
import { TextField } from '@mui/material'
const Field = ({id,placeholder,handleFieldChange,data}) => {
  return (
    <TextField
    autoFocus
    required
    fullWidth
    margin="dense"
    id={id}
    name={id}
    placeholder={placeholder}
    InputProps={{
          style: {
            backgroundColor: data[id]? 'transparent' : '#f0f0f0',
          },
        }}
        value={data[id] || ''}
    onChange={(e) => handleFieldChange(id, e.target.value)}
   />
  )
}

export default Field

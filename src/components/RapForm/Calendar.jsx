import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Calendar = ({ id, placeholder, handleFieldChange, data }) => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
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
            backgroundColor: data[id] ? 'transparent' : '#f0f0f0',
          },
        }}
        value={data[id] ? new Date(data[id]).toLocaleDateString() : ''}
        onChange={(e) => handleFieldChange(id, e.target.value)}
        disabled
      />
      <DatePicker
  selected={data[id] ? new Date(data[id]) : null}
  onChange={(date) => handleFieldChange(id, date)}
  showYearDropdown
  scrollableYearDropdown
  yearDropdownItemNumber={15}
  showMonthDropdown
  dropdownMode="select"
  customInput={<CalendarMonthIcon style={{ fontSize: '50px' }} />}
  dateFormat="dd/MM/yyyy"  // Set the desired date format
   />
    </Box>
  );
};

export default Calendar;

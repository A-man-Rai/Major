import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

export default function UsersTable({data}) {
  
  return (
    <TableContainer component={Paper}>
  <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 1 }} fontWeight={"bold"}>REGISTERED USERS</Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">EMAIL</TableCell>
            <TableCell align="center">FIRSTNAME</TableCell>
            <TableCell align="center">SURNAME</TableCell>
            <TableCell align="center">NATIONALITY</TableCell>
            <TableCell align="center">TOTAL APPLICATION SUBMITTED</TableCell>
            <TableCell align="center">APPROVED</TableCell>
            <TableCell align="center">REJECTED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.surname}</TableCell>          
              <TableCell align="center">{row.nationality}</TableCell>
              <TableCell align="center">{row.submitted}</TableCell>
              <TableCell align="center">{row.approved}</TableCell>
              <TableCell align="center">{row.reject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const holidays = [
  { name: "New Year's Day", date: '1 January' },
  { name: 'Chinese New Year', date: '12-13 February' },
  { name: 'Good Friday', date: '2 April' },
  { name: 'Labour Day', date: '1 May' },
  { name: 'Hari Raya Puasa', date: '13 May' },
  { name: 'Vesak Day', date: '26 May' },
  { name: 'Hari Raya Haji', date: '20 July' },
  { name: 'National Day', date: '9 August' },
  { name: 'Deepavali', date: '4 November' },
  { name: 'Christmas Day', date: '25 December' }
];

export default function SingaporeHolidays() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Holiday</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holidays.map((holiday) => (
            <TableRow key={holiday.name}>
              <TableCell component="th" scope="row">
                {holiday.name}
              </TableCell>
              <TableCell>{holiday.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

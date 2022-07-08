import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import  {DateTimePicker}  from '@mui/x-date-pickers/DateTimePicker';
import  {AdapterMoment}   from '@mui/x-date-pickers/AdapterMoment';
import  {LocalizationProvider}  from '@mui/x-date-pickers';

const DTPicker = () => {
  const [value, setValue] = React.useState(new Date('2022-07-08T00:00:00'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Suspense Date/Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default DTPicker;

// @material-ui/core
// @material-ui/lab
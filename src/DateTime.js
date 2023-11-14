import React from 'react';
import { Formik, Field, Form } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const initialValues = {
  pickuptime: null,
};

const DateTime = () => {
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log('Form submitted with values:', values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Field name="pickuptime">
              {({ field, form }) => (
                <DateTimePicker
                  value={field.value}
                  onChange={(date) => form.setFieldValue(field.name, date)}
                  renderInput={(props) => <TextField {...props} />}
                />
              )}
            </Field>
          </LocalizationProvider>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DateTime;

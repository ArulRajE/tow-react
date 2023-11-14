/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, MenuItem } from '@mui/material';

import { logout, getStorageData } from 'utils/auth/auth';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// services
import { CallService, DriverService } from '_services';

//Date time picket
// import DateTimePickerComponent from './datetimepicker';

// eslint-disable-next-line no-restricted-imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DEFAULT_INITIAL_VALUES = {
  driver: '',
  dispatcher: '',
  serviceType: '',
  client: '',
  jobId: '',
  pickuptime: '2023-10-10 01:01:01',
  address: '',
  status: 'Pending',
  notes: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
  const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);
  const [userData, setUserData] = React.useState([]);
  const [availableDrivers, setAvailableDrivers] = React.useState([
    {
      isEmailVerified: false,
      name: 'Michael Ammo',
      email: 'michael.ammo@example.com',
      role: 'driver',
      id: '651ad5d5aa2d67071808900c'
    }
  ]);

  React.useEffect(() => {
    DriverService.getAll()
      .then((res) => {
        if (res && res.results) {
          const data = res.results;
          console.log('*********************************');
          console.log('Driver');
          console.log(data);
          setAvailableDrivers(data);
          console.log('*********************************');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
        console.log(err.response);
      });
    if (id) {
      CallService.getById(id)
        .then((res) => {
          if (res) {
            const data = res;
            setInitialValues((prevState) => ({
              ...prevState,
              driver: data.driver,
              dispatcher: data.dispatcher,
              serviceType: data.serviceType,
              jobId: data.jobId,
              pickuptime: data.pickuptime,
              address: data.address,
              status: data.status
            }));
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!');
          console.log(err.response);
        });
    }
  }, [id]);

  React.useEffect(() => {
    const userData = getStorageData();
    console.log(userData);
    setUserData(userData);
  }, [open]);

  const handleSubmit = (values) => {
    const nvalue = Object.assign(values, { dispatcher: userData.user.id });
    // eslint-disable-next-line no-debugger
    if (!id) {
      console.log(userData);
      CallService.create(nvalue)
        .then((res) => {
          if (res) {
            toast.success('Saved Successfully!');
            getData();
            handleCloseDialog();
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!');
          console.log(err.response);
        });
    } else {
      CallService.update(id, nvalue)
        .then((response) => {
          if (response) {
            toast.success('Saved Successfully!');
            getData();
            handleCloseDialog();
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!');
          console.log(err);
        });
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      sx={{
        '&>div:nth-child(3)': {
          justifyContent: 'flex',
          '&>div': {
            margin: '0px',
            borderRadius: '0px',
            maxWidth: '450px',
            maxHeight: '100%'
          }
        }
      }}
    >
      <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>{id ? 'Update Call' : 'Add Call'}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 0.25 }}>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="servicetype"
                    select
                    label="Service Type"
                    name="serviceType"
                    value={formik.values.servicetype}
                    onChange={formik.handleChange}
                    error={formik.touched.servicetype && Boolean(formik.errors.servicetype)}
                    helperText={formik.touched.servicetype && formik.errors.servicetype}
                  >
                    {[
                      '22651 (K) - PARKED OVER 72 HOURS',
                      '22651 (O) - EXPIRED REGISTRATION',
                      'Accident',
                      'Jump Start',
                      'Battery Installation',
                      'Storage',
                      'Tow',
                      'GOA',
                      'Jump Start',
                      'Tire Service',
                      'Fuel Delivery',
                      'Lockout',
                      'Winch Out',
                      'Other'
                    ].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    select
                    label="driver"
                    name="driver"
                    onChange={formik.handleChange}
                    error={formik.touched.driver && Boolean(formik.errors.driver)}
                    helperText={formik.touched.driver && formik.errors.driver}
                  >
                    {availableDrivers != undefined &&
                      availableDrivers.map((option) => (
                        <MenuItem key={option} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="Job ID"
                    name="jobId"
                    value={formik.values.jobId}
                    onChange={formik.handleChange}
                    error={formik.touched.jobId && Boolean(formik.errors.jobId)}
                    helperText={formik.touched.jobId && formik.errors.jobId}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DateTimePicker
                        label="Select Pickuptime"
                        onChange={formik.handleChange}
                        error={formik.touched.pickuptime && Boolean(formik.errors.pickuptime)}
                        helperText={formik.touched.pickuptime && formik.errors.pickuptime}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    name="status"
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                  >
                    {['Pending', 'In Progress', 'Completed', 'Canceled'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="text" color="error" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <AnimateButton>
                <Button type="submit" variant="contained">
                  {id ? 'Update' : 'Add'}
                </Button>
              </AnimateButton>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

Form.propTypes = {
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  id: PropTypes.number,
  getData: PropTypes.func
};

export default React.memo(Form);

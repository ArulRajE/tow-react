import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, MenuItem } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// services
import { CallService, DriverService } from '_services';

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DEFAULT_INITIAL_VALUES = {
  driver: '',
  dispatcher: '',
  serviceType: '',
  client: '',
  jobId: '',
  pickuptime: '',
  address: '',
  status: 'Pending',
  notes: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
  const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);
  // const [availableDrivers, setAvailableDrivers] = React.useState([{ name: 'ranga', id: '0939' }]);

  React.useEffect(() => {
    DriverService.getAll()
      .then((res) => {
        if (res) {
          const data = res.results;
          setAvailableDrivers(...data);
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

  const handleSubmit = (values) => {
    if (!id) {
      CallService.create(values)
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
      CallService.update(id, values)
        .then((response) => {
          if (response) {
            toast.success('Saved Successfully!');
            getData();
            handleCloseDialog();
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!');
          console.log(err.response);
        });
    }
  };

  return (
    <div>
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
                    {/* <TextField
                    fullWidth
                    select
                    label="driver"
                    name="Driver"
                    onChange={formik.handleChange}
                    error={formik.touched.driver && Boolean(formik.errors.driver)}
                    helperText={formik.touched.driver && formik.errors.driver}
                  >
                    {availableDrivers.map((option) => (
                      <MenuItem key={option} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Job ID"
                      name="jobId"
                      value={formik.values.driver}
                      onChange={formik.handleChange}
                      error={formik.touched.jobId && Boolean(formik.errors.jobId)}
                      helperText={formik.touched.jobId && formik.errors.jobId}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Pickup Time"
                      name="pickuptime"
                      onChange={formik.handleChange}
                      error={formik.touched.pickuptime && Boolean(formik.errors.pickuptime)}
                      helperText={formik.touched.pickuptime && formik.errors.pickuptime}
                    />
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
    </div>
  );
};

Form.propTypes = {
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  id: PropTypes.number,
  getData: PropTypes.func
};

export default React.memo(Form);

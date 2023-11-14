import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// services
import { DriverService } from '_services';

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DEFAULT_INITIAL_VALUES = {
  driverName: '',
  shiftTiming: '',
  loginTime: '',
  lunchTime: '',
  logoutTime: '',
  tireService: '',
  lockout: '',
  fuelDelivery: '',
  jumpStart: '',
  tow: '',
  status: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
  const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

  React.useEffect(() => {
    if (id) {
      DriverService.getById(id)
        .then((res) => {
          if (res) {
            const data = res;
            setInitialValues((prevState) => ({
              ...prevState,
              driverName: data.driverName,
              shiftTiming: data.shiftTiming,
              loginTime: data.loginTime,
              lunchTime: data.lunchTime,
              logoutTime: data.logoutTime,
              tireService: data.tireService,
              lockout: data.lockout,
              fuelDelivery: data.fuelDelivery,
              jumpStart: data.jumpStart,
              tow: data.tow,
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
      DriverService.create(values)
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
      DriverService.update(id, values)
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
            <DialogTitle>{id ? 'Update Dispatcher' : 'Add Dispatcher'}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 0.25 }}>
                <Grid item xs={12} md={12}>
                  {id ? (
                    <TextField
                      fullWidth
                      id="driverName"
                      name="driverName"
                      label="Name "
                      value={formik.values.driverName}
                      onChange={formik.handleChange}
                      error={formik.touched.driverName && Boolean(formik.errors.driverName)}
                      helperText={formik.touched.driverName && formik.errors.driverName}
                      disabled
                    />
                  ) : (
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  )}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    fullWidth
                    id="shiftTiming"
                    name="shiftTiming"
                    label="Shift Timing"
                    type="shiftTiming"
                    value={formik.values.shiftTiming}
                    onChange={formik.handleChange}
                    error={formik.touched.shiftTiming && Boolean(formik.errors.shiftTiming)}
                    helperText={formik.touched.shiftTiming && formik.errors.shiftTiming}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    fullWidth
                    id="loginTime"
                    name="loginTime"
                    label="Login Time"
                    type="loginTime"
                    value={formik.values.loginTime}
                    onChange={formik.handleChange}
                    error={formik.touched.loginTime && Boolean(formik.errors.loginTime)}
                    helperText={formik.touched.loginTime && formik.errors.loginTime}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    fullWidth
                    id="lunchTime"
                    name="lunchTime"
                    label="Luch Time"
                    type="lunchTime"
                    value={formik.values.lunchTime}
                    onChange={formik.handleChange}
                    error={formik.touched.lunchTime && Boolean(formik.errors.lunchTime)}
                    helperText={formik.touched.lunchTime && formik.errors.lunchTime}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    fullWidth
                    id="logoutTime"
                    name="logoutTime"
                    label="Log out Time"
                    type="logoutTime"
                    value={formik.values.logoutTime}
                    onChange={formik.handleChange}
                    error={formik.touched.logoutTime && Boolean(formik.errors.logoutTime)}
                    helperText={formik.touched.logoutTime && formik.errors.logoutTime}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="tireService"
                    name="tireService"
                    label="Tire Service"
                    type="tireService"
                    value={formik.values.tireService}
                    onChange={formik.handleChange}
                    error={formik.touched.tireService && Boolean(formik.errors.tireService)}
                    helperText={formik.touched.tireService && formik.errors.tireService}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="lockout"
                    name="lockout"
                    label="Lock out"
                    type="lockout"
                    value={formik.values.lockout}
                    onChange={formik.handleChange}
                    error={formik.touched.lockout && Boolean(formik.errors.lockout)}
                    helperText={formik.touched.lockout && formik.errors.lockout}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="jumpStart"
                    name="jumpStart"
                    label="Phone No"
                    type="jumpStart"
                    value={formik.values.jumpStart}
                    onChange={formik.handleChange}
                    error={formik.touched.jumpStart && Boolean(formik.errors.jumpStart)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="fuelDelivery"
                    name="fuelDelivery"
                    label="Fuel Delivery"
                    type="text"
                    value={formik.values.fuelDelivery}
                    onChange={formik.handleChange}
                    error={formik.touched.fuelDelivery && Boolean(formik.errors.fuelDelivery)}
                    helperText={formik.touched.fuelDelivery && formik.errors.fuelDelivery}
                  />
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

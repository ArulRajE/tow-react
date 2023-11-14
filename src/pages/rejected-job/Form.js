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
import { RejectedJobService } from '_services';

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DEFAULT_INITIAL_VALUES = {
  serviceType: '',
  zipCode: '',
  rejectedBy: '',
  reason: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
  const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

  React.useEffect(() => {
    if (id) {
      RejectedJobService.getById(id)
        .then((res) => {
          if (res) {
            const data = res;
            setInitialValues((prevState) => ({
              ...prevState,
              serviceType: data.serviceType,
              zipCode: data.zipCode,
              rejectedBy: data.rejectedBy,
              reason: data.reason
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
      RejectedJobService.create(values)
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
      RejectedJobService.updateUser(id, values)
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
            <DialogTitle>{id ? 'Update Rejected Calls' : 'Add Rejected Calls'}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 0.25 }}>
                <Grid item xs={12} md={12}>
                  {id ? (
                    <TextField
                      fullWidth
                      id="serviceType"
                      name="serviceType"
                      label="Service Type"
                      value={formik.values.serviceType}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.serviceType)}
                      helperText={formik.touched.name && formik.errors.serviceType}
                      disabled
                    />
                  ) : (
                    <TextField
                      fullWidth
                      id="serviceType"
                      name="serviceType"
                      label="Service Type"
                      value={formik.values.serviceType}
                      onChange={formik.handleChange}
                      error={formik.touched.serviceType && Boolean(formik.errors.serviceType)}
                      helperText={formik.touched.serviceType && formik.errors.serviceType}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  {id ? (
                    <TextField
                      fullWidth
                      id="rejectedBy"
                      name="rejectedBy"
                      label="Rejected By"
                      value={formik.values.rejectedBy}
                      onChange={formik.handleChange}
                      error={formik.touched.rejectedBy && Boolean(formik.errors.rejectedBy)}
                      helperText={formik.touched.rejectedBy && formik.errors.rejectedBy}
                      inputProps={{
                        autocomplete: 'email',
                        form: {
                          autocomplete: 'off'
                        }
                      }}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      id="zipCode"
                      name="zipCode"
                      label="Zipcode"
                      value={formik.values.zipCode}
                      onChange={formik.handleChange}
                      error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                      helperText={formik.touched.zipCode && formik.errors.zipCode}
                      inputProps={{
                        autocomplete: 'email',
                        form: {
                          autocomplete: 'off'
                        }
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="rejectedBy"
                    name="rejectedBy"
                    label="Rejcted By"
                    type="text"
                    value={formik.values.rejectedBy}
                    onChange={formik.handleChange}
                    error={formik.touched.rejectedBy && Boolean(formik.errors.rejectedBy)}
                    helperText={formik.touched.rejectedBy && formik.errors.rejectedBy}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id="reason"
                    name="reason"
                    label="Reason"
                    type="text"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.reason)}
                    helperText={formik.touched.address && formik.errors.reason}
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

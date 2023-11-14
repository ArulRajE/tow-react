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
import { UserService } from '_services';

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DEFAULT_INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  address: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
  const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

  React.useEffect(() => {
    if (id) {
      UserService.getUserById(id)
        .then((res) => {
          if (res) {
            const data = res;
            setInitialValues((prevState) => ({
              ...prevState,
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address
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
      UserService.createUser(values)
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
      UserService.updateUser(id, values)
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
                <Grid item xs={12} md={6}>
                  {id ? (
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
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
                <Grid item xs={12} md={6}>
                  {id ? (
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      inputProps={{
                        autocomplete: 'email',
                        form: {
                          autocomplete: 'off'
                        }
                      }}
                      disabled
                    />
                  ) : (
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      inputProps={{
                        autocomplete: 'email',
                        form: {
                          autocomplete: 'off'
                        }
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Phone No"
                    type="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Address"
                    type="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
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

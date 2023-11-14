import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Slide,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// services
import { UserService, RoleService } from '_services';


// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DEFAULT_INITIAL_VALUES = {
  role: '',
  name: '',
  email: '',
  phone: '',
  address: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
  const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);
  const [roles, setRoles] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(false);

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
              password: data.password,
              role: data.role,
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

  React.useEffect(() => {
    RoleService.getAllRole()
      .then((res) => {
        if (res && res.results) {
          const data = res.results;
          setRoles(data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  // eslint-disable-next-line prefer-const
  // let validationSchima = {
  //     username: Yup.string().required('Required'),
  //     password: Yup.string(),
  //     email: Yup.string().email().required('Required'),
  //     role: Yup.string().required('Required')
  // };
  // if (!id !== '0') {
  //     validationSchima.password = Yup.string().required('Required');
  //     validationSchima.confirmPassword = Yup.string()
  //         .when('password', {
  //             is: (val) => val && val.length > 0,
  //             then: Yup.string().oneOf([Yup.ref('password')], 'Both Password must match!')
  //         })
  //         .required('This field is required');
  // }

  // const validation = Yup.object().shape(validationSchima);

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog}>
      <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>{id ? 'Update User' : 'Add User'}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 0.25 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Role"
                    fullWidth
                    id="role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  >
                    {roles.map((role) => (
                      <MenuItem value={role.role} key={role.role}>
                        {role.role}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
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
                <Grid item xs={12}>
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
                {!id && (
                  <Grid item xs={12} md={6} variant="outlined">
                    <div style={{ display: 'flex' }}>
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        inputProps={{
                          autocomplete: 'password',
                          form: {
                            autocomplete: 'off'
                          }
                        }}
                      />
                      <InputAdornment position="end" style={{ margin: 'auto 0' }}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    </div>
                    {/* <OutlinedInput
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        className="passwordInput"
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    /> */}
                  </Grid>
                )}
                {!id && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                  </Grid>
                )}
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

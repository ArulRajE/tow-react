import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';

import { Alert, Button, Fade, Grow, IconButton, Slide } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';

import { CloseCircleOutlined } from '@ant-design/icons';

// animation function
function TransitionSlideLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

function FadTransition(props) {
  return <Fade {...props} />;
}

// animation options
const transition = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade: FadTransition
};

// ===========================|| SNACKBAR ||=========================== //

const Snackbar = () => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const snackbarInitial = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(snackbarInitial.open);
  }, [snackbarInitial.action, snackbarInitial.open]);

  return (
    <>
      {/* default snackbar */}
      {snackbarInitial.variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={snackbarInitial.anchorOrigin}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackbarInitial.message}
          TransitionComponent={transition[snackbarInitial.transition]}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseCircleOutlined fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}

      {/* alert snackbar */}
      {snackbarInitial.variant === 'alert' && (
        <MuiSnackbar
          TransitionComponent={transition[snackbarInitial.transition]}
          anchorOrigin={snackbarInitial.anchorOrigin}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            severity={snackbarInitial.alertSeverity}
            sx={{
              bgcolor: `${snackbarInitial.alertSeverity}.dark`,
              color: snackbarInitial.alertSeverity === 'warning' ? theme.palette.grey[800] : ''
            }}
            action={
              <>
                {snackbarInitial.actionButton !== false && (
                  <Button color="secondary" size="small" onClick={handleClose}>
                    UNDO
                  </Button>
                )}
                {snackbarInitial.close !== false && (
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseCircleOutlined fontSize="small" />
                  </IconButton>
                )}
              </>
            }
          >
            {snackbarInitial.message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;

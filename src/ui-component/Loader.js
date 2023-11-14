import React from 'react';

// material-ui
import LinearProgress from '@mui/material/LinearProgress';

// ===========================|| Loader ||=========================== //

const Loader = () => {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <div
      // eslint-disable-next-line react/no-unknown-property
      sx={{
        width: 300,
        color: 'success.main'
      }}
    >
      <LinearProgress color="primary" />
    </div>
  );
};

export default Loader;

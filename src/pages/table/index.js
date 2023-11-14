/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// import qs from 'qs';
import { Table, Space } from 'antd';
// material-ui
import { useTheme } from '@mui/material/styles';

import {
  InputAdornment,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Toolbar,
  Tooltip,
  Typography,
  DialogContentText,
  TextField,
  Fab,
  Box,
  CardContent,
  Chip
} from '@mui/material';

// assets
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';

// services
import { CallService } from '_services';

import Form from './CallForm';

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params
});
const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });

  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const columns = [
    {
      title: 'Job Id',
      dataIndex: 'jobId',
      sorter: true,
      render: (jobId) => `${jobId} `,
      width: '10%'
    },
    {
      title: 'Location',
      dataIndex: 'address',
      sorter: true,
      render: (address) => `${address} `,
      width: '20%'
    },
    {
      title: 'Pickup Time',
      dataIndex: 'pickuptime',
      render: (pickuptime) => `${pickuptime} `,
      width: '20%'
    },
    {
      title: 'Service type',
      dataIndex: 'serviceType',
      filters: [
        {
          text: '22651 (K) - PARKED OVER 72 HOURS',
          value: '22651 (K) - PARKED OVER 72 HOURS'
        },
        {
          text: '22651 (O) - EXPIRED REGISTRATION',
          value: '22651 (O) - EXPIRED REGISTRATION'
        },
        {
          text: 'Accident',
          value: 'Accident'
        },
        {
          text: 'Jump Start',
          value: 'Jump Start'
        },
        {
          text: 'Battery Installation',
          value: 'Battery Installation'
        },
        {
          text: 'Storage',
          value: 'Storage'
        },
        {
          text: 'Tow',
          value: 'Tow'
        },
        {
          text: 'GOA',
          value: 'GOA'
        },
        {
          text: 'Jump Start',
          value: 'Jump Start'
        },
        {
          text: 'Tire Service',
          value: 'Tire Service'
        },
        {
          text: 'Fuel Delivery',
          value: 'Fuel Delivery'
        },
        {
          text: 'Lockout',
          value: 'Lockout'
        },
        {
          text: 'Winch Out',
          value: 'Winch Out'
        },
        {
          text: 'Other',
          value: 'Other'
        }
      ],
      width: '10%'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: true,
      render: (status) => {
        let color = 'default';
        switch (status) {
          case 'Pending':
            color = 'danger';
            break;
          case 'Completed':
            color = 'success';
            break;
          default:
            'primary';
        }

        // return <Chip label={status} color={color} />;
      },
      width: '10%'
    },
    {
      title: 'Assaigned Driver',
      dataIndex: 'driver',
      sorter: true,
      render: (driver) => `${driver?.name} `,
      width: '10%'
    },
    {
      title: 'Dispatcher',
      dataIndex: 'dispatcher',
      sorter: true,
      render: (dispatcher) => `${dispatcher?.name} `,
      width: '10%'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined style={{ fontSize: '16px', color: secondary }} onClick={() => editHandler(record.id)} />
          <DeleteOutlined
            style={{ fontSize: '16px', color: warning }}
            onClick={() => {
              setConfirmOpen(true);
              setDeleteId(record.id);
            }}
          />
          <div>
            <Dialog
              style={{ backgroundColor: 'transparent', opacity: 0.9 }}
              open={confirmOpen}
              // onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">Do you want to delete the User ?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setConfirmOpen(!confirmOpen)}>Cancel</Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setConfirmOpen(!confirmOpen);
                    deleteRecord(deleteId);
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Space>
      ),
      width: '5%'
    }
  ];

  const deleteRecord = (id) => {
    CallService.deleteById(id)
      .then(() => {
        // toast.success('Deleted successfully!');
        fetchData();
      })
      .catch((err) => {
        toast.error("Sorry!. Couldn't delete, please try again!");
        console.log(err.response);
      });
  };

  const handleSearch = (event) => {
    return '';
  };

  const editHandler = (id) => {
    setId(id);
    setOpen(!open);
  };
  const fetchData = () => {
    setLoading(true);
    const y = getRandomuserParams(tableParams);
    console.log(y);

    CallService.getAll()
      //fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      // .then((res) => res.json())
      .then((res) => {
        if (res && res.results) {
          const results = res.results;
          setData(results);
          setLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res.totalResults
              // 200 is mock data, you should read it from server
              // total: data.totalCount,
            }
          });
        }
        // return 0;
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <>
      {/* {open && <Form id={id} open={open} handleCloseDialog={() => setOpen(!open)} getData={fetchData} />} */}
      <Box sx={{ backgroundColor: '#FFFFFF', paddingTop: '2px' }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center" spacing={6}>
            <Grid item xs={12} sm={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                onChange={handleSearch}
                placeholder="Search"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
              <Tooltip title="Add Call">
                <Fab
                  color="primary"
                  size="small"
                  onClick={() => {
                    setId(0);
                    setOpen(!open);
                  }}
                  sx={{ boxShadow: 'none', ml: 1, width: '25px', height: '25px', minHeight: '25px' }}
                >
                  <AddIcon fontSize="small" style={{ color: '#fff' }} />
                </Fab>
              </Tooltip>

              {open && <Form id={id} open={open} handleCloseDialog={() => setOpen(!open)} getData={fetchData} />}
            </Grid>
          </Grid>
        </CardContent>
      </Box>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        size="small"
      />
      <div>
        <Dialog
          style={{ backgroundColor: 'transparent', opacity: 0.9 }}
          open={confirmOpen}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Do you want to delete the User ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(!confirmOpen)}>Cancel</Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setConfirmOpen(!confirmOpen);
                deleteRecord(deleteId);
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default App;

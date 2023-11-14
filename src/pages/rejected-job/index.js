import PropTypes from 'prop-types';
import * as React from 'react';

import { gridSpacing } from 'store/constant';

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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  DialogContentText,
  TextField,
  Fab,
  Box,
  CardContent
} from '@mui/material';

// third-party
import { toast } from 'react-toastify';

// project imports
import Pagination from '../../ui-component/extended/Pagination';
// assets
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import MainCard from 'ui-component/cards/MainCard';

//  icons
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import Form from './Form';

// services
import { RejectedJobService } from '_services';

// table sort
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// table header
const headCells = [
  {
    id: 'serviceType',
    numeric: false,
    disablePadding: false,
    label: 'Service Type',
    columnName: 'serviceType'
  },
  {
    id: 'zipCode',
    numeric: false,
    disablePadding: false,
    label: 'Zip Code',
    columnName: 'zipCode'
  },
  {
    id: 'rejectedBy',
    numeric: false,
    disablePadding: false,
    label: 'Rejected By',
    columnName: 'rejectedBy'
  },
  {
    id: 'reason',
    numeric: false,
    disablePadding: false,
    label: 'Reason',
    columnName: 'reason'
  }
];

// ===========================|| TABLE HEADER ||=========================== //

function EnhancedTableHead({ order, orderBy, numSelected, onRequestSort, theme, selected }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: theme.palette.primary }}>
      <TableRow>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={7}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              // className={classes.TableCell}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? <span>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {numSelected <= 0 && (
          <TableCell
            sortDirection={false}
            align="center"
            sx={{
              pr: 3
            }}
          >
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900' }}>
              Action
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  theme: PropTypes.object,
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

// ===========================|| TABLE HEADER TOOLBAR ||=========================== //

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="h4" component="div">
          {numSelected} Selected
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

// ===========================||  LIST ||=========================== //

const DispatcherManagement = () => {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Employee Number');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [originalRows, setoriginalRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);

  const getData = React.useCallback(() => {
    RejectedJobService.getAll()
      .then((res) => {
        if (res && res.results) {
          const data = res.results;
          setRows(data);
          setoriginalRows(data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  React.useEffect(() => {
    getData();
  }, [getData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const RenderCell = ({ value }) => <p>{value}</p>;
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.name);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const deleteRecord = (id) => {
    RejectedJobService.deleteById(id)
      .then(() => {
        toast.success('Deleted successfully!');
        getData();
      })
      .catch((err) => {
        toast.error("Sorry!. Couldn't delete, please try again!");
        console.log(err.response);
      });
  };

  const editHandler = (id) => {
    setId(id);
    setOpen(!open);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSearch = (event) => {
    const newString = event.target.value;
    // setSearch(newString);

    if (newString) {
      const newRows = originalRows.filter((row) => {
        let matches = true;

        const properties = headCells.map((obj) => obj.columnName);
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property] && row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setRows(newRows);
    } else {
      setRows(originalRows);
    }
  };

  return (
    <Grid item xs={12} sm={6} lg={12} spacing={gridSpacing}>
      <MainCard style={{ padding: 0 }} title="Rejected Call" darkTitle=" ">
        <Box sx={{ backgroundColor: '#FFFFFF', paddingTop: '10px' }}>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
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
                <Tooltip title="Add Rejected Job">
                  <Fab
                    color="primary"
                    size="small"
                    onClick={() => {
                      setId(0);
                      setOpen(!open);
                    }}
                    sx={{ boxShadow: 'none', ml: 1, width: '32px', height: '32px', minHeight: '32px' }}
                  >
                    <AddIcon fontSize="small" style={{ color: '#fff' }} />
                  </Fab>
                </Tooltip>

                {open && <Form id={id} open={open} handleCloseDialog={() => setOpen(!open)} getData={getData} />}
              </Grid>
            </Grid>
          </CardContent>
        </Box>
        <>
          {/* table */}
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                theme={theme}
                selected={selected}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        {headCells.map((col) => (
                          // eslint-disable-next-line react/jsx-key
                          <TableCell align="left">
                            <RenderCell cellSetting={col} value={row[col.columnName]} />
                          </TableCell>
                        ))}

                        <TableCell align="center" sx={{ pr: 3 }}>
                          <IconButton component={Button}>
                            <IconEdit onClick={() => editHandler(row.id)} />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              setConfirmOpen(true);
                              setDeleteId(row.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
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
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {rows.length === 0 && (
                  <TableRow
                  /* style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }} */
                  >
                    <TableCell colSpan={headCells.length}>No Data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* table pagination */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Pagination
              className="pagination-bar"
              currentPage={page}
              totalCount={rows.length}
              pageSize={rowsPerPage}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </>
      </MainCard>
    </Grid>
  );
};

export default DispatcherManagement;

import { FilterAltOutlined, Functions, SaveOutlined } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

import PageLayout from "../../components/PageLayout/PageLayout";
import columns from "../../constants/columns";
import rows from "../../constants/rows";

const LPNDateCheck = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <PageLayout sx={{ pl: 2, pt: 2 }}>
      <Grid container alignItems="center" gap={2}>
        <Typography variant="h1" color="primary">
          RNDC
        </Typography>
        <Typography variant="h2" color="primary" mb={1}>
          Warehouse Management
        </Typography>
      </Grid>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    fontSize: "16px",
                    color: "primary.main",
                    p: 1,
                  }}
                >
                  {!column.isSave ? (
                    <Grid container flexDirection="column">
                      <Grid item sx={{ height: 75 }}>
                        {column.label}
                      </Grid>
                      <Grid container flexDirection="row" alignItems="center">
                        <Grid item xs={8}>
                          <TextField inputProps={{ sx: { p: 1 } }} />
                        </Grid>
                        <Grid item xs={4}>
                          <IconButton
                            color="primary"
                            size="small"
                            sx={{ marginLeft: "2px" }}
                          >
                            <FilterAltOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const renderChildren = (() => {
                      switch (true) {
                        case column.format && typeof value === "number":
                          return column.format(value);
                        case column.isDate && Boolean(value):
                          return (
                            <DatePicker
                              inputFormat="MM/DD/YYYY"
                              defaultValue={value ? dayjs(value) : undefined}
                            />
                          );
                        case column.isPriorityDate:
                          return (
                            <Grid container alignItems="center">
                              <Grid item xs={2}>
                                <IconButton sx={{ p: 0 }}>
                                  <Functions />
                                </IconButton>
                              </Grid>
                              <Grid item xs={10}>
                                <DatePicker
                                  inputFormat="MM/DD/YYYY"
                                  defaultValue={value ? dayjs(value) : undefined}
                                />
                              </Grid>
                            </Grid>
                          );
                        case column.isSave:
                          return (
                            <Button variant="contained" endIcon={<SaveOutlined />}>
                              Save
                            </Button>
                          );
                        default:
                          return value;
                      }
                    })();

                    return (
                      <TableCell key={column.id} align={column.align} sx={{ p: 1 }}>
                        {renderChildren}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Divider />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" endIcon={<SaveOutlined />} sx={{ m: 1 }}>
          Save All
        </Button>
      </div>
    </PageLayout>
  );
};

export default LPNDateCheck;

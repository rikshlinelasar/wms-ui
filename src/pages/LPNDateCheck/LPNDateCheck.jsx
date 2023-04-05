import { FilterAltOutlined, SaveOutlined } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  TableContainer,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React from "react";

import LPNDateTableRow from "../../components/LPNDateTableRow/LPNDateTableRow";
import PageLayout from "../../components/PageLayout/PageLayout";
import WarehousePicker from "../../components/WarehousePicker/WarehousePicker";
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
    <PageLayout>
      <Grid pt={2}>
        {/* 
        <Grid container alignItems="center" gap={2}>
          <Typography variant="h1" color="primary">
            RNDC
          </Typography>
          <Typography variant="h2" color="primary" mb={1}>
            Warehouse Management
          </Typography>
        </Grid> */}
        <WarehousePicker />
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
                      pt: 0.5,
                      p: 1,
                    }}
                  >
                    {!column.isSave ? (
                      <Grid container flexDirection="column">
                        <Grid item sx={{ height: 55 }}>
                          {column.label}
                        </Grid>
                        <Grid container flexDirection="row" alignItems="center">
                          <Grid item xs={8}>
                            <TextField size="small" inputProps={{ sx: { p: 1 } }} />
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
                  <LPNDateTableRow key={row.id} row={row} />
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
        <Grid container justifyContent="flex-end">
          <Button variant="contained" endIcon={<SaveOutlined />} sx={{ m: 1 }}>
            Save All
          </Button>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default LPNDateCheck;

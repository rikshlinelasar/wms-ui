import { SaveOutlined } from "@mui/icons-material";
import { Button, Divider, Grid, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import React, { useEffect, useRef, useState } from "react";

import LPNDateTableHead from "../../components/LPNDateTableHead/LPNDateTableHead";
import LPNDateTableRow from "../../components/LPNDateTableRow/LPNDateTableRow";
import PageLayout from "../../components/PageLayout/PageLayout";
import WarehousePicker from "../../components/WarehousePicker/WarehousePicker";
import rows from "../../constants/rows";
import { SortOrders } from "../../constants/sort";
import { getComparator } from "../../functions/sort";
import { appBarHeight } from "../../styles/styles";

const LPNDateCheck = () => {
  const filtersLengthRef = useRef(0);
  const unsavedRowsRef = useRef({});
  const filteredRowsRef = useRef([...rows]);
  const originalRowsRef = useRef([...rows]);
  const [sort, setSort] = useState(null);
  const [sortOrder, setSortOrder] = useState(SortOrders.asc);
  const [page, setPage] = useState(0);
  const [saveAllCounter, setSaveAllCounter] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableHeight, setTableHeight] = useState(
    window.innerHeight - appBarHeight - 40 - 135
  );
  const [filters, setFilters] = useState({});
  const [updatedRows, setUpdatedRows] = useState(originalRowsRef.current);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSaveAll = () => {
    for (const rowKey in unsavedRowsRef.current) {
      originalRowsRef.current[rowKey] = unsavedRowsRef.current[rowKey];
    }
    setSaveAllCounter(saveAllCounter + 1);
    handleFilter();
  };

  const handleRowUpdate = (row, i) => {
    originalRowsRef.current[i] = row;
    handleFilter();
  };

  const handleClearFilters = () => {
    filteredRowsRef.current = [...originalRowsRef.current];
    setSort(null);
    setSortOrder(SortOrders.asc);
    setFilters([]);
  };

  const handleFilter = () => {
    let temp = [...originalRowsRef.current];

    for (const filterKey in filters) {
      if (filters[filterKey]) {
        temp = temp.filter((row) => {
          if (typeof row[filterKey] === "string") {
            return row[filterKey]
              .toLowerCase()
              .includes(filters[filterKey].toLowerCase());
          }

          return row[filterKey] === Number(filters[filterKey]);
        });
      }
    }

    filteredRowsRef.current = temp;
    if (sort) {
      temp = temp.sort(getComparator(sortOrder, sort));
    }

    setUpdatedRows(temp);
  };

  useEffect(() => {
    const resizeListener = () => {
      setTableHeight(window.innerHeight - appBarHeight - 40 - 135);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  useEffect(() => {
    if (sort === null) {
      setUpdatedRows(filteredRowsRef.current);
    } else {
      setUpdatedRows(
        [...filteredRowsRef.current].sort(getComparator(sortOrder, sort))
      );
    }
  }, [sort, sortOrder]);

  useEffect(() => {
    const length = Object.keys(filters).length;

    if (length != filtersLengthRef.current && length < filtersLengthRef.current) {
      filtersLengthRef.current = length;
      handleFilter();
    }
  }, [filters]);

  return (
    <PageLayout>
      <Grid pt={2}>
        <WarehousePicker />
        <TableContainer sx={{ height: tableHeight }}>
          <Table stickyHeader aria-label="sticky table">
            <LPNDateTableHead
              filtersLengthRef={filtersLengthRef}
              sort={sort}
              setSort={setSort}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              filters={filters}
              setFilters={setFilters}
              onFilter={handleFilter}
              onClearFilters={handleClearFilters}
            />
            <TableBody>
              {updatedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <LPNDateTableRow
                    key={row.id}
                    unsavedRowsRef={unsavedRowsRef}
                    row={row}
                    index={i}
                    saveAllCounter={saveAllCounter}
                    onRowUpdate={handleRowUpdate}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={updatedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Divider />
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            endIcon={<SaveOutlined />}
            sx={{ m: 1 }}
            onClick={handleSaveAll}
          >
            Save All
          </Button>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default LPNDateCheck;

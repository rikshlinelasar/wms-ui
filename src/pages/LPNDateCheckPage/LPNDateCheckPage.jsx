import { CheckCircleOutline, SaveOutlined } from "@mui/icons-material";
import { Button, Divider, Fade, Grid, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BackButton from "../../components/BackButton/BackButton";
import LPNDateTableHead from "../../components/LPNDateTableHead/LPNDateTableHead";
import LPNDateTableRow from "../../components/LPNDateTableRow/LPNDateTableRow";
import PageLayout from "../../components/PageLayout/PageLayout";
import RouteChip from "../../components/RouteChip/RouteChip";
import WarehousePicker from "../../components/WarehousePicker/WarehousePicker";
import rows from "../../constants/rows";
import { SortOrders } from "../../constants/sort";
import { getComparator } from "../../functions/sort";
import useGetLPNData from "../../hooks/useGetLPNData";
import { openNotification } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";
import { appBarHeight } from "../../styles/styles";
import { formatObjectToArray } from "../../functions/format";

const LPNDateCheckPage = () => {
  const dispatch = useDispatch();
  const { selectedWarehouse } = useSelector(settingsState);
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
  const { getLPNData } = useGetLPNData(
    filteredRowsRef,
    originalRowsRef,
    setUpdatedRows
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    unsavedRowsRef.current = {};
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSaveAll = () => {
    if (Object.keys(unsavedRowsRef.current).length !== 0) {
      for (const rowKey in unsavedRowsRef.current) {
        originalRowsRef.current.splice(Number(rowKey), 1);
      }
      unsavedRowsRef.current = {};
      setPage(0);
      dispatch(openNotification({ message: "Saved all successfully!" }));
      setSaveAllCounter(saveAllCounter + 1);
      handleFilter();
    }
  };

  const handleRowUpdate = (i) => {
    delete unsavedRowsRef.current[i];
    originalRowsRef.current.splice(i, 1);
    setPage(0);
    handleFilter();
  };

  const handleClearFilters = () => {
    filteredRowsRef.current = [...originalRowsRef.current];
    setSort(null);
    setSortOrder(SortOrders.asc);
    setFilters([]);
  };

  const handleFilter = (currentFilters = filters) => {
    let temp = [...originalRowsRef.current];

    for (const filterKey in currentFilters) {
      if (currentFilters[filterKey]) {
        temp = temp.filter((row) => {
          if (typeof row[filterKey] === "string") {
            if (
              filterKey === "manufacturedDate" ||
              filterKey === "expirationDate" ||
              filterKey === "consumptionPriorityDate"
            ) {
              if (!row[filterKey]) {
                return false;
              }

              const date = row[filterKey].split("T")[0].split("-");

              return `${date[1]}/${date[2]}/${date[0]}`.includes(
                currentFilters[filterKey].toLowerCase()
              );
            }

            return row[filterKey]
              .toLowerCase()
              .includes(currentFilters[filterKey].toLowerCase());
          }

          return row[filterKey] === Number(currentFilters[filterKey]);
        });
      }
    }

    filteredRowsRef.current = temp;
    unsavedRowsRef.current = {};

    if (sort) {
      temp = temp.sort(getComparator(sortOrder, sort));
    }

    setUpdatedRows(temp);
  };

  useEffect(() => {
    const resizeListener = () =>
      setTableHeight(window.innerHeight - appBarHeight - 40 - 135);

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  useEffect(() => {
    getLPNData();
  }, [selectedWarehouse]);

  useEffect(() => {
    if (sort === null) {
      setUpdatedRows(filteredRowsRef.current);
    } else {
      setUpdatedRows(
        [...filteredRowsRef.current].sort(getComparator(sortOrder, sort))
      );
    }
  }, [sort, sortOrder]);
  console.log(unsavedRowsRef.current);
  console.log(formatObjectToArray(unsavedRowsRef.current));
  return (
    <PageLayout>
      <Grid container direction="column" pt={2} pl={5}>
        <Grid container alignItems="center">
          <WarehousePicker mb={1} />
          <RouteChip
            icon={CheckCircleOutline}
            label="LPN Date Check"
            sx={{ ml: 2 }}
          />
          <BackButton sx={{ ml: 2 }} />
        </Grid>
        <TableContainer sx={{ height: tableHeight }}>
          <Table stickyHeader aria-label="sticky table">
            <LPNDateTableHead
              sort={sort}
              setSort={setSort}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              filters={filters}
              setFilters={setFilters}
              onFilter={handleFilter}
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
          <Fade in={Object.keys(filters).length || sort}>
            <Button variant="contained" sx={{ m: 1 }} onClick={handleClearFilters}>
              Clear Changes
            </Button>
          </Fade>
          <Button
            variant="contained"
            endIcon={<SaveOutlined />}
            sx={{ m: 1, mr: 2 }}
            onClick={handleSaveAll}
          >
            Save All
          </Button>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default LPNDateCheckPage;

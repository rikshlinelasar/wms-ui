import { CheckCircleOutline, SaveOutlined } from "@mui/icons-material";
import { Button, Fade, Grid, TableContainer, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import LPNDateTableHead from "../../components/LPNDateTableHead/LPNDateTableHead";
import LPNDateTableRow from "../../components/LPNDateTableRow/LPNDateTableRow";
import PageLayout from "../../components/PageLayout/PageLayout";
import WarehousePicker from "../../components/WarehousePicker/WarehousePicker";
import rows from "../../utilities/constants/rows";
import { SortOrders } from "../../utilities/constants/sort";
import { formatObjectToArray } from "../../utilities/functions/format";
import { getComparator } from "../../utilities/functions/sort";
import useGetLPNData from "../../hooks/useGetLPNData";
import usePostAdjustAll from "../../hooks/usePostAdjustAll";
import { openNotification } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";
import { APP_BAR_HEIGHT } from "../../styles/styles";

const LPNDateCheckPage = () => {
  const dispatch = useDispatch();
  const tableContainerRef = useRef();
  const { postAdjustAll } = usePostAdjustAll();
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
    window.innerHeight - APP_BAR_HEIGHT - 40 - 135
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
    tableContainerRef.current.scrollTo({
      top: 0,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSaveAll = () => {
    if (Object.keys(unsavedRowsRef.current).length !== 0) {
      postAdjustAll(
        {
          lpnMultiAdjustRequest: formatObjectToArray(unsavedRowsRef.current),
          location: selectedWarehouse,
        },
        (data) => {
          const report = [];
          const successRowsIds = [];

          data.lpnSingleAdjustResponse.forEach(
            ({ sourceContainerId, isSuccess, statusMessage }) => {
              report.push({
                message: `${sourceContainerId} ${
                  isSuccess ? "Saved successfully!" : statusMessage
                }`,
                isSuccess,
                status: isSuccess ? "Success" : "Error",
              });

              if (isSuccess) {
                successRowsIds.push(sourceContainerId);
              }
            }
          );
          unsavedRowsRef.current = {};
          successRowsIds.forEach((id) => {
            const index = originalRowsRef.current.findIndex(
              ({ ilpnId }) => ilpnId === id
            );
            if (index > 0) {
              originalRowsRef.current.splice(index, 1);
            }
          });
          setSaveAllCounter(saveAllCounter + 1);
          dispatch(openNotification({ title: "Report", message: report }));
          setPage(0);
          handleFilter();
        }
      );
    } else {
      dispatch(
        openNotification({ title: "Error", message: "There is nothing to save!" })
      );
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
    setFilters({});
    setUpdatedRows(originalRowsRef.current);
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
      setTableHeight(window.innerHeight - APP_BAR_HEIGHT - 40 - 135);

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  useEffect(() => {
    getLPNData();
    setSaveAllCounter(saveAllCounter + 1);
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

  return (
    <PageLayout>
      <Grid container direction="column" pt={2} pl={5}>
        <Grid container alignItems="center">
          <WarehousePicker sx={{ mb: 0.5, mt: 0.5 }} />
          <Breadcrumbs
            icon={CheckCircleOutline}
            label="iLPN Date Check"
            sx={{ ml: 2 }}
          />
        </Grid>
        <TableContainer ref={tableContainerRef} sx={{ height: tableHeight }}>
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
              {(() => {
                const paginatedRows = updatedRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                );

                return paginatedRows.length === 0 ? (
                  <Grid
                    container
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      marginTop: 5,
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: 220,
                    }}
                  >
                    <Typography variant="h4">No records to display</Typography>
                  </Grid>
                ) : (
                  paginatedRows.map((row, i) => (
                    <LPNDateTableRow
                      key={row.ilpnId}
                      unsavedRowsRef={unsavedRowsRef}
                      row={row}
                      index={i}
                      saveAllCounter={saveAllCounter}
                      onRowUpdate={handleRowUpdate}
                    />
                  ))
                );
              })()}
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
        <Grid container justifyContent="flex-end">
          <Fade in={Object.keys(filters).length || sort}>
            <Button variant="contained" sx={{ m: 1 }} onClick={handleClearFilters}>
              Clear Sort/Filter
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

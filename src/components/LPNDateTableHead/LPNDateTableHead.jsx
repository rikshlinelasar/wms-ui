import { FilterAltOutlined } from "@mui/icons-material";
import {
  Button,
  Fade,
  Grid,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import RotatableArrowUpward from "../../components-styled/RotatableArrowUpward/RotatableArrowUpward";
import columns from "../../constants/lpn-date-table-columns";
import { SortOrders } from "../../constants/sort";

const LPNDateTableHead = ({
  filtersLengthRef,
  sort,
  setSort,
  sortOrder,
  setSortOrder,
  filters,
  setFilters,
  onFilter,
  onClearFilters,
}) => {
  const [activeFilters, setActiveFilters] = useState({});

  const handleResetSort = () => {
    setSort(null);
    setSortOrder(SortOrders.asc);
  };

  const handleSort = (id) => {
    if (sort !== id) {
      setSort(id);
      setSortOrder(SortOrders.asc);
    } else if (sortOrder === SortOrders.asc) {
      setSortOrder(SortOrders.desc);
    } else {
      handleResetSort();
    }
  };

  const handleFilterChange = (e, id) => {
    if (!e.target.value) {
      setActiveFilters({ ...activeFilters, [id]: false });
      delete filters[id];
      setFilters({ ...filters });
    } else {
      if (!filters[id]) {
        filtersLengthRef.current += 1;
      }
      setFilters({ ...filters, [id]: e.target.value });
    }
  };

  const handleFilter = (id) => {
    if (filters[id]) {
      setActiveFilters({ ...activeFilters, [id]: true });
      onFilter(id);
    }
  };

  const handleClearFilters = () => {
    onClearFilters();
    setActiveFilters({});
  };

  return (
    <TableHead>
      <Fade
        in={filtersLengthRef.current || sort}
        sx={{ position: "fixed", right: 0, zIndex: 3, mr: 2, mt: 2 }}
      >
        <Button size="small" variant="contained" onClick={handleClearFilters}>
          Clear
        </Button>
      </Fade>
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
                <Grid container>
                  <Grid item xs={8} sx={{ height: 75 }}>
                    {column.label}
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton
                      color={sort === column.id ? "primary" : undefined}
                      size="small"
                      sx={{ marginLeft: "2px", width: 24, height: 24 }}
                      onClick={() => handleSort(column.id)}
                    >
                      <RotatableArrowUpward
                        fontSize="small"
                        open={sort === column.id && sortOrder === SortOrders.desc}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container flexDirection="row" alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      size="small"
                      inputProps={{ sx: { p: 0.2, pl: 0.5, pr: 0.5 } }}
                      value={filters[column.id] || ""}
                      onChange={(e) => handleFilterChange(e, column.id)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton
                      color={activeFilters[column.id] ? "primary" : undefined}
                      size="small"
                      sx={{ marginLeft: "2px", width: 24, height: 24 }}
                      onClick={() => handleFilter(column.id)}
                    >
                      <FilterAltOutlined fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

LPNDateTableHead.propTypes = {
  sort: PropTypes.string,
  setSort: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  filtersLengthRef: PropTypes.object.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default LPNDateTableHead;

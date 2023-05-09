import { FilterAltOutlined } from "@mui/icons-material";
import {
  Checkbox,
  colors,
  Divider,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";

const TransferList = ({
  title,
  label,
  items,
  selected,
  onSelect,
  onSelectAll,
  renderBy,
  valueBy,
  ...props
}) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => setFilter(e.target.value);

  const renderItems = () =>
    items
      .filter((item) => {
        let value = item;

        if (renderBy) {
          value = item[renderBy];
        }

        return value.toLowerCase().includes(filter.toLowerCase());
      })
      .map((item, i) => {
        let [value, text] = [item, item];

        if (renderBy) {
          text = item[renderBy];
        }
        if (valueBy) {
          value = item[valueBy];
        }

        return (
          <Fragment key={value}>
            <Divider />
            <ListItemButton role="listitem" onClick={() => onSelect(i)}>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <Checkbox checked={selected.indexOf(value) !== -1} />
                </Grid>
                <Grid item>
                  <ListItemText primary={text} />
                </Grid>
              </Grid>
            </ListItemButton>
          </Fragment>
        );
      });

  return (
    <Grid container {...props}>
      <Typography color="primary" fontWeight="500" mb={1}>
        {title}
      </Typography>
      <Grid
        item
        sx={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          pt: 3,
          backgroundColor: colors.grey[100],
        }}
      >
        <Grid item>
          <Grid container>
            <Grid item xs={2} />
            <Grid item>
              <Typography color="primary" fontWeight="600" ml={0.5}>
                {label}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" mt={1}>
            <Grid item xs={2}>
              <Checkbox
                checked={selected.length === items.length}
                onChange={onSelectAll}
                sx={{ ml: 2 }}
              />
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    size="small"
                    inputProps={{
                      sx: { p: 0.5 },
                    }}
                    InputProps={{
                      endAdornment: <FilterAltOutlined color="primary" />,
                    }}
                    onChange={handleFilterChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <List dense component="div" role="list">
            {renderItems()}
            {items.length !== 0 ? <Divider /> : null}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

TransferList.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  renderBy: PropTypes.string,
  valueBy: PropTypes.string,
};

export default TransferList;

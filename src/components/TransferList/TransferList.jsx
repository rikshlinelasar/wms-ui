import { ListItemButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import React, { useMemo, useState } from "react";

import SquareButton from "../../components-styled/SquareButton/SquareButton";
import { selectColor } from "../../styles/styles";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const TransferList = (props) => {
  const [selected, setSelected] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);
  const leftSelected = useMemo(() => intersection(selected, left), [selected, left]);
  const rightSelected = useMemo(
    () => intersection(selected, right),
    [selected, right]
  );

  const handleToggle = (value) => () => {
    const currentIndex = selected.indexOf(value);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const handleSelectedRight = () => {
    setRight(right.concat(leftSelected));
    setLeft(not(left, leftSelected));
    setSelected(not(selected, leftSelected));
  };

  const handleSelectedLeft = () => {
    setLeft(left.concat(rightSelected));
    setRight(not(right, rightSelected));
    setSelected(not(selected, rightSelected));
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper
      sx={(theme) => ({
        width: 200,
        height: 230,
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
          width: 150,
        },
      })}
    >
      <List dense component="div" role="list">
        {items.map((value) => (
          <ListItemButton
            key={value}
            role="listitem"
            sx={
              selected.indexOf(value) !== -1
                ? {
                    backgroundColor: selectColor,
                    ["&:hover"]: {
                      backgroundColor: selectColor,
                    },
                  }
                : undefined
            }
            onClick={handleToggle(value)}
          >
            <ListItemText primary={`List item ${value + 1}`} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );

  return (
    <Grid container gap={2} alignItems="center" {...props}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <SquareButton
            variant="outlined"
            size="small"
            aria-label="move all right"
            disabled={left.length === 0}
            sx={{ my: 0.5 }}
            onClick={handleAllRight}
          >
            ≫
          </SquareButton>
          <SquareButton
            variant="outlined"
            size="small"
            aria-label="move selected right"
            disabled={leftSelected.length === 0}
            sx={{ my: 0.5 }}
            onClick={handleSelectedRight}
          >
            &gt;
          </SquareButton>
          <SquareButton
            variant="outlined"
            size="small"
            aria-label="move selected left"
            disabled={rightSelected.length === 0}
            sx={{ my: 0.5 }}
            onClick={handleSelectedLeft}
          >
            &lt;
          </SquareButton>
          <SquareButton
            variant="outlined"
            size="small"
            aria-label="move all left"
            disabled={right.length === 0}
            sx={{ my: 0.5 }}
            onClick={handleAllLeft}
          >
            ≪
          </SquareButton>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
};

export default TransferList;

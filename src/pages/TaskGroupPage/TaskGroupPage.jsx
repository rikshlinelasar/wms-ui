import { Button, Grid, Typography } from "@mui/material";
import React from "react";

import PageLayout from "../../components/PageLayout/PageLayout";
import TransferList from "../../components/TransferList/TransferList";
import WarehousePicker from "../../components/WarehousePicker/WarehousePicker";

const TaskGroupPage = () => {
  return (
    <PageLayout>
      <Grid container direction="column" pt={2} pl={3} pb={2}>
        <WarehousePicker mb={2} />
        <Typography fontWeight="500" color="primary" mb={2}>
          Choose the User:
        </Typography>
        <TransferList mt={1} mb={2} />
        <Typography fontWeight="500" color="primary" mb={2}>
          Choose the Group:
        </Typography>
        <TransferList mt={1} mb={2} />
        <Grid container gap={2}>
          <Button variant="contained">Add TG</Button>
          <Button variant="contained">Delete TG</Button>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default TaskGroupPage;

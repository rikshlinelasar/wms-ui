import { Grid } from "@mui/material";
import React, { useEffect } from "react";

import HomeMenuItem from "../../components/HomeMenuItem/HomeMenuItem";
import PageLayout from "../../components/PageLayout/PageLayout";
import WarhousePicker from "../../components/WarehousePicker/WarehousePicker";
import { LPN_DATE_CHECK_ROUTE, TASK_GROUP_ROUTE } from "../../constants/routes";
import useGetWarehouseLocations from "../../hooks/useGetWarehouseLocations";

const HomePage = () => {
  const { getWarehouseLocations } = useGetWarehouseLocations();

  useEffect(() => {
    getWarehouseLocations();
  }, []);

  return (
    <PageLayout>
      <Grid container pl={5} pt={2} pr={1}>
        <WarhousePicker />
        <Grid container pt={2} spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <HomeMenuItem
              to={LPN_DATE_CHECK_ROUTE}
              label="LPN Date Check"
              description="User can updat the iLPN Date."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <HomeMenuItem
              to={TASK_GROUP_ROUTE}
              label="Task Group"
              description="Task Group Eligibility."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <HomeMenuItem
              to={LPN_DATE_CHECK_ROUTE}
              label="ORDER TYPE UI"
              description="Order Type 1 to Order Type 2 (Demand Order Type to Standard Order Type)."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <HomeMenuItem
              to={LPN_DATE_CHECK_ROUTE}
              label="ITEM ATTRIB UI"
              description="Items Missing Attributes - Capture Item Attributes UI"
            />
          </Grid>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default HomePage;

import React, { useEffect } from "react";

import PageLayout from "../../components/PageLayout/PageLayout";
import useGetWarehouseLocations from "../../hooks/useGetWarehouseLocations";
import WarhousePicker from "../../components/WarehousePicker/WarehousePicker";
import { Grid } from "@mui/material";
import HomeMenuItem from "../../components/HomeMenuItem/HomeMenuItem";
import { LPN_DATE_CHECK_ROUTE, TASK_GROUP_ROUTE } from "../../constants/routes";

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
              description="Lorem ipsum dolor init Lorem ipsum dolor init Lorem ipsum dolor init Lorem ipsum dolor init Lorem."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <HomeMenuItem
              to={TASK_GROUP_ROUTE}
              label="Task Group"
              description="Lorem ipsum dolor init Lorem ipsum dolor init Lorem ipsum dolor init Lorem ipsum dolor init Lorem."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <HomeMenuItem
              to={LPN_DATE_CHECK_ROUTE}
              label="LPN Date Check"
              description="Lorem ipsum dolor init Lorem ipsum dolor init Lorem ipsum dolor init Lorem ipsum dolor init Lorem."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <HomeMenuItem
              to={LPN_DATE_CHECK_ROUTE}
              label="LPN Date Check"
              description="Lorem ipsum dolor init Lorem ipsum dolor init Lorem ipsum dolor init Lorem ipsum dolor init Lorem."
            />
          </Grid>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default HomePage;

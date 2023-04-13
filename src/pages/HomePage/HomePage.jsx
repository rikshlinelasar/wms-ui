import React, { useEffect } from "react";

import PageLayout from "../../components/PageLayout/PageLayout";
import useGetWarehouseLocations from "../../hooks/useGetWarehouseLocations";

const HomePage = () => {
  const { getWarehouseLocations } = useGetWarehouseLocations();
  useEffect(() => {
    getWarehouseLocations();
  }, [])

  return <PageLayout></PageLayout>;
};

export default HomePage;

import PropTypes from "prop-types";
import React, { useEffect } from "react";

import NotificationModal from "../../components/NotificationModal/NotificationModal";
import AppLoader from "../AppLoader/AppLoader";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { settingsState } from "../../redux/store";
import useGetWarehouseLocations from "../../hooks/useGetWarehouseLocations";

const PageLayout = (props) => {
  const { warehouses } = useSelector(settingsState);
  const { getWarehouseLocations } = useGetWarehouseLocations();

  useEffect(() => {
    if (warehouses.length === 0) {
      getWarehouseLocations();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <AppLoader />
      <NotificationModal />
      <main {...props} />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;

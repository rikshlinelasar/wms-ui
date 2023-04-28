import PropTypes from "prop-types";
import React from "react";

import NotificationModal from "../../components/NotificationModal/NotificationModal";
import AppLoader from "../AppLoader/AppLoader";
import NavBar from "../NavBar/NavBar";

const PageLayout = (props) => (
  <div>
    <NavBar />
    <AppLoader />
    <NotificationModal />
    <main {...props} />
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;

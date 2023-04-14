import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import NotificationModal from "../../components/NotificationModal/NotificationModal";
import { authState } from "../../redux/store";
import AppLoader from "../AppLoader/AppLoader";
import NavBar from "../NavBar/NavBar";

const PageLayout = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector(authState);

  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // }
  }, [user, navigate]);

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

import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Main from "../../components-styled/Main/Main";
import { authState, settingsState } from "../../redux/store";
import AppDrawer from "../AppDrawer/AppDrawer";
import AppSnackBar from "../AppSnackBar/AppSnackBar";
import NavBar from "../NavBar/NavBar";

const PageLayout = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector(authState);
  const { isDrawerOpen } = useSelector(settingsState);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <NavBar />
      <AppSnackBar />
      <AppDrawer />
      <Main open={isDrawerOpen} {...props} />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageLayout;

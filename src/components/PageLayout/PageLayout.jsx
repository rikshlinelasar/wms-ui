import { ChevronRight } from "@mui/icons-material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import DrawerIconButton from "../../components-styled/DrawerIconButton/DrawerIconButton";
import Main from "../../components-styled/Main/Main";
import { toggleDrawer } from "../../redux/reducers/settingsSlice";
import { authState, settingsState } from "../../redux/store";
import AppDrawer from "../AppDrawer/AppDrawer";
import NavBar from "../NavBar/NavBar";

const PageLayout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authState);
  const { isDrawerOpen } = useSelector(settingsState);

  const handleDrawerToggle = () => dispatch(toggleDrawer());

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <NavBar />
      <AppDrawer />
      <DrawerIconButton
        isOpen={isDrawerOpen}
        size="large"
        color="primary"
        onClick={handleDrawerToggle}
      >
        <ChevronRight />
      </DrawerIconButton>
      <Main isOpen={isDrawerOpen} {...props} />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageLayout;

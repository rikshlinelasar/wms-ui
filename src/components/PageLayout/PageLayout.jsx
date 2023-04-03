import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { settingsState } from "../../redux/store";
import NavBar from "../NavBar/NavBar";

const PageLayout = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector(settingsState);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
};

export default PageLayout;

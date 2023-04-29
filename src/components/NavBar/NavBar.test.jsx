/* eslint-disable no-undef */
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import NavBar from "./NavBar";

describe("NavBar Component", () =>
  test("NavBar action", () => {
    const history = createMemoryHistory({ initialEntries: ["/lpn-date-check"] });
    const { getByAltText, getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>
    );
    expect(history.location.pathname).toBe("/lpn-date-check");
    const logoButton = getByAltText("logo");
    fireEvent.click(logoButton);
    expect(history.location.pathname).toBe("/");
    history.push("/lpn-date-check");
    const logoTextButton = getByTestId("logo-text-link");
    fireEvent.click(logoTextButton);
    expect(history.location.pathname).toBe("/");
  }));

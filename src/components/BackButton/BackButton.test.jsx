/* eslint-disable no-undef */
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import BackButton from "./BackButton";

describe("BackButton Component", () =>
  test("BackButton action", () => {
    const history = createMemoryHistory({ initialEntries: ["/lpn-date-check"] });
    const { getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <BackButton />
      </Router>
    );
    expect(history.location.pathname).toBe("/lpn-date-check");
    const button = getByTestId("navigate-home");
    fireEvent.click(button);
    expect(history.location.pathname).toBe("/");
  }));

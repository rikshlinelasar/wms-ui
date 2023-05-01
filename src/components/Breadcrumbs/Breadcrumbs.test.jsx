/* eslint-disable no-undef */
import { TextSnippet } from "@mui/icons-material";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import ShallowRenderer from "react-shallow-renderer";

import Breadcrumbs from "./Breadcrumbs";

describe("Breadcrumbs Component", () =>
  test("Breadcrumbs rendering", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <Breadcrumbs label="test" icon={TextSnippet} />
      </Router>
    );
    const chip = getByTestId("route-chip");
    const backButton = getByTestId("navigate-home");
    expect(chip).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  }));

describe("Breadcrumbs Component", () =>
  test("Breadcrumbs snapshot", () => {
    const renderer = new ShallowRenderer();
    const history = createMemoryHistory({ initialEntries: ["/lpn-date-check"] });
    renderer.render(
      <Router location={{ ...history.location, key: "1" }}>
        <Breadcrumbs label="test" icon={TextSnippet} />
      </Router>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

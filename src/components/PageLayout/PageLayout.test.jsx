/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import ShallowRenderer from "react-shallow-renderer";

import { store } from "../../redux/store";
import PageLayout from "./PageLayout";

describe("PageLayout Component", () =>
  test("PageLayout render", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { container, queryByTestId, getByAltText } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <PageLayout />
        </Router>
      </Provider>
    );
    const loader = queryByTestId("application-loader");
    const modal = queryByTestId("notification-modal");
    const logo = getByAltText("logo");
    const header = container.getElementsByTagName("h2")[0];
    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(modal).toBeNull();
  }));

describe("PageLayout Component", () =>
  test("PageLayout snapshot", () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Provider store={store}>
        <Router location={{ ...history.location, key: "1" }}>
          <PageLayout />
        </Router>
      </Provider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

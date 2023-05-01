/* eslint-disable no-undef */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import ShallowRenderer from "react-shallow-renderer";

import settingsReducer from "../../redux/reducers/settingsSlice";
import { store } from "../../redux/store";
import AppLoader from "./AppLoader";

describe("AppLoader Component", () =>
  test("AppLoader not rendering", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <AppLoader />
      </Provider>
    );
    const loader = queryByTestId("application-loader");
    expect(loader).toBeNull();
  }));

describe("AppLoader Component", () =>
  test("AppLoader rendering depending on isAppLoading", () => {
    const { getByTestId } = render(
      <Provider
        store={configureStore({
          reducer: combineReducers({
            settingsReducer: settingsReducer,
          }),
          preloadedState: {
            settingsReducer: {
              isAppLoading: true,
              isLoading: false,
            },
          },
        })}
      >
        <AppLoader />
      </Provider>
    );
    const loader = getByTestId("application-loader");
    expect(loader).toBeInTheDocument();
  }));

describe("AppLoader Component", () =>
  test("AppLoader rendering depending on isLoading", () => {
    const { getByTestId } = render(
      <Provider
        store={configureStore({
          reducer: combineReducers({
            settingsReducer: settingsReducer,
          }),
          preloadedState: {
            settingsReducer: {
              isAppLoading: false,
              isLoading: true,
            },
          },
        })}
      >
        <AppLoader />
      </Provider>
    );
    const loader = getByTestId("application-loader");
    expect(loader).toBeInTheDocument();
  }));

describe("AppLoader Component", () =>
  test("AppLoader snapshot", () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Provider store={store}>
        <AppLoader />
      </Provider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

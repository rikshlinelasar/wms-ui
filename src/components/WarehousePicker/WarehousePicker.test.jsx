/* eslint-disable no-undef */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import settingsReducer from "../../redux/reducers/settingsSlice";
import { store } from "../../redux/store";
import WarehousePicker from "./WarehousePicker";

describe("WarehousePicker Component", () =>
  test("WarehousePicker with empty warehouses rendering", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <WarehousePicker />
      </Provider>
    );
    const menuItem = queryByText("Choose Warehouse");
    expect(menuItem).toBeInTheDocument();
  }));

describe("WarehousePicker Component", () =>
  test("WarehousePicker with warehouses rendering", () => {
    const { queryByText, queryByTestId } = render(
      <Provider
        store={configureStore({
          reducer: combineReducers({
            settingsReducer: settingsReducer,
          }),
          preloadedState: {
            settingsReducer: {
              warehouses: [{ warehouseShortName: "test" }],
            },
          },
        })}
      >
        <WarehousePicker />
      </Provider>
    );
    const select = queryByTestId("warehouse-select");
    const defaultMenuItem = queryByText("Choose Warehouse");
    expect(defaultMenuItem).toBeNull();
    expect(select).toBeInTheDocument();
  }));

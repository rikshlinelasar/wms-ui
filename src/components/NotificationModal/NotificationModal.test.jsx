/* eslint-disable no-undef */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import settingsReducer from "../../redux/reducers/settingsSlice";
import { store } from "../../redux/store";
import NotificationModal from "./NotificationModal";

describe("NotificationModal Component", () =>
  test("NotificationModal not rendering", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <NotificationModal />
      </Provider>
    );
    const modal = queryByTestId("notification-modal");
    expect(modal).toBeNull();
  }));

describe("NotificationModal Component", () =>
  test("NotificationModal rendering depending on isAppLoading", () => {
    const { getByTestId } = render(
      <Provider
        store={configureStore({
          reducer: combineReducers({
            settingsReducer: settingsReducer,
          }),
          preloadedState: {
            settingsReducer: {
              notification: {
                isOpen: true,
                title: "",
                message: null,
              },
            },
          },
        })}
      >
        <NotificationModal />
      </Provider>
    );
    const loader = getByTestId("notification-modal");
    expect(loader).toBeInTheDocument();
  }));

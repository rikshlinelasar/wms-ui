/* eslint-disable no-undef */
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../redux/store";
import LPNDateTableRow from "./LPNDateTableRow";

describe("LPNDateTableRow Component", () =>
  test("LPNDateTableRow action", () => {
    const onRowUpdate = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <LPNDateTableRow
            row={{}}
            index={0}
            unsavedRowsRef={{}}
            onRowUpdate={onRowUpdate}
            saveAllCounter={0}
          />
        </LocalizationProvider>
      </Provider>
    );
    const saveButton = container.getElementsByTagName("button")[0];
    fireEvent.click(saveButton);
    expect(onRowUpdate).not.toBeCalled();
  }));

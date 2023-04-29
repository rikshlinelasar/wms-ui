/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import RowReportNotification from "./RowReportNotification";

describe("RowReportNotification Component", () =>
  test("RowReportNotification render", () => {
    const { getByText } = render(
      <RowReportNotification status="status" message="message" />
    );
    const status = getByText("status");
    const message = getByText("message");
    expect(status).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  }));

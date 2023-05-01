/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";
import ShallowRenderer from "react-shallow-renderer";

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

describe("RowReportNotification Component", () =>
  test("RowReportNotification snapshot", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<RowReportNotification status="status" message="message" />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

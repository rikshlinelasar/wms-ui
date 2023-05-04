/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";
import ShallowRenderer from "react-shallow-renderer";

import ReportNotification from "./ReportNotification";

describe("ReportNotification Component", () =>
  test("ReportNotification render", () => {
    const { getByText } = render(
      <ReportNotification status="status" message="message" />
    );
    const status = getByText("status");
    const message = getByText("message");
    expect(status).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  }));

describe("ReportNotification Component", () =>
  test("ReportNotification snapshot", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<ReportNotification status="status" message="message" />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

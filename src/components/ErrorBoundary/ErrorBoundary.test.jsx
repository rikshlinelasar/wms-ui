/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary Component", () => {
  test("ErrorBoundary rendering", () => {
    const ThrowError = () => {
      throw new Error("Error!");
    };
    const { getByTestId } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(getByTestId("error-boundary")).toBeInTheDocument();
  });
});

describe("ErrorBoundary Component", () =>
  test("ErrorBoundary snapshot", () => {
    const renderer = new ShallowRenderer();
    const ThrowError = () => {
      throw new Error("Error!");
    };
    renderer.render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

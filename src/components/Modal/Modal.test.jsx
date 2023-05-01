/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";
import ShallowRenderer from "react-shallow-renderer";

import Modal from "./Modal";

describe("Modal Component", () =>
  test("Modal not rendering", () => {
    const onClose = jest.fn();
    const { queryByTestId } = render(<Modal isOpen={false} onClose={onClose} />);
    const modal = queryByTestId("modal");
    expect(modal).toBeNull();
  }));

describe("Modal Component", () =>
  test("Modal rendering", () => {
    const onClose = jest.fn();
    const { queryByTestId } = render(<Modal isOpen={true} onClose={onClose} />);
    const modal = queryByTestId("modal");
    expect(modal).toBeInTheDocument();
  }));

describe("Modal Component", () =>
  test("Modal snapshot", () => {
    const onClose = jest.fn();
    const renderer = new ShallowRenderer();
    renderer.render(<Modal isOpen={true} onClose={onClose} />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

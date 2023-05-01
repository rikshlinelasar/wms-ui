/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";
import ShallowRenderer from "react-shallow-renderer";

import ModalTitle from "./ModalTitle";

describe("ModalTitle Component", () =>
  test("ModalTitle rendering", () => {
    const onClose = jest.fn();
    const { queryByText } = render(<ModalTitle title="test" onClose={onClose} />);
    const modalTitle = queryByText("test");
    expect(modalTitle).toBeInTheDocument();
  }));

describe("ModalTitle Component", () =>
  test("ModalTitle snapshot", () => {
    const onClose = jest.fn();
    const renderer = new ShallowRenderer();
    renderer.render(<ModalTitle title="test" onClose={onClose} />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

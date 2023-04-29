/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import ModalTitle from "./ModalTitle";

describe("ModalTitle Component", () =>
  test("ModalTitle rendering", () => {
    const onClose = jest.fn();
    const { queryByText } = render(<ModalTitle title="test" onClose={onClose} />);
    const modalTitle = queryByText("test");
    expect(modalTitle).toBeInTheDocument();
  }));

/* eslint-disable no-undef */
import { TextSnippet } from "@mui/icons-material";
import { render } from "@testing-library/react";
import React from "react";

import RouteChip from "./RouteChip";

describe("RouteChip Component", () =>
  test("RouteChip render", () => {
    const { getByText } = render(<RouteChip label="test" icon={TextSnippet} />);
    const chip = getByText("test");
    expect(chip).toBeInTheDocument();
  }));

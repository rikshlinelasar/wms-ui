/* eslint-disable no-undef */
import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import React from "react";
import ShallowRenderer from "react-shallow-renderer";

import theme from "../../styles/theme";
import ElevationScroll from "./ElevationScroll";

describe("ElevationScroll Component", () =>
  test("ElevationScroll snapshot", () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <ThemeProvider theme={theme}>
        <ElevationScroll>
          <Button>Hello</Button>
        </ElevationScroll>
      </ThemeProvider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

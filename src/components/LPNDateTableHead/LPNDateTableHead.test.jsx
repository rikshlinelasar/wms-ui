/* eslint-disable no-undef */
import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { SortOrders } from "../../utilities/constants/sort";
import LPNDateTableHead from "./LPNDateTableHead";

describe("LPNDateTableHead Component", () =>
  test("LPNDateTableHead action", () => {
    const setSort = jest.fn();
    const setSortOrder = jest.fn();
    const setFilters = jest.fn();
    const onFilter = jest.fn();
    const { container } = render(
      <table>
        <LPNDateTableHead
          setSort={setSort}
          sortOrder={SortOrders.asc}
          setSortOrder={setSortOrder}
          filters={{}}
          setFilters={setFilters}
          onFilter={onFilter}
        />
      </table>
    );
    const sortButton = container.getElementsByTagName("button")[0];
    fireEvent.click(sortButton);
    expect(setSort).toBeCalled();
    expect(setSortOrder).toBeCalled();
    const filterInput = container.getElementsByTagName("input")[0];
    fireEvent.change(filterInput, { target: { value: "a" } });
    expect(setFilters).toBeCalled();
    expect(onFilter).toBeCalled();
  }));

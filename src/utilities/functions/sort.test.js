/* eslint-disable no-undef */
import { SortOrders } from "../constants/sort";
import { descendingComparator, getComparator } from "./sort";

describe("descendingComparator", () =>
  test("descendingComparator order", () => {
    const testObj = {
      test: "hello",
    };
    const testObj2 = {
      test: "aeee",
    };
    const order = descendingComparator(testObj, testObj2, "test");
    const order2 = descendingComparator(testObj2, testObj, "test");
    const order3 = descendingComparator(testObj2, testObj2, "test");

    expect(order).toEqual(-1);
    expect(order2).toEqual(1);
    expect(order3).toEqual(0);
  }));

describe("getComparator", () =>
  test("getComparator order", () => {
    const testObj = {
      test: "hello",
    };
    const testObj2 = {
      test: "aeee",
    };
    const ascComparator = getComparator(SortOrders.asc, "test");
    const descComparator = getComparator(SortOrders.desc, "test");
    const order = ascComparator(testObj, testObj2);
    const order2 = descComparator(testObj2, testObj);

    expect(order).toEqual(1);
    expect(order2).toEqual(1);
  }));

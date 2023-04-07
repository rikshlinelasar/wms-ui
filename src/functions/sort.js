import { SortOrders } from "../constants/sort";

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy] || (!b[orderBy] && a[orderBy])) {
    return -1;
  }
  if (b[orderBy] > a[orderBy] || (!a[orderBy] && b[orderBy])) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) =>
  order === SortOrders.desc
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

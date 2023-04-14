export const getDateFromPicker = (value) =>
  `${value["$y"]}-${value["$M"] + 1}-${value["$D"]}`;

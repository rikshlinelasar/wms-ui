export const getDateFromPicker = (value) =>
  `${value["$y"]}-${(value["$M"] + 2).toString().padStart(2, "0")}-${value["$D"]
    .toString()
    .padStart(2, "0")}`;

export const getDateFromPicker = (value) =>
  `${value["$y"]}-${(value["$M"] + 1).toString().padStart(2, "0")}-${value["$D"]
    .toString()
    .padStart(2, "0")}`;

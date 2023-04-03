const columns = [
  { id: "item", label: "Item", minWidth: 70 },
  { id: "itemDescription", label: "Item Description", minWidth: 150 },
  { id: "lpnId", label: "LPN ID", minWidth: 120 },
  {
    id: "lpnStatusDescription",
    label: "LPN Status Description",
    minWidth: 120,
  },
  { id: "displayLocation", label: "Display Location", minWidth: 70 },
  {
    id: "lpnQuantity",
    label: "LPN Quantity In Cases",
    minWidth: 120,
    format: (value) => value.toFixed(2),
  },
  { id: "reason", label: "Reason", minWidth: 120 },
  { id: "dateCode", label: "Date Code", minWidth: 70 },
  {
    id: "manufacturingDate",
    label: "Item Track Manufacturing Date",
    minWidth: 100,
  },
  { id: "expiryDate", label: "Item Track Expiry Date", minWidth: 100 },
  { id: "manufactureDateDiff", label: "Manufacture Date Diff", minWidth: 100 },
  { id: "expirationDateDiff", label: "Expiration Date Diff", minWidth: 100 },
  {
    id: "manufacturedDate",
    label: "Manufactured Date",
    minWidth: 200,
    isDate: true,
  },
  {
    id: "expirationDate",
    label: "Expiration Date",
    minWidth: 200,
    isDate: true,
  },
  {
    id: "consumptionPriorityDate",
    label: "Consumption Priority Date",
    minWidth: 200,
    isDate: true,
  },
  { id: "save", isSave: true, minWidth: 40 },
];

export default columns;

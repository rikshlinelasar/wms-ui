const columns = [
  { id: "item", label: "Item", minWidth: 100 },
  { id: "itemDescription", label: "Item Description", minWidth: 150 },
  { id: "lpnId", label: "LPN ID", minWidth: 120 },
  {
    id: "lpnStatusDescription",
    label: "LPN Status Description",
    minWidth: 150,
  },
  { id: "displayLocation", label: "Display Location", minWidth: 100 },
  {
    id: "lpnQuantity",
    label: "LPN Quantity In Cases",
    minWidth: 180,
    format: (value) => value.toFixed(2),
  },
  { id: "reason", label: "Reason", minWidth: 160 },
  { id: "dateCode", label: "Date Code", minWidth: 100 },
  {
    id: "manufacturingDate",
    label: "Item Track Manufacturing Date",
    minWidth: 180,
  },
  { id: "expiryDate", label: "Item Track Expiry Date", minWidth: 140 },
  { id: "manufactureDateDiff", label: "Manufacture Date Diff", minWidth: 160 },
  { id: "expirationDateDiff", label: "Expiration Date Diff", minWidth: 130 },
  {
    id: "manufacturedDate",
    label: "Manufactured Date",
    minWidth: 200,
    isManufactureDate: true,
  },
  {
    id: "expirationDate",
    label: "Expiration Date",
    minWidth: 200,
    isExpirationDate: true,
  },
  {
    id: "consumptionPriorityDate",
    label: "Consumption Priority Date",
    minWidth: 230,
    isPriorityDate: true,
  },
  { id: "save", isSave: true, minWidth: 40 },
];

export default columns;

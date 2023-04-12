const columns = [
  { id: "item", label: "Item", minWidth: 90 },
  { id: "itemDescription", label: "Item Description", minWidth: 140 },
  { id: "lpnId", label: "LPN ID", minWidth: 110 },
  {
    id: "lpnStatusDescription",
    label: "LPN Status Description",
    minWidth: 145,
  },
  { id: "displayLocation", label: "Display Location", minWidth: 95 },
  {
    id: "lpnQuantity",
    label: "LPN Quantity In Cases",
    minWidth: 160,
    format: (value) => value.toFixed(2),
  },
  {
    id: "manufacturedDate",
    label: "Manufactured Date",
    minWidth: 180,
    isManufactureDate: true,
  },
  {
    id: "expirationDate",
    label: "Expiration Date",
    minWidth: 180,
    isExpirationDate: true,
  },
  {
    id: "consumptionPriorityDate",
    label: "Consumption Priority Date",
    minWidth: 210,
    isPriorityDate: true,
  },
  { id: "reason", label: "Reason", minWidth: 150 },
  { id: "dateCode", label: "Date Code", minWidth: 90 },
  {
    id: "manufacturingDate",
    label: "Item Track Manufacturing Date",
    minWidth: 175,
  },
  { id: "expiryDate", label: "Item Track Expiry Date", minWidth: 140 },
  { id: "manufactureDateDiff", label: "Manufacture Date Diff", minWidth: 160 },
  { id: "expirationDateDiff", label: "Expiration Date Diff", minWidth: 130 },
  {
    id: "save",
    isSave: true,
    minWidth: 40,
    sx: {
      position: "sticky",
      right: 0,
    },
  },
];

export default columns;

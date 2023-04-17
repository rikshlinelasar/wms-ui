export const formatRow = (
  row,
  isMftdDateChanged,
  isExpiredDateChanged,
  isCPDChanged,
  manufacturedDate,
  expirationDate,
  consumptionPriorityDate,
  location
) => ({
  lpnSingleAdjustRequest: {
    sourceContainerId: row.ilpnId,
    sourceLocationId: row.locationId,
    itemId: row.itemId,
    quantity: row.lpnQuantityInCases,
    manufacturedDate,
    expirationDate,
    consumptionPriorityDate,
    isMftdDateChanged,
    isExpiredDateChanged,
    isCPDChanged,
  },
  location,
});

export const formatObjectToArray = (obj) => Object.keys(obj).map((key) => obj[key]);

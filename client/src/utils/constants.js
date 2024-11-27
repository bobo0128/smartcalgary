const yearlyRanges = [
  [0, 10],
  [10, 50],
  [50, 100],
  [100, 200],
  [200, 300],
  [300, 400],
  [400, 500],
  [500]
];

const colorSet = [
  "#ffffff",
  "#ccdaee",
  "#99b5dd",
  "#7fa3d5",
  "#6690cc",
  "#326bbb",
  "#0047ab",
  "#0047ab",
  "#053881",
];

const colorSet1 = [
  "#ADD8E6",
  "#B0C4DE",
  "#87CEFA",
  "#1E90FF",
  "#4169E1",
  "#483D8B",
  "#0000CD",
  "#191970",
];

export const mapColorObjYearly = yearlyRanges.map((range, index) => ({
  range,
  color: colorSet[index],
  label: range[1] 
        ? `${range[0]} ≤ Crime Number < ${range[1]}`
        : `${range[0]} ≤ Crime Number`
}));


export const defaultColor = "black";

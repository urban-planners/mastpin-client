const predefinedColors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];

export const generateRegionColors = (
  nRegions: number,
): {
  strokeColor: string;
  fillColor: string;
} => {
  let strokeColor: string;
  let fillColor: string;

  strokeColor = predefinedColors[nRegions % predefinedColors.length];

  fillColor = lightenDarkenColor(strokeColor, 20);

  return { strokeColor, fillColor };
};

// Function to lighten or darken a color
function lightenDarkenColor(color: string, amount: number): string {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

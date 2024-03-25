import html2canvas from "html2canvas";

export const generateMapImage = async () => {
  const element = document.getElementById("map");
  if (!element) return null;

  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    backgroundColor: "transparent",
  });

  return canvas.toDataURL("image/png");
};

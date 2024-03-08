import { PinInfoInterface, RegionInterface } from "../types";

export const getPinTitle = (
  pins: PinInfoInterface[],
  regions: RegionInterface[],
  regionId: string,
) => {
  let counter = pins.length + 1;
  let region = regions.find((region) => region.id === regionId)?.title;
  region = region?.replace(/^Region /, "");
  let title = `${region} - ${counter}`;
  while (true) {
    if (pins.find((pin) => pin.title === title)) {
      counter++;
      title = `${region} - ${counter}`;
      continue;
    }
    break;
  }
  return title;
};

export const getRegionTitle = (regions: RegionInterface[]) => {
  const index = regions.length;
  let suffix = index + 1;
  let prefix = 0;
  if (suffix > 26) {
    prefix = Math.floor(suffix / 26);
    suffix = suffix % 26;
  }
  const charPrefix = (() => {
    if (prefix === 0) return "";
    let temp = "A".repeat(prefix);
    return temp;
  })();

  const charSuffix = String.fromCharCode(65 + suffix - 1);
  let regionTitle = `Region ${charPrefix}${charSuffix}`;

  while (regions.find((region) => region.title === regionTitle)) {
    suffix++;
    if (suffix > 26) {
      prefix = Math.floor(suffix / 26);
      suffix = suffix % 26;
    }
    const charPrefix = (() => {
      if (prefix === 0) return "";
      let temp = "A".repeat(prefix);
      return temp;
    })();
    const charSuffix = String.fromCharCode(65 + suffix - 1);
    regionTitle = `Region ${charPrefix}${charSuffix}`;
  }

  return regionTitle;
};

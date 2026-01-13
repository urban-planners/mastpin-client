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

  const isTitleTaken = (t: string) => pins.some((pin) => pin.title === t);

  while (isTitleTaken(title)) {
    counter++;
    title = `${region} - ${counter}`;
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

  const getCharPrefix = (p: number) => {
    if (p === 0) return "";
    let temp = "A".repeat(p);
    return temp;
  };

  const charPrefix = getCharPrefix(prefix);
  const charSuffix = String.fromCharCode(65 + suffix - 1);
  let regionTitle = `Region ${charPrefix}${charSuffix}`;

  const isRegionTitleTaken = (t: string) =>
    regions.some((region) => region.title === t);

  while (isRegionTitleTaken(regionTitle)) {
    suffix++;
    if (suffix > 26) {
      prefix = Math.floor(suffix / 26);
      suffix = suffix % 26;
    }
    const charPrefix = getCharPrefix(prefix);
    const charSuffix = String.fromCharCode(65 + suffix - 1);
    regionTitle = `Region ${charPrefix}${charSuffix}`;
  }

  return regionTitle;
};

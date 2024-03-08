import { PinInfoInterface, RegionInterface } from "../types";

export const pinExists = (pins: PinInfoInterface[], title: string): boolean => {
  return pins.find((pin) => pin.title === title) ? true : false;
};

export const regionExists = (
  regions: RegionInterface[],
  title: string,
): boolean => {
  return regions.find((region) => region.title === title) ? true : false;
};

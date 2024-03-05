import { PinInfoInterface, RegionInterface } from "../../types";

export const addRegion = () => ({
  type: "ADD_REGION",
});

export const removeRegion = (title: string) => ({
  type: "REMOVE_REGION",
  payload: title,
});

export const selectRegion = (region: RegionInterface) => ({
  type: "SELECT_REGION",
  payload: region,
});

export const addPin = (pin: PinInfoInterface) => ({
  type: "ADD_PIN",
  payload: pin,
});

export const removePin = (pinTitle: string) => ({
  type: "REMOVE_PIN",
  payload: pinTitle,
});

export const selectPin = (pinTitle: string) => ({
  type: "SELECT_PIN",
  payload: pinTitle,
});

export const updateMapZoom = (zoom: number) => ({
  type: "UPDATE_MAP_ZOOM",
  payload: zoom,
});

export const updateMapCenter = (center: google.maps.LatLngLiteral) => ({
  type: "UPDATE_MAP_CENTER",
  payload: center,
});
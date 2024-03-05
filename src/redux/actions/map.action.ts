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

export const updateRegion = (region: RegionInterface) => ({
  type: "UPDATE_REGION",
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

export const updatePin = (pin: PinInfoInterface) => ({
  type: "UPDATE_PIN",
  payload: pin,
});

export const updateMapZoom = (mapZoom: number) => ({
  type: "UPDATE_MAP_ZOOM",
  payload: mapZoom,
});

export const updateMapCenter = (mapCenter: google.maps.LatLngLiteral) => ({
  type: "UPDATE_MAP_CENTER",
  payload: mapCenter,
});

export const showMapLabels = (showLabels: boolean) => ({
  type: "SHOW_MAP_LABELS",
  payload: showLabels,
});

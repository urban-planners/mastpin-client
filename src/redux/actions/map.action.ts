import { PinInfoInterface, RegionInterface } from "../../types";

export const addRegion = () => ({
  type: "ADD_REGION",
});

export const removeRegion = (id: string) => ({
  type: "REMOVE_REGION",
  payload: id,
});

export const selectRegion = (id: string) => ({
  type: "SELECT_REGION",
  payload: id,
});

export const updateRegion = (region: RegionInterface) => ({
  type: "UPDATE_REGION",
  payload: region,
});

export const addPin = (pin: PinInfoInterface) => ({
  type: "ADD_PIN",
  payload: pin,
});

export const removePin = (id: string) => ({
  type: "REMOVE_PIN",
  payload: id,
});

export const selectPin = (id: string) => ({
  type: "SELECT_PIN",
  payload: id,
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

export const setMapResolution = (resolution: number) => ({
  type: "SET_MAP_RESOLUTION",
  payload: resolution,
});
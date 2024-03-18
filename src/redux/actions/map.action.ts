import { MapActionType, PinInfoInterface, RegionInterface } from "../../types";

export const setRegions = (regions: RegionInterface[]) => ({
  type: "SET_REGIONS",
  payload: regions,
});

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

export const setPins = (pins: PinInfoInterface[]) => ({
  type: "SET_PINS",
  payload: pins,
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

export const setMapAction = (action: MapActionType) => ({
  type: "SET_MAP_ACTION",
  payload: action,
});

export const setCurrentMasts = (masts: PinInfoInterface[]) => ({
  type: "SET_CURRENT_MASTS",
  payload: masts,
});

export const addMast = (mast: PinInfoInterface) => ({
  type: "ADD_MAST",
  payload: mast,
});

export const removeMast = (id: string) => ({
  type: "REMOVE_MAST",
  payload: id,
});

export const selectMast = (id: string) => ({
  type: "SELECT_MAST",
  payload: id,
});

export const updateMast = (mast: PinInfoInterface) => ({
  type: "UPDATE_MAST",
  payload: mast,
});

export const clearMasts = () => ({
  type: "CLEAR_MASTS",
});

import { nanoid } from "nanoid";
import {
  ActionInterface,
  MapInfoInterface,
  PinInfoInterface,
  RegionInterface,
} from "../../types";
import {
  computeConvexHull,
  generateRegionColors,
  getPinTitle,
  getRegionTitle,
  pinExists,
  regionExists,
} from "../../utils";

const initialState: {
  mapInfo: MapInfoInterface;
  regions: RegionInterface[];
  pins: PinInfoInterface[];
  selectedRegion: string;
  selectedPin: string;
} = {
  mapInfo: {
    zoom: 15,
    center: {
      lng: 3.7181452,
      lat: 6.8920758,
    },
    options: {
      mapTypeId: "hybrid",
    },
    showLabels: true,
  },
  selectedRegion: "",
  selectedPin: "",
  regions: [],
  pins: [],
};

export const mapReducer = (state = initialState, action: ActionInterface) => {
  switch (action.type) {
    case "UPDATE_MAP_ZOOM":
      return {
        ...state,
        mapInfo: {
          ...state.mapInfo,
          zoom: action.payload,
        },
      };

    case "UPDATE_MAP_CENTER":
      return {
        ...state,
        mapInfo: {
          ...state.mapInfo,
          center: action.payload,
        },
      };

    case "SHOW_MAP_LABELS":
      return {
        ...state,
        mapInfo: {
          ...state.mapInfo,
          showLabels: action.payload,
        },
      };

    case "ADD_REGION":
      const title = getRegionTitle(state.regions);
      const { strokeColor, fillColor } = generateRegionColors(title);
      const newRegion: RegionInterface = {
        id: nanoid(),
        title,
        fillColor,
        strokeColor,
        population: 0,
        bounds: [],
      };
      return {
        ...state,
        selectedRegion: newRegion.id,
        regions: [newRegion, ...state.regions],
      };

    case "REMOVE_REGION":
      return {
        ...state,
        regions: state.regions.filter((region) => region.id !== action.payload),
      };

    case "SELECT_REGION":
      return {
        ...state,
        selectedRegion: action.payload,
      };

    case "UPDATE_REGION":
      return {
        ...state,
        regions: state.regions.map((region) =>
          region.id === action.payload.id
            ? {
                ...action.payload,
                bounds: [...region.bounds, ...action.payload.bounds],
                title: regionExists(state.regions, action.payload.title)
                  ? region.title
                  : action.payload.title,
              }
            : region,
        ),
      };

    case "SET_REGION_BOUNDS":
      return {
        ...state,
        regions: state.regions.map((region) =>
          region.id === action.payload.id
            ? { ...region, bounds: action.payload.bounds }
            : region,
        ),
      };

    case "ADD_PIN":
      if (!state.selectedRegion) return state;
      const newPin: PinInfoInterface = {
        ...action.payload,
        title: getPinTitle(state.pins, state.regions, state.selectedRegion),
      };
      return {
        ...state,
        selectedPin: newPin.id,
        pins: [newPin, ...state.pins],
        regions: state.regions.map((region) =>
          region.id === newPin.regionId
            ? {
                ...region,
                bounds: computeConvexHull([...region.bounds, newPin.loc]),
              }
            : region,
        ),
      };

    case "REMOVE_PIN":
      return (() => {
        const pins = state.pins.filter((pin) => pin.id !== action.payload);
        const pinRegion = state.pins.find((pin) => pin.id === action.payload);
        return {
          ...state,
          selectedPin:
            state.selectedPin === action.payload ? "" : state.selectedPin,
          pins,
          regions: state.regions.map((region) =>
            region.id === pinRegion?.regionId
              ? {
                  ...region,
                  bounds: computeConvexHull(
                    pins
                      .filter((pin) => pin.regionId === region.id)
                      .map((pin) => pin.loc),
                  ),
                }
              : region,
          ),
        };
      })();

    case "SELECT_PIN":
      return {
        ...state,
        selectedPin: action.payload,
      };

    case "UPDATE_PIN":
      return (() => {
        const pins = state.pins.map((pin) =>
          pin.id === action.payload.id
            ? {
                ...action.payload,
                title: pinExists(state.pins, action.payload.title)
                  ? pin.title
                  : action.payload.title,
              }
            : pin,
        );
        return {
          ...state,
          pins,
          regions: state.regions.map((region) =>
            region.id === action.payload.regionId
              ? {
                  ...region,
                  bounds: computeConvexHull(
                    pins
                      .filter((pin) => pin.regionId === region.id)
                      .map((pin) => pin.loc),
                  ),
                }
              : region,
          ),
        };
      })();

    default:
      return state;
  }
};

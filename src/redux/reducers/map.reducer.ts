import {
  ActionInterface,
  MapInfoInterface,
  PinInfoInterface,
  RegionInterface,
} from "../../types";

const initialState: {
  mapInfo: MapInfoInterface;
  regions: RegionInterface[];
  pins: PinInfoInterface[];
  selectedRegion: RegionInterface;
  selectedPin: PinInfoInterface;
  pinCounter: number;
} = {
  mapInfo: {
    zoom: 15,
    center: {
      lng: 3.7181452,
      lat: 6.8920758,
    },
  },
  selectedRegion: {
    title: "",
    fillColor: "",
    strokeColor: "",
  },
  regions: [],
  pins: [],
  selectedPin: {
    region: "",
    title: "",
    pop: 0,
    loc: {
      lat: 0,
      lng: 0,
    },
  },
  pinCounter: 0,
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

    case "ADD_REGION":
      const title = getRegionTitle(state.regions.length);
      const { strokeColor, fillColor } = generateRegionColors(title);
      const newRegion: RegionInterface = {
        title,
        fillColor,
        strokeColor,
      };
      return {
        ...state,
        selectedRegion: newRegion,
        regions: [newRegion, ...state.regions],
      };

    case "REMOVE_REGION":
      return {
        ...state,
        regions: state.regions.filter(
          (region) => region.title !== action.payload,
        ),
      };

    case "SELECT_REGION":
      return {
        ...state,
        selectedRegion: action.payload,
      };

    case "ADD_PIN":
      if (state.selectedRegion.title === "") return state;
      const newCounter = state.pinCounter + 1;
      const newPin: PinInfoInterface = {
        ...action.payload,
        title: `${action.payload.region.replace("Region ", "")} - ${newCounter}`,
      };
      return {
        ...state,
        pinCounter: newCounter,
        selectedPin: newPin,
        pins: [newPin, ...state.pins],
      };

    case "REMOVE_PIN":
      return {
        ...state,
        selectedPin:
          state.selectedPin.title === action.payload
            ? {
                region: "",
                title: "",
                pop: 0,
                loc: {
                  lat: 0,
                  lng: 0,
                },
              }
            : state.selectedPin,
        pins: state.pins.filter((pin) => pin.title !== action.payload),
      };

    case "SELECT_PIN":
      return {
        ...state,
        selectedPin: state.pins.find(
          (pin) => pin.title === action.payload,
        ) as PinInfoInterface,
      };

    default:
      return state;
  }
};

const getRegionTitle = (index: number) => {
  let suffix = index + 1;
  let prefix = 0;
  if (suffix > 26) {
    prefix = Math.floor(suffix / 26);
    suffix = suffix % 26;
  }
  const charPrefix = (() => {
    if (prefix === 0) return "";
    let temp = "";
    for (let i = 0; i < prefix; i++) {
      temp += "A";
    }
    return temp;
  })();
  const charSuffix = String.fromCharCode(65 + suffix - 1);
  const alias = `${charPrefix}${charSuffix}`;
  return `Region ${alias}`;
};

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

const usedColors: Set<string> = new Set();

function generateRegionColors(regionId: string): {
  strokeColor: string;
  fillColor: string;
} {
  let strokeColor: string;
  let fillColor: string;

  // If there are available colors in the predefined palette
  if (!usedColors.has(regionId) && usedColors.size < predefinedColors.length) {
    strokeColor = predefinedColors[usedColors.size];
    fillColor = lightenDarkenColor(strokeColor, 20);
  } else {
    // Use already used colors or cycle through used colors if palette is exhausted
    if (usedColors.has(regionId)) {
      strokeColor = regionId;
    } else {
      const usedColorIndex = usedColors.size % predefinedColors.length;
      const usedColorArray = Array.from(usedColors);
      strokeColor = usedColorArray[usedColorIndex];
    }
    fillColor = lightenDarkenColor(strokeColor, 20);
  }

  // Add used colors to the set
  usedColors.add(regionId);

  return { strokeColor, fillColor };
}

// Function to lighten or darken a color
function lightenDarkenColor(color: string, amount: number): string {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) + amount;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  let b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000ff) + amount;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

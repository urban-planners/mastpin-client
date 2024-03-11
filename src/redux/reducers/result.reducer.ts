import { ActionInterface, PresentationInterface } from "../../types";

const initialState: {
  presentation: PresentationInterface;
} = {
  presentation: {
    coverage: 0,
    load_max: 0,
    load_min: 0,
    load_std: 0,
    load_values: [],
    mast_loc: [],
    mast_loc_coord: [
        [0, 0],
    ],
    region_signal_strength: [],
    signal_strength: 0,
  },
};

export const resultReducer = (
  state = initialState,
  action: ActionInterface,
) => {
  switch (action.type) {
    case "SET_PRESENTATION":
      return {
        ...state,
        presentation: action.payload,
      };

    default:
      return state;
  }
};

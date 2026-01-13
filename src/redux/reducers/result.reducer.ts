import { ActionInterface, PresentationInterface } from "../../types";

const initialState: {
  hasSimulation: boolean;
  hasEvaluation: boolean;
  simulation: PresentationInterface;
  evaluation: PresentationInterface;
} = {
  hasSimulation: false,
  hasEvaluation: false,
  simulation: {
    coverage: 0,
    load_max: 0,
    load_min: 0,
    load_std: 0,
    load_values: [],
    mast_loc: [],
    mast_loc_coord: [[0, 0]],
    region_signal_strength: [],
    signal_strength: 0,
    heatmap_data: [],
  },
  evaluation: {
    coverage: 0,
    load_max: 0,
    load_min: 0,
    load_std: 0,
    load_values: [],
    mast_loc: [],
    mast_loc_coord: [[0, 0]],
    region_signal_strength: [],
    signal_strength: 0,
    heatmap_data: [],
  },
};

export const resultReducer = (
  state = initialState,
  action: ActionInterface,
) => {
  switch (action.type) {
    case "SET_SIMULATION":
      return {
        ...state,
        simulation: action.payload,
      };

    case "SET_HAS_SIMULATION":
      return {
        ...state,
        hasSimulation: action.payload,
      };

    case "SET_EVALUATION":
      return {
        ...state,
        evaluation: action.payload,
      };

    case "SET_HAS_EVALUATION":
      return {
        ...state,
        hasEvaluation: action.payload,
      };

    case "RESET_RESULTS":
      return initialState;

    default:
      return state;
  }
};

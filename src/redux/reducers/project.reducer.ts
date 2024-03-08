import {
  ActionInterface,
  ConfigurationInterface,
  ProjectDetailsInterface,
} from "../../types";

const initialState: {
  details: ProjectDetailsInterface;
  displayMode: "mapping" | "technical";
  theme: "light" | "dark";
  configuration: ConfigurationInterface;
} = {
  details: {
    projectName: "Untitled Project",
    createdAt: new Date().toISOString(),
  },
  displayMode: "mapping",
  theme: "light",
  configuration: {
    mastLocation: [],
    numberOfMasts: {
      specific: 8,
      min: 5,
      max: 15,
    },
    threshold: {
      coverage: 0.9999,
      signalStrength: 0,
    },
    algorithm: "pso",
    initParameters: {
      swarmSize: 20,
    },
    runParameters: {
      maxIterations: 10,
    },
    hataParameters: {
      mastRange: 200,
      mastHeight: 30,
      mastFrequency: 900,
      mastEirp: 45,
      receiverHeight: 1.5,
      ssCap: -40,
      citySize: "medium",
    },
  },
};

export function projectReducer(state = initialState, action: ActionInterface) {
  switch (action.type) {
    case "TOGGLE_DISPLAY_MODE":
      return {
        ...state,
        displayMode: state.displayMode === "mapping" ? "technical" : "mapping",
      };

    case "SWITCH_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    case "SET_CONFIGURATION":
      return {
        ...state,
        configuration: action.payload,
      };

    default:
      return state;
  }
}

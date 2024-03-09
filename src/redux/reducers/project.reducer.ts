import {
  ActionInterface,
  ConfigurationCheckInterface,
  ConfigurationInterface,
  OptimizationCheckInterface,
  OptimizationInterface,
  ProjectDetailsInterface,
} from "../../types";

const initialState: {
  details: ProjectDetailsInterface;
  displayMode: "mapping" | "technical";
  theme: "light" | "dark";
  configuration: ConfigurationInterface;
  optimization: OptimizationInterface;
  configurationCheck?: ConfigurationCheckInterface;
  optimizationCheck?: OptimizationCheckInterface;
} = {
  details: {
    projectName: "Untitled Project",
    createdAt: new Date().toISOString(),
  },
  displayMode: "mapping",
  theme: "light",
  configuration: {
    resolution: 100,
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
  optimization: {
    algorithm: "pso",
    initParameters: {
      swarmSize: 100,
      inertia: 0.8,
      cognCoeff: 0.1,
      socCoeff: 0.1,
      velocityMagnitude: 1,

      popSize: 100,
      kBestIndividuals: 0.1,
      nParents: 2,
      breedingMethod: "average",
      individualMutationRate: 1.0,
      geneMutationRate: 1.0,
      mutationIntensity: 1.0,
    },
    runParameters: {
      maxIter: 100,
      scoreThreshold: 0.9999,
      patience: 10,
      tolerance: 0.0001,

      maxGenerations: 100,
    },
  },
  configurationCheck: {
    numberOfMasts: {
      specific: true,
    },
    threshold: {
      coverage: true,
      signalStrength: true,
    },
  },
  optimizationCheck: {
    initParameters: {
      swarmSize: true,
      inertia: true,
      cognCoeff: true,
      socCoeff: true,
      velocityMagnitude: true,
      popSize: true,
      kBestIndividuals: true,
      nParents: true,
      breedingMethod: true,
      individualMutationRate: true,
      geneMutationRate: true,
      mutationIntensity: true,
    },
    runParameters: {
      maxIter: true,
      scoreThreshold: true,
      patience: true,
      tolerance: true,
      maxGenerations: true,
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

    case "SET_OPTIMIZATION":
      return {
        ...state,
        optimization: action.payload,
      };

    case "SET_CONFIGURATION_CHECK":
      return {
        ...state,
        configurationCheck: action.payload,
      };

    case "SET_OPTIMIZATION_CHECK":
      return {
        ...state,
        optimizationCheck: action.payload,
      };

    default:
      return state;
  }
}

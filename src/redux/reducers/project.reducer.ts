import {
  ActionInterface,
  ConfigurationCheckInterface,
  ConfigurationInterface,
  OptimizationCheckInterface,
  OptimizationInterface,
  ProjectDetailsInterface,
  ShareInterface,
} from "../../types";

const initialState: {
  allProjects: Object[];
  details: ProjectDetailsInterface;
  displayMode: "mapping" | "technical";
  theme: "light" | "dark";
  configuration: ConfigurationInterface;
  optimization: OptimizationInterface;
  configurationCheck?: ConfigurationCheckInterface;
  optimizationCheck?: OptimizationCheckInterface;
  showShareDialog: boolean;
  showExportDialog: boolean;
  shareDetails: ShareInterface;
  saved: boolean;
} = {
  allProjects: [],
  showShareDialog: false,
  showExportDialog: false,
  shareDetails: {
    isPublic: false,
    link: "",
  },
  details: {
    title: "Untitled Project",
    updatedAt: new Date().toISOString(),
  },
  displayMode: "mapping",
  theme: "light",
  configuration: {
    resolution: 100,
    mastLocation: [],
    numberOfMasts: {
      useCurrent: true,
      specific: 8,
      min: 5,
      max: 15,
    },
    threshold: {
      coverage: 0.9999,
      signalStrength: -90,
      loadVariance: false,
    },
    hataParameters: {
      mastRange: 0.1,
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
      scoreThreshold: false,
      patience: false,
      tolerance: false,
      maxGenerations: true,
    },
  },
  saved: true,
};

export function projectReducer(state = initialState, action: ActionInterface) {
  switch (action.type) {
    case "SET_ALL_PROJECTS":
      return {
        ...state,
        allProjects: action.payload,
      };

    case "ADD_TO_ALL_PROJECTS":
      return {
        ...state,
        allProjects: [action.payload, ...state.allProjects],
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        allProjects: state.allProjects.filter(
          (project: any) => project._id !== action.payload,
        ),
      };

    case "SET_PROJECT_DETAILS":
      return {
        ...state,
        details: action.payload,
      };

    case "SET_PROJECT_NAME":
      return {
        ...state,
        details: {
          ...state.details,
          title: action.payload,
        },
      };

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

    case "SHOW_SHARE_DISPLAY":
      return {
        ...state,
        showShareDialog: action.payload,
      };

    case "SHOW_EXPORT_DISPLAY":
      return {
        ...state,
        showExportDialog: action.payload,
      };

    case "SET_MAP_VISIBILITY":
      return {
        ...state,
        shareDetails: {
          ...state.shareDetails,
          isPublic: action.payload,
        },
      };

    case "SET_MAP_LINK":
      return {
        ...state,
        shareDetails: {
          ...state.shareDetails,
          link: action.payload,
        },
      };

    case "SET_SAVED":
      return {
        ...state,
        saved: action.payload,
      };

    default:
      return state;
  }
}

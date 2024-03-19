import {
  ConfigurationCheckInterface,
  ConfigurationInterface,
  OptimizationCheckInterface,
  OptimizationInterface,
} from "../../types";

export const setAllProjects = (projects: Object[]) => ({
  type: "SET_ALL_PROJECTS",
  payload: projects,
});

export const addToAllProjects = (project: Object) => ({
  type: "ADD_TO_ALL_PROJECTS",
  payload: project,
});

export const setProjectDetails = (details: {
  title: string;
  updatedAt: Date;
}) => ({
  type: "SET_PROJECT_DETAILS",
  payload: details,
});

export const setProjectName = (name: string) => ({
  type: "SET_PROJECT_NAME",
  payload: name,
});

export const toggleDisplayMode = () => ({
  type: "TOGGLE_DISPLAY_MODE",
});

export const switchTheme = () => ({
  type: "SWITCH_THEME",
});

export const setConfiguration = (configuration: ConfigurationInterface) => ({
  type: "SET_CONFIGURATION",
  payload: configuration,
});

export const setOptimization = (optimization: OptimizationInterface) => ({
  type: "SET_OPTIMIZATION",
  payload: optimization,
});

export const setConfigurationCheck = (
  configurationCheck: ConfigurationCheckInterface,
) => ({
  type: "SET_CONFIGURATION_CHECK",
  payload: configurationCheck,
});

export const setOptimizationCheck = (
  optimizationCheck: OptimizationCheckInterface,
) => ({
  type: "SET_OPTIMIZATION_CHECK",
  payload: optimizationCheck,
});

export const showShareDisplay = (shareDisplay: boolean) => ({
  type: "SHOW_SHARE_DISPLAY",
  payload: shareDisplay,
});

export const setMapVisibility = (visibility: boolean) => ({
  type: "SET_MAP_VISIBILITY",
  payload: visibility,
});

export const setMapLink = (link: string) => ({
  type: "SET_MAP_LINK",
  payload: link,
});

export const setSaved = (saved: boolean) => ({
  type: "SET_SAVED",
  payload: saved,
});

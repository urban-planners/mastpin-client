import {
  ConfigurationCheckInterface,
  ConfigurationInterface,
  OptimizationCheckInterface,
  OptimizationInterface,
} from "../../types";

export const toggleDisplayMode = () => {
  return {
    type: "TOGGLE_DISPLAY_MODE",
  };
};

export const switchTheme = () => {
  return {
    type: "SWITCH_THEME",
  };
};

export const setConfiguration = (configuration: ConfigurationInterface) => {
  return {
    type: "SET_CONFIGURATION",
    payload: configuration,
  };
};

export const setOptimization = (optimization: OptimizationInterface) => {
  return {
    type: "SET_OPTIMIZATION",
    payload: optimization,
  };
};

export const setConfigurationCheck = (
  configurationCheck: ConfigurationCheckInterface,
) => {
  return {
    type: "SET_CONFIGURATION_CHECK",
    payload: configurationCheck,
  };
};

export const setOptimizationCheck = (
  optimizationCheck: OptimizationCheckInterface,
) => {
  return {
    type: "SET_OPTIMIZATION_CHECK",
    payload: optimizationCheck,
  };
};

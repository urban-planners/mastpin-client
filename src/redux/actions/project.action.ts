import { ConfigurationInterface } from "../../types";

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

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
<<<<<<< HEAD

export const setConfiguration = (configuration: ConfigurationInterface) => {
  return {
    type: "SET_CONFIGURATION",
    payload: configuration,
  };
};
=======
>>>>>>> 3b92fe16dc81d59e7a3e6721f8ed7a8ba136c050

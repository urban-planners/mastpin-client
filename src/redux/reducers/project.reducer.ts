import { ActionInterface, ProjectDetailsInterface } from "../../types";

const initialState: {
  details: ProjectDetailsInterface;
  displayMode: "mapping" | "technical";
  theme: "light" | "dark";
} = {
  details: {
    projectName: "Untitled Project",
    createdAt: new Date().toISOString(),
  },
  displayMode: "mapping",
  theme: "light",
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

    default:
      return state;
  }
}

import { PresentationInterface } from "../../types";

export const setPresentation = (presentation: PresentationInterface) => {
  return {
    type: "SET_PRESENTATION",
    payload: presentation,
  };
};

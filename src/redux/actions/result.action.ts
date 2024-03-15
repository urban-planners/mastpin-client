import { PresentationInterface } from "../../types";

export const setPresentation = (presentation: PresentationInterface) => {
  return {
    type: "SET_PRESENTATION",
    payload: presentation,
  };
};

export const setHasResult = (hasResult: boolean) => {
  return {
    type: "SET_HAS_RESULT",
    payload: hasResult,
  };
};

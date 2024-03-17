import { PresentationInterface } from "../../types";

export const setSimulation = (simulation: PresentationInterface) => {
  return {
    type: "SET_SIMULATION",
    payload: simulation,
  };
};

export const setHasSimulation = (hasSimulation: boolean) => {
  return {
    type: "SET_HAS_SIMULATION",
    payload: hasSimulation,
  };
};

export const setEvaluation = (evaluation: PresentationInterface) => {
  return {
    type: "SET_EVALUATION",
    payload: evaluation,
  };
};

export const setHasEvaluation = (hasEvaluation: boolean) => {
  return {
    type: "SET_HAS_EVALUATION",
    payload: hasEvaluation,
  };
};

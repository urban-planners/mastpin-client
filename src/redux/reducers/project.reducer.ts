import { ActionInterface, ProjectDetailsInterface } from "../../types";

const initialState: {
  details: ProjectDetailsInterface;
} = {
  details: {
    projectName: "Untitled Project",
    createdAt: new Date().toISOString(),
  },
};

export function projectReducer(state = initialState, action: ActionInterface) {
  switch (action.type) {
    default:
      return state;
  }
}

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mapReducer, projectReducer, resultReducer } from "./reducers";
import undoable from "redux-undo";

const store = configureStore({
  reducer: combineReducers({
    map: undoable(mapReducer, {
      limit: 25,
    }),
    project: projectReducer,
    result: resultReducer,
  }),
});

export default store;

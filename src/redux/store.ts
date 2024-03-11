import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mapReducer, projectReducer, resultReducer } from "./reducers";

const store = configureStore({
  reducer: combineReducers({
    map: mapReducer,
    project: projectReducer,
    result: resultReducer,
  }),
});

export default store;

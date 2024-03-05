import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mapReducer, projectReducer } from "./reducers";

const store = configureStore({
  reducer: combineReducers({
    map: mapReducer,
    project: projectReducer,
  }),
});

export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mapReducer } from "./reducers";

const store = configureStore({
  reducer: combineReducers({
    map: mapReducer,
  }),
});

export default store;

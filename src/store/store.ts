import { combineReducers, createStore } from "redux";

import { locationReducer } from "store/reducers";

const reducers = combineReducers({
  locationReducer,
});

export const store = createStore(reducers);

export type AppRootStoreType = ReturnType<typeof reducers>;

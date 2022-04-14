import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import { selectCurrentFormWatcher } from "./middlewares/location";

import { locationReducer } from "store/reducers";

const reducers = combineReducers({
  locationReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(sagaMiddleware));

function* rootWatcher(): any {
  yield all([selectCurrentFormWatcher()]);
}

sagaMiddleware.run(rootWatcher);

export type AppRootStoreType = ReturnType<typeof reducers>;

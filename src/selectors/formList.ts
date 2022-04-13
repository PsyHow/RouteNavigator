import { CurrentFormType } from "store/reducers/location";
import { AppRootStoreType } from "store/store";

export const selectTableList = (state: AppRootStoreType): CurrentFormType[] =>
  state.locationReducer.tableList;

export const selectCurrentList = (state: AppRootStoreType): CurrentFormType =>
  state.locationReducer.currentForm;

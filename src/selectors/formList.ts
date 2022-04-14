import { AppRootStoreType } from "store";
import { CurrentFormType } from "store/reducers/types";

export const selectFormList = (state: AppRootStoreType): CurrentFormType[] =>
  state.locationReducer.formList;

export const selectCurrentList = (state: AppRootStoreType): CurrentFormType =>
  state.locationReducer.currentForm;

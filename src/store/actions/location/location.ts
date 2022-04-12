import { CurrentFormType } from "store/reducers/location";

export const setCurrentForm = (payload: CurrentFormType) =>
  ({
    type: "SET_CURRENT_FORM",
    payload,
  } as const);

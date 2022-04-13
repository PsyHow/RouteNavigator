import {
  setCurrentForm,
  setCurrentArrival,
  setCurrentSending,
} from "store/actions";

export type LocationActionTypes =
  | ReturnType<typeof setCurrentForm>
  | ReturnType<typeof setCurrentArrival>
  | ReturnType<typeof setCurrentSending>;

import {
  setCurrentForm,
  setCurrentArrival,
  setCurrentSending,
} from "store/actions";

export type LocationActionTypes =
  | ReturnType<typeof setCurrentForm>
  | ReturnType<typeof setCurrentArrival>
  | ReturnType<typeof setCurrentSending>;

export interface CurrentFormType {
  sending: { name: string; locate: number[] };
  arrival: { name: string; locate: number[] };
}

export interface LocationType {
  name: string;
  locate: number[];
}

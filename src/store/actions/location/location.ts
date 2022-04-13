import { CurrentFormType, LocationType } from "store/reducers/location";

export const setCurrentForm = (payload: CurrentFormType) =>
  ({
    type: "SET_CURRENT_FORM",
    payload,
  } as const);

export const setCurrentSending = (payload: LocationType) =>
  ({
    type: "SET_CURRENT_SENDING",
    payload,
  } as const);

export const setCurrentArrival = (location: LocationType, id: number) =>
  ({
    type: "SET_CURRENT_ARRIVAL",
    payload: { location, id },
  } as const);

import { LocationActionTypes } from "./types";

const initialState = {
  location: "map",
  sending: {
    name: "Новосибирск",
    locate: [54.96781445, 82.95159894278376],
  },
  arrival: {
    name: "Санкт-Петербург",
    locate: [59.917857350000006, 30.380619357025516],
  },
  currentForm: {
    sending: {
      name: "",
      locate: [] as number[],
    },
    arrival: {
      name: "",
      locate: [] as number[],
    },
  },
};

export interface CurrentFormType {
  sending: { name: string; locate: number[] };
  arrival: { name: string; locate: number[] };
}

export type LocationType = {
  name: string;
  locate: number[];
};

type InitialStateType = typeof initialState;

export const locationReducer = (
  state = initialState,
  action: LocationActionTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_CURRENT_FORM": {
      return {
        ...state,
        currentForm: action.payload,
      };
    }
    default:
      return state;
  }
};

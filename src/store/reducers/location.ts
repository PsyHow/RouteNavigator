import { LocationActionTypes } from "./types";

const initialState = {
  tableList: [
    {
      id: 0,
      sending: { name: "Москва", locate: [55.7504461, 37.6174943] },
      arrival: {
        name: "Новосибирск",
        locate: [54.96781445, 82.95159894278376],
      },
    },
    {
      id: 1,
      sending: { name: "Омск", locate: [54.991375, 73.371529] },
      arrival: {
        name: "Санкт-Петербург",
        locate: [59.917857350000006, 30.380619357025516],
      },
    },
  ],
  currentForm: {
    sending: {
      name: "Россия",
      locate: [64.6863136, 97.7453061] as number[],
    },
    arrival: {
      name: "Россия",
      locate: [64.6863136, 97.7453061] as number[],
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
    case "SET_CURRENT_SENDING": {
      return {
        ...state,
        tableList: state.tableList.map((item) =>
          item.id === action.payload.id
            ? { ...item, sending: action.payload.location }
            : item
        ),
      };
    }
    case "SET_CURRENT_ARRIVAL": {
      return {
        ...state,
        tableList: state.tableList.map((item) =>
          item.id === action.payload.id
            ? { ...item, arrival: action.payload.location }
            : item
        ),
      };
    }
    default:
      return state;
  }
};

import { LocationActionTypes } from "store/reducers/types";

const initialState = {
  formList: [
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
    {
      id: 2,
      sending: {
        name: "Санкт-Петербург",
        locate: [59.917857350000006, 30.380619357025516],
      },
      arrival: {
        name: "Новосибирск",
        locate: [54.96781445, 82.95159894278376],
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
        formList: state.formList.map((item) =>
          item.id === action.payload.id
            ? { ...item, sending: action.payload.location }
            : item
        ),
      };
    }
    case "SET_CURRENT_ARRIVAL": {
      return {
        ...state,
        formList: state.formList.map((item) =>
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

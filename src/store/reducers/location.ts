const initialState = {
  location: "map",
};

type InitialStateType = typeof initialState;

export const locationReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case "ANY_ACTION": {
      return state;
    }
    default:
      return state;
  }
};

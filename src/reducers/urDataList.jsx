const initialState = [];

const urDataList = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "READ_VALUE":
      return action.reset ? initialState : [...state, action.payload];

    default:
      return state;
  }
};

export default urDataList;

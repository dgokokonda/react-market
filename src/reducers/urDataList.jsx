const initialState = [];

const urDataList = (state = initialState, action) => {
  switch (action.type) {
    case "READ_VALUE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default urDataList;

const initialState = {};

const urDataList = (state = initialState, action) => {

    switch (action.type) {
        case "READ_VALUE":
            return {...state, [action.payload.name]: action.payload.val};

        case "RESET_FORM":
        default:
            return state;
    }
};

export default urDataList;

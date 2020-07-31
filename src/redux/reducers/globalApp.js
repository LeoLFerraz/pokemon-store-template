import {TOGGLE_LOADING} from "../actionTypes";

const initialState = {
    loading: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LOADING: {
            return {
                ...state,
                loading: !state.loading
            };
        }
        default:
            return state;
    }
}

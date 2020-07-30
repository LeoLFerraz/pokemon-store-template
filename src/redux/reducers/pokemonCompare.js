import { ADD_POKEMON_COMPARE, REMOVE_POKEMON_COMPARE } from "../actionTypes";

const initialState = JSON.parse(localStorage.getItem('comparing')) || {comparing: []};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_POKEMON_COMPARE: {
            const { id } = action.payload;
            let result = {
                ...state,
                comparing: [...state.comparing, id],
            };
            localStorage.setItem('comparing', JSON.stringify(result));
            return result
        }
        case REMOVE_POKEMON_COMPARE: {
            const { id } = action.payload;
            const index = state.comparing.indexOf(id);
            let result = {
                ...state,
                comparing: [
                    ...state.comparing.slice(0, index),
                    ...state.comparing.slice(index + 1)
                ]
            };
            localStorage.setItem('comparing', JSON.stringify(result));
            return result;
        }
        default:
            return state;
    }
}

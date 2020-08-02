import { ADD_POKEMON_COMPARE, REMOVE_POKEMON_COMPARE } from "../actionTypes";

const initialState = JSON.parse(localStorage.getItem('comparing')) || {comparing: []};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_POKEMON_COMPARE: {
            const { id } = action.payload;
            const index = state.comparing.indexOf(id);
            if (index < 0){
                let comparingCopy = [...state.comparing];
                comparingCopy.push(id);
                if(comparingCopy.length > 5){
                    comparingCopy = state.comparing;
                }
                let result = {
                    ...state,
                    comparing: comparingCopy,
                };
                localStorage.setItem('comparing', JSON.stringify(result));
                return result;
            }
            return state;
        }
        case REMOVE_POKEMON_COMPARE: {
            const { id } = action.payload;
            const index = state.comparing.indexOf(id);
            let comparingCopy = state.comparing;
            comparingCopy.splice(index, 1);

            let result = {
                ...state,
                comparing: comparingCopy
            };
            localStorage.setItem('comparing', JSON.stringify(result));
            return result;
        }
        default:
            return state;
    }
}

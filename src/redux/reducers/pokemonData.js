import { STORE_POKEMON_DATA } from "../actionTypes";

const initialState = {
    pokemon: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case STORE_POKEMON_DATA: {
            const pokemon = action.payload;
            return {
                ...state,
                pokemon: pokemon
            };
        }
        default:
            return state;
    }
}

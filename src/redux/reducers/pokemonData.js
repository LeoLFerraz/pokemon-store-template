import { STORE_POKEMON_DATA } from "../actionTypes";

const initialState = {
    pokemon: [],
    types: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case STORE_POKEMON_DATA: {
            const pokemon = action.payload.pokemon;
            const types = action.payload.types;
            return {
                ...state,
                pokemon: pokemon,
                types: types
            };
        }
        default:
            return state;
    }
}

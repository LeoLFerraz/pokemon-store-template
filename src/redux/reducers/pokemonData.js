import { STORE_POKEMON_DATA } from "../actionTypes";

const initialState = {
    pokemon: [],
    types: [],
    generations: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case STORE_POKEMON_DATA: {
            const pokemon = action.payload.pokemon;
            const types = action.payload.types;
            const generations = action.payload.generations;
            return {
                ...state,
                pokemon: pokemon,
                types: types,
                generations: generations
            };
        }
        default:
            return state;
    }
}

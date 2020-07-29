import {ADD_TO_CART, REMOVE_FROM_CART, STORE_POKEMON_DATA} from "./actionTypes";

export const addToCart = payload => ({
    type: ADD_TO_CART,
    payload: { payload }
});

export const removeFromCart = payload => ({
    type: REMOVE_FROM_CART,
    payload: { payload }
})

export const storePokemonData = payload => ({
    type: STORE_POKEMON_DATA,
    payload: { payload }
});

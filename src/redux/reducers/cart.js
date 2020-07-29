import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes";

const initialState = {
    products: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: {
            const { product } = action.payload;
            return {
                ...state,
                products: [...state.products, product],
            };
        }
        case REMOVE_FROM_CART: {
            const { cartIndex } = action.payload;
            return {
                ...state,
                products: [
                ...state.products.slice(0, cartIndex),
                ...state.products.slice(cartIndex + 1)
                ]
            };
        }
        default:
            return state;
    }
}

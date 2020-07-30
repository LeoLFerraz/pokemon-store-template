import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes";

const initialState = {
    products: [],
    quantity: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: {
            const { product } = action.payload;
            return {
                ...state,
                products: [...state.products, product],
                quantity : state.quantity+1
            };
        }
        case REMOVE_FROM_CART: {
            const { cartIndex } = action.payload;
            return {
                ...state,
                products: [
                ...state.products.slice(0, cartIndex),
                ...state.products.slice(cartIndex + 1)
                ],
                quantity : state.quantity-1
            };
        }
        default:
            return state;
    }
}

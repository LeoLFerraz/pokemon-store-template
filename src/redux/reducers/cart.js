import { ADD_TO_CART, REMOVE_FROM_CART, OPEN_CART, CLOSE_CART, TOGGLE_CART } from "../actionTypes";

const initialState = {
    products: [],
    quantity: 0,
    open: false
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
        case OPEN_CART: {
            return {
                ...state,
                open: true
            }
        }
        case CLOSE_CART: {
            return {
                ...state,
                open: false
            }
        }
        case TOGGLE_CART: {
            return {
                ...state,
                open: !state.open
            }
        }
        default:
            return state;
    }
}

import { ADD_TO_CART, REMOVE_FROM_CART, OPEN_CART, CLOSE_CART, TOGGLE_CART } from "../actionTypes";

const initialState = JSON.parse(window.localStorage.getItem("cart")) || {
    products: [],
    quantity: 0,
    open: false
};

function syncLocalStorage(state) {
    window.localStorage.setItem("cart", JSON.stringify(state))
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: {
            const product = action.payload;
            let products = [...state.products];
            let index = products.findIndex(item =>{
                return item.id === product;
            });
            if(index >= 0){
                products[index].quantity = products[index].quantity+1
            }else{
                products.push({id: product, quantity: 1});
            }

            let newState = {
                ...state,
                products,
                quantity : state.quantity+1
            };

            syncLocalStorage(newState);
            return newState;
        }
        case REMOVE_FROM_CART: {
            const { cartIndex } = action.payload;
            let newState = {
                ...state,
                products: [
                ...state.products.slice(0, cartIndex),
                ...state.products.slice(cartIndex + 1)
                ],
                quantity : state.quantity-1
            };

            syncLocalStorage(newState);
            return newState;
        }
        case OPEN_CART: {
            let newState = {
                ...state,
                open: true
            }

            syncLocalStorage(newState);
            return newState;
        }
        case CLOSE_CART: {
            let newState = {
                ...state,
                open: false
            }

            syncLocalStorage(newState);
            return newState;
        }
        case TOGGLE_CART: {
            let newState = {
                ...state,
                open: !state.open
            }

            syncLocalStorage(newState);
            return newState;
        }
        default:
            return state;
    }
}

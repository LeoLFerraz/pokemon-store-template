import { ADD_TO_CART, REMOVE_FROM_CART, OPEN_CART, CLOSE_CART, TOGGLE_CART } from "../actionTypes";


const initialState = JSON.parse(localStorage.getItem("cart")) || {
    products: [],
    quantity: 0,
    open: false
};

function recalculateQuantity(products) {
    let count = 0;
    for(let product of products) {
        count += product.quantity;
    }
    return count;
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: {
            const id = action.payload.id;
            let quantity = Number(action.payload.quantity) || 1;
            let set = action.payload.set;
            if(isNaN(quantity)) {
                return state;
            }
            let products = [...state.products];
            let index = products.findIndex(item =>{
                return item.id === id;
            });
            if(index >= 0){
                if(set) {
                    products[index].quantity = quantity;
                } else {
                    if(products[index].quantity + quantity > 0) {
                        products[index].quantity += quantity;
                    }
                }
            }else{
                products.push({id, quantity});
            }
            let newState = {
                ...state,
                products,
                quantity: recalculateQuantity(products)
            };

            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;
        }

        case REMOVE_FROM_CART: {
            const id = action.payload.id;
            let cartIndex = state.products.findIndex((product) => {
                return product.id === id;
            });
            let newState = {
                ...state,
                products: [
                ...state.products.slice(0, cartIndex),
                ...state.products.slice(cartIndex + 1)
                ],
                quantity : recalculateQuantity(state.products)
            };

            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;
        }

        case OPEN_CART: {
            let newState = {
                ...state,
                open: true
            }

            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;
        }
        case CLOSE_CART: {
            let newState = {
                ...state,
                open: false
            }

            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;
        }
        case TOGGLE_CART: {
            let newState = {
                ...state,
                open: !state.open
            }

            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;
        }
        default:
            return state;
    }
}

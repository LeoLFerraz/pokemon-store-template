import {ADD_TO_CART, REMOVE_FROM_CART, OPEN_CART, CLOSE_CART, TOGGLE_CART, SET_SHIPPING_ADDRESS} from "../actionTypes";


const initialState = JSON.parse(localStorage.getItem("cart")) || {
    products: [],
    quantity: 0,
    open: false,
    shippingCost: 0,
    shippingAddress: '',
    subTotal: 0,
    total: 0,
};

function recalculateQuantity(products) {
    let count = 0;
    for(let product of products) {
        count += product.quantity;
    }
    return count;
}

function recalculateSubTotal(products) {
    let subTotal = 0;
    for(let product of products) {
        subTotal += product.price * product.quantity;
    }
    return subTotal;
}

function recalculateTotal(state) {
    let total = 0;
    total += recalculateSubTotal(state.products) + state.shippingCost;
    return total;
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
            if(index >= 0) {
                if(set) {
                    products[index].quantity = quantity;
                } else {
                    if(products[index].quantity + quantity > 0) {
                        products[index].quantity += quantity;
                    }
                }
            } else {
                let price = action.payload.price;
                products.push({id, quantity, price});
            }
            let stateCopy = {
                ...state,
                products: products
            }
            let newState = {
                ...state,
                products,
                quantity: recalculateQuantity(products),
                subTotal: recalculateSubTotal(products),
                total: recalculateTotal(stateCopy)
            };

            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;
        }

        case REMOVE_FROM_CART: {
            const id = action.payload.id;
            let cartIndex = state.products.findIndex((product) => {
                return product.id === id;
            });
            let productsCopy = state.products;
            productsCopy.splice(cartIndex, 1);
            let newState = {
                ...state,
                products: productsCopy,
                quantity: recalculateQuantity(state.products),
                subTotal: recalculateSubTotal(state.products),
                total: recalculateTotal(state)
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

        case SET_SHIPPING_ADDRESS: {
            let newState = {
                ...state,
                shippingAddress: action.payload.shippingAddress,
                shippingCost: Number((Math.random()*100).toFixed(2)),
            }
            newState.total = recalculateTotal(newState);

            localStorage.setItem("cart", JSON.stringify(newState));
            return newState
        }
        default:
            return state;
    }
}

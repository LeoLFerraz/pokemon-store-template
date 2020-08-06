import cart from "./cart";
import Pokemon from "../../models/Pokemon";

const state = cart();
const defaultPokemon = new Pokemon({id: 1});
const defaultPokemon2 = new Pokemon({id: 2});

describe("cart", () => {
    it("openCart", () => {
        const action = {type: "OPEN_CART", payload: {}};
        let result = cart(state, action);

        let expected = {
            ...state,
            open: true
        }
        expect(result).toEqual(expected);
    });
    it("closeCart", () => {
        const action = {type: "CLOSE_CART", payload: {}};
        let result = cart(state, action);

        let expected = {
            ...state,
            open: false
        }
        expect(result).toEqual(expected);
    });
    it("toggleCart", () => {
        const action = {type: "TOGGLE_CART", payload: {}};
        let result = cart(state, action);

        let expected = {
            ...state,
            open: true
        }
        expect(result).toEqual(expected);
    });
    it("addToCartNewPokemon", () => {
        const action = {type: "ADD_TO_CART", payload: {id: defaultPokemon.id, price: defaultPokemon.discountedPrice, set: false}};
        let result = cart(state, action);

        let expected = {
            ...state,
            products: [{id: defaultPokemon.id, quantity: 1, price: defaultPokemon.discountedPrice}],
            quantity: 1,
            subTotal: Number(defaultPokemon.discountedPrice),
            total: Number(defaultPokemon.discountedPrice + state.shippingCost)
        }
        expect(result).toEqual(expected);
    });
    it("addToCartExistingPokemon", () => {
        const action = {type: "ADD_TO_CART", payload: {id: defaultPokemon.id, price: defaultPokemon.discountedPrice, set: false}};
        let result = cart(state, action);
        result = cart(result, action)

        let expected = {
            ...state,
            products: [{id: defaultPokemon.id, quantity: 2, price: defaultPokemon.discountedPrice}],
            quantity: 2,
            subTotal: Number(defaultPokemon.discountedPrice) * 2,
            total: (Number(defaultPokemon.discountedPrice * 2)+ state.shippingCost)
        }
        expect(result).toEqual(expected);
    });
    it("addToCartFullCart", () => {
        const action = {type: "ADD_TO_CART", payload: {id: defaultPokemon.id, price: defaultPokemon.discountedPrice, set: false}};
        const secondAction = {type: "ADD_TO_CART", payload: {id: defaultPokemon2.id, price: defaultPokemon2.discountedPrice, set: false}};
        const insertion = cart(state, action);
        const secondInsertion = cart(insertion, secondAction);

        let expected = {
            ...state,
            products: [{id: defaultPokemon.id, quantity: 1, price: defaultPokemon.discountedPrice},
                {id: defaultPokemon2.id, quantity: 1, price: defaultPokemon2.discountedPrice}
            ],
            quantity: 2,
            subTotal: Number(defaultPokemon.discountedPrice) + Number(defaultPokemon2.discountedPrice),
            total: Number(defaultPokemon.discountedPrice) + Number(defaultPokemon2.discountedPrice) + state.shippingCost
        }

        expect(secondInsertion).toEqual(expected);
    });

});


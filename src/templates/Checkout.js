import React, { useState } from 'react'
import { connect } from "react-redux";
import {Dash, Plus, X} from "react-bootstrap-icons";
import {ADD_TO_CART, REMOVE_FROM_CART, SET_SHIPPING_ADDRESS} from "../redux/actionTypes";
import "../assets/styles/templates/Checkout.scss";


export function CheckoutComponent(props) {
    function updateQtyViaInput(evt, pokemonId) {
        let qty = evt.target.value;
        if(qty === "" || undefined) {
            qty = 0;
        }
        if(qty === 0 || isNaN(qty)) {
            return;
        }
        props.dispatch({type: ADD_TO_CART, payload: {
                id: pokemonId,
                quantity: Number(qty),
                set: true
            }});
    }
    function addOneQty(pokemonId) {
        props.dispatch({type: ADD_TO_CART, payload: {id: pokemonId, set: false}})
    }
    function removeOneQty(pokemonId) {
        props.dispatch({type: ADD_TO_CART, payload: {id: pokemonId, quantity: -1, set: false}})
    }
    const [address, setAddress] = useState(props.shippingAddress || '');


    let items = props.products.map(product =>{
        let pokemon = props.pokemon?.find(pokemon => pokemon.id === product.id);
        return (
            <tr className="" key={pokemon?.id}>
                <td className="">
                    <img src={pokemon?.sprite} /> <span className="product-name">{pokemon?.name}</span>
                    <Dash className=""  onClick={() => removeOneQty(pokemon.id)}/>
                    <input type="number" min="0" onChange={(evt) => {updateQtyViaInput(evt, pokemon.id)}} value={product?.quantity} className="" />
                    <Plus className="" onClick={() => addOneQty(pokemon.id)}/>
                </td>
                <td className="product-price">${(pokemon?.discountedPrice * product?.quantity).toFixed(2)}</td>
                <td className="product-remove" onClick={() => {props.dispatch({type: REMOVE_FROM_CART, payload: {id: pokemon.id}})}}><X /></td>
            </tr>
        )
    });
    return (
        <main className="checkout">
            <div className="products">
                <table>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    {items}
                </table>
                <div className={(props.shippingAddress ? 'hide' : '')}>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} />
                    <button onClick={() => props.dispatch({type: SET_SHIPPING_ADDRESS, payload: {shippingAddress: address}})}>OK</button>
                </div>
            </div>
            <div className="info">
                <span>{props.quantity} Products: {props.subTotal}</span>
                <span>Shipping: {props.shippingCost}</span>
                <div className="total">
                    <span>Total: {props.total}</span>
                </div>
                <button>Buy</button>
            </div>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.cart.products,
        quantity: state.cart.quantity,
        subTotal: state.cart.subTotal,
        total: state.cart.total,
        shippingCost: state.cart.shippingCost,
        shippingAddress: state.cart.shippingAddress,
        pokemon: state.pokemonData.pokemon
    };
};

export let Checkout = connect(mapStateToProps)(CheckoutComponent);
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
            <tr className="product-info-wrapper" key={pokemon?.id}>
                <td className="product-info">
                    <img src={pokemon?.sprite} /> <span className="product-name">{pokemon?.name}</span>
                </td>
                <td className="product-quantity">
                    <Dash className="remove-quantity-button"  onClick={() => removeOneQty(pokemon.id)}/>
                    <input type="number" min="0" onChange={(evt) => {updateQtyViaInput(evt, pokemon.id)}} value={product?.quantity} className="quantity-text" />
                    <Plus className="add-quantity-button" onClick={() => addOneQty(pokemon.id)}/>
                </td>
                <td className="product-price">${(pokemon?.discountedPrice * product?.quantity).toFixed(2)}</td>
                <td className="product-remove" onClick={() => {props.dispatch({type: REMOVE_FROM_CART, payload: {id: pokemon.id}})}}><X /></td>
            </tr>
        )
    });
    return (
        <main className="checkout container">
            <div className="products col-7">
                <table>
                    <tbody>
                        <tr>
                            <th className="info-header">Product</th>
                            <th className="quantity-header">Quantity</th>
                            <th className="price-header">Price</th>
                            <th></th>
                        </tr>
                        {items}
                    </tbody>
                </table>
                <div className={(props.shippingAddress ? 'hide' : '')}>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} />
                    <button onClick={() => props.dispatch({type: SET_SHIPPING_ADDRESS, payload: {shippingAddress: address}})}>OK</button>
                </div>
            </div>
            <div className="summary col-5">
                <span>{props.quantity} Products: {props.subTotal}</span>
                <span>Shipping: {props.shippingCost}</span>
                <div className="total">
                    <span>Total: {props.total}</span>
                </div>
                <button>Confirm Purchase</button>
            </div>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.cart.products,
        quantity: state.cart.quantity,
        subTotal: state.cart.subTotal.toFixed(2),
        total: state.cart.total.toFixed(2),
        shippingCost: state.cart.shippingCost.toFixed(2),
        shippingAddress: state.cart.shippingAddress,
        pokemon: state.pokemonData.pokemon
    };
};

export let Checkout = connect(mapStateToProps)(CheckoutComponent);

import React, { useState } from 'react'
import { connect } from "react-redux";
import { Dash, Plus, X } from "react-bootstrap-icons";
import {ADD_TO_CART, REMOVE_FROM_CART, SET_SHIPPING_ADDRESS, CLEAR_CART} from "../redux/actionTypes";
import "../assets/styles/templates/Checkout.scss";
import Swal from "sweetalert2";
import {Link, useHistory} from 'react-router-dom';
import { Button, FormControl } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

export function CheckoutComponent(props) {
    let history = useHistory();
    function resetShipping() {
        props.dispatch({type: SET_SHIPPING_ADDRESS, payload: {shippingAddress: ''}})
    }
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
    function confirmPurchase() {
        if(props.shippingAddress.length === 0) {
            Swal.fire({
                title: 'You must provide a shipping address',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else {
            Swal.fire({
                title: 'Listen up, trainer!',
                text: 'This feature is not finished. Proceeding will clear your cart to simulate a purchase. Do you wish to proceed?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.value) {
                    props.dispatch({type: CLEAR_CART});
                    Swal.fire(
                            {
                                title: 'Success!',
                                text: "We'll pretend you just bought some pokemon and you can pretend your credit card was just charged.",
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }
                    ).then(() => {
                        history.push("/");
                    });
                }
            })
        }
    }
    const [address, setAddress] = useState(props.shippingAddress || '');
    //TODO: products-table component (replacing part of minicart.js and checkout.js)
    let items = props.products.map(product =>{
        let pokemon = props.pokemon?.find(pokemon => pokemon.id === product.id);
        return (
            <tr className="product-info-wrapper" key={pokemon?.id}>
                <td className="product-info">
                    <Link to={"/pokemon/" + pokemon?.id}> <img src={pokemon?.sprite} /> </Link> <span className="product-name">{pokemon?.name}</span>
                </td>
                <td className="product-quantity">
                    <div>
                        <Dash className="remove-quantity-button"  onClick={() => removeOneQty(pokemon.id)}/>
                        <input type="number" min="0" onChange={(evt) => {updateQtyViaInput(evt, pokemon.id)}} value={product?.quantity} className="quantity-text" />
                        <Plus className="add-quantity-button" onClick={() => addOneQty(pokemon.id)}/>
                    </div>
                </td>
                <td className="product-price">${(pokemon?.discountedPrice * product?.quantity).toFixed(2)}</td>
                <td className="product-remove" onClick={() => {props.dispatch({type: REMOVE_FROM_CART, payload: {id: pokemon.id}})}}><X /></td>
            </tr>
        )
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            props.dispatch({type: SET_SHIPPING_ADDRESS, payload: {shippingAddress: address}})
        }
    });

    return (
        <main className="checkout container">
            <div className="page-title col-12">
                Checkout
            </div>
            <div className="products col-md-7 col-12">
                <table>
                    <thead>
                        <tr>
                            <th className="info-header">Product</th>
                            <th className="quantity-header">Quantity</th>
                            <th className="price-header">Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
            <div className="summary col-md-5 col-12">
                <div className={(props.shippingAddress ? 'hide' : 'shipping-address-wrapper')}>
                    <FormControl value={address} placeholder="Postal Code" onChange={(e) => setAddress(e.target.value)} className="shipping-address-input"/>
                    <Button className="shipping-address-submit" onClick={() => props.dispatch({type: SET_SHIPPING_ADDRESS, payload: {shippingAddress: address}})}>OK</Button>
                </div>
                <div className="summary-info-wrapper">
                    <div className="summary-subtotal summary-row"><div className="summary-title">Subtotal:</div> <div className="summary-value">{props.subTotal}</div></div>
                    <div className="summary-shipping-fee summary-row"><div className="summary-title">Shipping Fee
                        <span className="postal-code" onClick={() => {resetShipping()}}>{props.shippingAddress ? ' (to ' + props.shippingAddress + ')' : ''}{props.shippingAddress ? <PencilSquare/> : ''}</span>:
                    </div> <div className="summary-value">{props.shippingCost}</div></div>
                    <div className="summary-total summary-row">
                        <div className="summary-title">Total:</div> <div className="summary-value">{props.total}</div>
                    </div>
                    <Button onClick={() => confirmPurchase()}>Confirm Purchase</Button>
                </div>
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

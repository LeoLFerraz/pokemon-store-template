import React, { useState } from "react";
import "../assets/styles/components/Minicart.scss";
import { connect } from "react-redux";
import {ADD_TO_CART, CLOSE_CART, REMOVE_FROM_CART, SET_SHIPPING_ADDRESS} from "../redux/actionTypes";
import { Cart, X, Plus, Dash } from "react-bootstrap-icons";
import {Button, FormControl} from "react-bootstrap";
import {Link, useHistory } from "react-router-dom";

const MinicartComponent = (props) => {
    let history = useHistory();
    function closeCartAndRedirect() {
        props.dispatch({type: CLOSE_CART});
        setTimeout(() => {
            history.push("/checkout");
        }, 300)
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
    const [shippingAddress, setShippingAddress] = useState('');

    let items = props.products.map(product =>{
        let pokemon = props.pokemon?.find(pokemon => pokemon.id === product.id);
        return (
                <tr className="minicart-table-product" key={pokemon?.id}>
                    <td className="product-info"><Link to={"/pokemon/" + pokemon?.id}> <img src={pokemon?.sprite} /> </Link><span className="product-name">{pokemon?.name}</span></td>
                    <td className="product-quantity">
                        <div>
                            <Dash className="remove-quantity-button" onClick={() => removeOneQty(pokemon.id)}/>
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
        if (event.key === "Escape") {
            props.dispatch({type: CLOSE_CART});
        }
    });
    let calculateShippingRow = (
            <tr className="cart-shipping-row">
                <td className="cart-shipping-text">
                    Calculate Shipping Cost
                </td>
                <td className="cart-shipping-input" colSpan="2">
                    <FormControl type="text" placeholder="Postal Code" className="shipping-input" value={shippingAddress} onChange={(e) => {setShippingAddress(e.target.value)}}/>
                </td>
                <td className="cart-shipping-submit">
                    <Button className="cart-shipping-button" type="button" onClick={(e) => {props.dispatch({type: SET_SHIPPING_ADDRESS, payload: {shippingAddress: shippingAddress}})}}>OK</Button>
                </td>
            </tr>
    );
    let shippingPriceRow = (
            <tr className="cart-shipping-row">
                <td className="cart-shipping-text" colSpan="2">
                    Shipping Cost
                </td>
                <td className="cart-subtotal-value">
                    ${props.shippingCost}
                </td>
            </tr>
    );
    let productTable = () => {
        return (
                <table className="minicart-table">
                    <thead>
                    <tr>
                        <td className="table-head-product" style={{width: "50%"}}>Product</td>
                        <td className="table-head-quantity">Quantity</td>
                        <td className="table-head-price">Price</td>
                        <td className="table-head-close"></td>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    <tr className="cart-subtotal-row">
                        <td className="cart-subtotal" colSpan="2">
                            Subtotal
                        </td>
                        <td className="cart-subtotal-value">
                            ${props.subTotal.toFixed(2)}
                        </td>
                        <td></td>
                    </tr>
                    { props.shippingCost ? shippingPriceRow : calculateShippingRow }
                    <tr className="cart-checkout-row">
                        <td className="cart-total-text">
                            <span className="total-text">Total: </span>
                            <span className="total-value">${props.total.toFixed(2)}</span>
                        </td>
                        <td className="cart-checkout" colSpan="3">
                            <div onClick={() => closeCartAndRedirect()}><Button className="cart-checkout-button" type="button">Proceed to Checkout</Button></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
        )
    }

    function renderNoProducts() {
        return (
                <div className="empty-cart-message">
                    Your cart is empty! :(
                </div>
        )
    }

    return (
            <div>
                <div className={`minicart${props.open ? ' open' : ''}`}>
                    <div className="minicart-header">
                        <Cart className="minicart-header-icon"/>
                        <span className="minicart-header-title">Cart</span>
                        <span className="minicart-header-itemsCount">{props.quantity} items</span>
                        <X className="minicart-header-close" onClick={() => {props.dispatch({type: CLOSE_CART})}} />
                    </div>
                    {items.length ? productTable() : renderNoProducts()}
                </div>
                <div className={`minicart-overlay${props.open ? ' open' : ''}`} onClick={() => {props.dispatch({type: CLOSE_CART})}}>
                </div>
            </div>
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
        open: state.cart.open,
        pokemon: state.pokemonData.pokemon
    };
};

export let Minicart = connect(mapStateToProps)(MinicartComponent);

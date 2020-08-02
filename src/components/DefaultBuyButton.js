import React from "react";
import "../assets/styles/components/ProductCard.scss";
import {ADD_TO_CART, OPEN_CART} from "../redux/actionTypes";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";


const DefaultBuyButtonRenderer = (props) => {
    function addToCart() {
        props.dispatch({type: ADD_TO_CART, payload: {id: props.pokemon.id, price: props.pokemon.discountedPrice}});
        props.dispatch({type: OPEN_CART, payload: {}});
    }
    return (
            <Button className="buy-button" onClick={() => addToCart(props)}>Add to cart</Button>
    )
}

export let DefaultBuyButton = connect()(DefaultBuyButtonRenderer);

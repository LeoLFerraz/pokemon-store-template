import React from "react";
import "../assets/styles/components/Minicart.scss";
import { connect } from "react-redux";
import { CLOSE_CART } from "../redux/actionTypes";

const MinicartComponent = (props) => {
    return (
            <div>
            <div className={`minicart-overlay${props.open ? ' open' : ''}`} onClick={() => {props.dispatch({type: CLOSE_CART})}}>
            </div>
            <div className={`minicart${props.open ? ' open' : ''}`}>
                {props.products}
            </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.cart.products,
        open: state.cart.open
    };
};

export let Minicart = connect(mapStateToProps)(MinicartComponent);

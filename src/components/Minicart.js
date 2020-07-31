import React from "react";
import "../assets/styles/components/Minicart.scss";
import { connect } from "react-redux";
import { CLOSE_CART } from "../redux/actionTypes";

const MinicartComponent = (props) => {
    let items = props.products.map(product =>{
        let pokemon = props.pokemon?.find(pokemon => pokemon.id === product.id);
        return (
            <div>
                <img src={pokemon?.sprite} />
                {pokemon?.name}
                {product?.quantity}
            </div>
        )
    });
    return (
            <div>
            <div className={`minicart-overlay${props.open ? ' open' : ''}`} onClick={() => {props.dispatch({type: CLOSE_CART})}}>
            </div>
            <div className={`minicart${props.open ? ' open' : ''}`}>
                {items}
            </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.cart.products,
        open: state.cart.open,
        pokemon: state.pokemonData.pokemon
    };
};

export let Minicart = connect(mapStateToProps)(MinicartComponent);

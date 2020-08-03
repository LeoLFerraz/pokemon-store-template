import React from "react";
import "../assets/styles/components/ProductCard.scss";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {ADD_POKEMON_COMPARE} from "../redux/actionTypes";
import { DefaultBuyButton } from "./DefaultBuyButton";
import { PlusCircleFill } from "react-bootstrap-icons";


export const ProductCardComponent = (props) => {
    return (
            <div className="productCard">
                <Link to={'/pokemon/' + props.pokemon.id}>
                    <img alt={props.pokemon.name} src={props.pokemon.sprite} />
                    <br />
                    <div className="card-name">
                        {props.pokemon.name}
                    </div>
                    <div className="card-price">
                        <div className="list-price">
                            {Number(props.pokemon.discountedPrice) < Number(props.pokemon.price) ? '$' + props.pokemon.price : ''}
                        </div>
                        <div className="best-price">
                            ${Number(props.pokemon.discountedPrice) < Number(props.pokemon.price) ? props.pokemon.discountedPrice : props.pokemon.price}
                            <div className="card-discount-percentage" style={{display: props.pokemon.priceDifference > 0 ? 'inline' : 'none'}}>
                                -{props.pokemon.priceDifference > 0 && props.pokemon.priceDifference + "%"}
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="compare-button" onClick={() => props.dispatch({type: ADD_POKEMON_COMPARE, payload: {id: props.pokemon.id}})} disabled={props.comparing || props.full}>
                    <PlusCircleFill className={props.comparing || props.full ? 'disabled' : ''} />
                    <button type="button" disabled={props.comparing || props.full}>Compare</button>
                </div>
                <DefaultBuyButton className="buy-button" pokemon={props.pokemon}>Add to Cart</DefaultBuyButton>
            </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    let comparing = state.pokemonCompare.comparing.some((id) => {
        return state.pokemonCompare.comparing.includes(ownProps.pokemon.id)
    });
    let full = state.pokemonCompare.comparing.length >= 5;
    return {
        comparing: comparing,
        full: full
    };
};

export let ProductCard = connect(mapStateToProps)(ProductCardComponent);

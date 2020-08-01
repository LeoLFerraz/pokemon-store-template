import React from "react";
import "../assets/styles/components/ProductCard.scss";
import {Link} from "react-router-dom";
import { DefaultBuyButton } from "../components/DefaultBuyButton";


export const ProductCard = (props) => {
    return (
        <div className="productCard">
            <Link to={'/pokemon/' + props.pokemon.id}>
                <img alt={props.pokemon.name} src={props.pokemon.sprite} />
                <br />
                <div className="card-name">
                    {props.pokemon.name}
                </div>
                <div className="card-price">
                    ${props.pokemon.price}
                </div>
                <div className="card-best-price">
                    ${props.pokemon.discountedPrice}
                </div>
                <div className="card-discount-percentage">
                    {props.pokemon.priceDifference > 0 && props.pokemon.priceDifference + "% Off"}
                </div>
            </Link>
            <div>
                <DefaultBuyButton pokemon={props.pokemon}>Add to Cart</DefaultBuyButton>
            </div>
        </div>
    )
}

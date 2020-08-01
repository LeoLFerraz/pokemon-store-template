import React from "react";
import "../assets/styles/components/ProductCard.scss";
import {Link} from "react-router-dom";


export const ProductCard = (props) => {
    return (
        <div className="productCard">
            <Link to={'/pokemon/' + props.pokemon.id}>
                <img src={props.pokemon.sprite} />
                <br />
                {props.pokemon.name}
                <br />
                {props.pokemon.price}
                <br />
                {props.pokemon.priceDifference > 0 && props.pokemon.priceDifference + "% Off"}
            </Link>
        </div>
    )
}

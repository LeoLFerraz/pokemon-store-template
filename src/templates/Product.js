import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { DefaultBuyButton } from "../components/DefaultBuyButton";
import { useHistory } from 'react-router-dom';
import { DefaultCarousel } from "../components/DefaultCarousel";
import "../assets/styles/templates/Product.scss";


function ProductComponent(props) {
    let pokeInfo;
    let sprites;
    let history = useHistory();
    const [activeImage, setActiveImage] = useState(props.pokemon?.sprites[0]);
    useEffect(() => {
        // Update the document title using the browser API
        setActiveImage(props.pokemon?.sprites[0])
    }, [props.pokemon]);
    if(props.pokemon === undefined) {
       // history.push("/404");
    } else {
        let types = props.pokemon?.types.map(type =>{
            return (<div> {type} </div>)
        });
        let evolutions = props.pokemon?.evolutions.map(evolution =>{
            return(
                <div style={{color: 'black', display: 'inline'}}>
                    <img src={evolution.sprite} alt="placeholder" />
                    {evolution.name}
                </div>)
        })
        sprites = props.pokemon?.sprites.map(sprite => {
            return (
                <img src={sprite} alt={props.pokemon?.name} key={sprite} onClick={() => setActiveImage(sprite)}/>
            )
        });
    }
    return (
        <main className="product">
            <div className="container">
                <div className="row">
                <div className="col-7 product-gallery">
                    <div className="sprites-carousel-wrapper">
                        <DefaultCarousel desktopShow={3} arrows={true} column={true} lazyLoad={false} swipe={false}>
                            {sprites}
                        </DefaultCarousel>
                    </div>
                    <div className="active-sprite">
                        <img src={activeImage} alt={props.pokemon?.name} />
                    </div>
                </div>
                <div className="col-5">
                    <div className="product-name">
                        {props.pokemon?.name}
                    </div>
                    <div className="product-reference">
                        <span className="pokedex-reference-title">Pokedex ID: </span>
                        <span className="pokedex-reference-value">{props.pokemon?.id}</span>
                    </div>
                    <div className="product-price">
                        <div className="list-price">
                            {Number(props.pokemon?.discountedPrice) < Number(props.pokemon?.price) ? '$' + props.pokemon?.price : ''}
                            <div className="card-discount-percentage" style={{display: props.pokemon?.priceDifference > 0 ? 'inline-block' : 'none'}}>
                                {props.pokemon?.priceDifference > 0 && props.pokemon?.priceDifference + "% Off!"}
                            </div>
                        </div>
                        <div className="best-price">
                            ${Number(props.pokemon?.discountedPrice) < Number(props.pokemon?.price) ? props.pokemon?.discountedPrice : props.pokemon?.price}
                        </div>
                    </div>
                    <div className="buy-button-wrapper">
                        <DefaultBuyButton className="buy-button" pokemon={props.pokemon}>Add to Cart</DefaultBuyButton>
                    </div>
                </div>
            </div>
            </div>
            <div className="product-details-container-wrapper">
                <div className="container">
                    <div className="row">
                    <div className="col-12 product-details-wrapper">
                        <table className="product-details">
                            <tr>
                                <td colSpan={2} className="table-image">
                                    <img src={props.pokemon.sprite} alt={props.pokemon.alt} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Name
                                </td>
                                <td>
                                    {props.pokemon.name}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Pokedex ID
                                </td>
                                <td>
                                    {props.pokemon.id}
                                </td>
                            </tr>
                            {Object.keys(props.pokemon.stats).map((stat) => {
                                return (
                                    <tr>
                                        <td>
                                            {stat}
                                        </td>
                                        <td>
                                            {props.pokemon.stats[stat]}
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td>
                                    Evolution Chain
                                </td>
                                <td>
                                {props.pokemon.evolutions.map((evolution) => {
                                    return (
                                        <div>
                                            <img src={evolution.sprite} alt={evolution.name} />
                                            <span className="evolution-name">{evolution.name}</span>
                                        </div>
                                    )
                                })}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = (state, ownProps) => {
    let pokemon = state.pokemonData.pokemon?.find(element =>{
        return element.id == ownProps.id;
    });
    return {
        pokemon
    }
};

export let Product = connect(mapStateToProps)(ProductComponent);

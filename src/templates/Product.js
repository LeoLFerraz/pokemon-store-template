import React from 'react'
import { connect } from 'react-redux';
import {ADD_TO_CART, OPEN_CART} from "../redux/actionTypes";


function ProductComponent(props) {
    let pokeInfo;
    if(props.pokemon === undefined) {
        pokeInfo = 'Not found'
    }else{
        let types = props.pokemon.types.map(type =>{
            return (<div style={{color: 'black'}}> {type} </div>)
        });
        let evolutions = props.pokemon.evolutions.map(evolution =>{
            return(
                <div style={{color: 'black', display: 'inline'}}>
                    <img src={evolution.sprite} alt="placeholder" />
                    {evolution.name}
                </div>)
        })
        pokeInfo = <div  style={{color: 'black'}}>
            <img alt="placeholder" src={props.pokemon.sprite} />
            <img alt="placeholder" src={props.pokemon.spriteShiny} />

            <br />
            Name: {props.pokemon.name}
            <br />
            Price: {props.pokemon.price}
            <br />
            {props.pokemon.price === props.pokemon.discountedPrice ? '' : `New Price: ${props.pokemon.discountedPrice}`}
            <br />
            {props.pokemon.generation}
            <br />
            id: {props.pokemon.id}
            <br />
            HP: {props.pokemon.stats.hp}
            <br />
            HP: {props.pokemon.stats.hp}
            <br />
            Attack: {props.pokemon.stats.attack}
            <br />
            Defense: {props.pokemon.stats.defense}
            <br />
            Special Attack: {props.pokemon.stats['special-attack']}
            <br />
            Special Defense: {props.pokemon.stats['special-defense']}
            <br />
            Speed: {props.pokemon.stats.speed}
            <br />
            {types}
            <br />
            <button onClick={() => addToCart(props)}>Add to cart</button>
            {evolutions}
        </div>
    }
    return (
        <main  style={{color: 'black', textAlign: 'center'}}>
            {pokeInfo}
        </main>
    )
}

const addToCart = (props) => {
    props.dispatch({type: ADD_TO_CART, payload: {id: props.pokemon.id}});
    props.dispatch({type: OPEN_CART, payload: {}});
}

const mapStateToProps = (state, ownProps) => {
    let pokemon = state.pokemonData.pokemon.find(element =>{
        return element.id == ownProps.id;
    });
    return {
        pokemon
    }
};

export let Product = connect(mapStateToProps)(ProductComponent);

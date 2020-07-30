import React from 'react'
import { connect } from 'react-redux';

function ProductComponent(props) {
    console.log(props.pokemon);
    let pokeInfo;
    if(props.pokemon === undefined) {
        pokeInfo = 'Not found'
    }else{
        let types = props.pokemon.types.map(type =>{
            return (<div style={{color: 'black'}}> {type.type.name} </div>)
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
            {props.pokemon.price === props.pokemon.discount ? '' : `New Price: ${props.pokemon.discount}`}
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
            {evolutions}
        </div>
    }
    return (
        <main  style={{color: 'black', textAlign: 'center'}}>
            {pokeInfo}
        </main>
    )
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

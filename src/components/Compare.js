import React from 'react';
import "../assets/styles/components/Compare.scss";
import { connect } from "react-redux";
import {REMOVE_POKEMON_COMPARE, CLOSE_COMPARE} from "../redux/actionTypes";
import { XCircle } from "react-bootstrap-icons";


function CompareComponent(props) {
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            props.dispatch({type: CLOSE_COMPARE});
        }
    });

    let removeRow = props.pokemon.map((item) => (<td><button onClick={() => props.dispatch({type: REMOVE_POKEMON_COMPARE, payload: {id: item.id}})}>Remove</button></td>));
    let spriteRow = props.pokemon.map((item) => (<td><img src={item?.sprite} /></td>));
    let nameRow = props.pokemon.map((item) => (<td>{item?.name}</td>));
    let typeRow = props.pokemon.map((item) => {
        return (
            <td>{item?.types.map((type, index) => {
                if(index !== item.types.length-1) {
                    return type + "/";
                } else {
                    return type;
                }
            })}</td>
        )
    });
    let hpRow = props.pokemon.map((item) => (<td>{item?.stats.hp}</td>));
    let attackRow = props.pokemon.map((item) => (<td>{item?.stats.attack}</td>));
    let defenseRow = props.pokemon.map((item) => (<td>{item?.stats.defense}</td>));
    let spAttackRow = props.pokemon.map((item) => (<td>{item?.stats['special-attack']}</td>));
    let spDefenseRow = props.pokemon.map((item) => (<td>{item?.stats['special-defense']}</td>));
    let speedRow = props.pokemon.map((item) => (<td>{item?.stats.speed}</td>));
    let table = (
        <table>
            <tr>
                <th></th>
                {spriteRow}
            </tr>
            <tr>
                <th>Name</th>
                {nameRow}
            </tr>
            <tr>
                <th>Type</th>
                {typeRow}
            </tr>
            <tr>
                <th>HP</th>
                {hpRow}
            </tr>
            <tr>
                <th>Attack</th>
                {attackRow}
            </tr>
            <tr>
                <th>Defense</th>
                {defenseRow}
            </tr>
            <tr>
                <th>Special Attack</th>
                {spAttackRow}
            </tr>
            <tr>
                <th>Special Defence</th>
                {spDefenseRow}
            </tr>
            <tr>
                <th>Speed</th>
                {speedRow}
            </tr>
        </table>
    );
    let empty = (<div> Add pokemons to compare</div>);

    return (
        <div>
            <div className={`compare ${props.open ? ' open' : ''}`}>
                <XCircle className="close" onClick={() => {props.dispatch({type: CLOSE_COMPARE})}} />
                { (props.pokemon.length > 0) ? table : empty}
            </div>
            <div className={`compare-modal-overlay ${props.open ? ' open' : ''}`} onClick={() => {props.dispatch({type: CLOSE_COMPARE})}} />
        </div>
    )
}

const mapStateToProps = (state) => {
    let pokemon = state.pokemonCompare.comparing.map((id) => {
        return state.pokemonData.pokemon.find((item) => item.id === id)
    });
    return {
        pokemon: pokemon,
        open: state.pokemonCompare.open
    };
};

export let Compare = connect(mapStateToProps)(CompareComponent);

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

    let removeRow = props.pokemon.map((item) => (<td key={"remove" + item.name}><button onClick={() => props.dispatch({type: REMOVE_POKEMON_COMPARE, payload: {id: item.id}})}>Remove</button></td>));
    let spriteRow = props.pokemon.map((item) => (<td key={"sprite" + item.name}><img alt={item?.name} src={item?.sprite} /></td>));
    let nameRow = props.pokemon.map((item) => (<td key={"name" + item.name}>{item?.name}</td>));
    let typeRow = props.pokemon.map((item) => {
        return (
            <td key={"type" + item.name}>{item?.types.map((type, index) => {
                if(index !== item.types.length-1) {
                    return type + "/";
                } else {
                    return type;
                }
            })}</td>
        )
    });
    let hpRow = props.pokemon.map((item) => (<td key={"hp" + item.name}>{item?.stats.hp}</td>));
    let attackRow = props.pokemon.map((item) => (<td key={"attack" + item.name}>{item?.stats.attack}</td>));
    let defenseRow = props.pokemon.map((item) => (<td key={"defense" + item.name}>{item?.stats.defense}</td>));
    let spAttackRow = props.pokemon.map((item) => (<td key={"spAttack" + item.name}>{item?.stats['special-attack']}</td>));
    let spDefenseRow = props.pokemon.map((item) => (<td key={"spDefense" + item.name}>{item?.stats['special-defense']}</td>));
    let speedRow = props.pokemon.map((item) => (<td key={"speed" + item.name}>{item?.stats.speed}</td>));
    let table = (
        <table>
            <tbody>
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
            </tbody>
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

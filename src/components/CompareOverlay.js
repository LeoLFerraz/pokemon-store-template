import React from "react";
import {connect} from "react-redux";
import "../assets/styles/components/CompareOverlay.scss";
import { useHistory } from 'react-router-dom'
import {REMOVE_POKEMON_COMPARE, OPEN_COMPARE} from "../redux/actionTypes";
import {XCircle} from "react-bootstrap-icons";


const CompareOverlayComponent = (props) => {
    let sprites = props.pokemon.map((item) =>{
        return (
            <div className="sprite-wrapper" key={item.name} onClick={() => props.dispatch({type: REMOVE_POKEMON_COMPARE, payload: {id: item?.id}})}>
                <img alt={item?.name} src={item?.sprite}/>
                <XCircle ></XCircle>
            </div>
        )
    });
    let history = useHistory();
    let classes = `compare-overlay compare-hide ${ props.quantity > 1 ? 'compare-show' : ''}`;
    return (
            <div className={classes}>
                <div>
                    <div className="spriteRow">
                        {sprites}
                    </div>
                    <button onClick={() => props.dispatch({type: OPEN_COMPARE})}>Compare</button>
                </div>
            </div>
    )
};

const mapStateToProps = (state) => {
    let pokemon = state.pokemonCompare.comparing.map((id) => {
        return state.pokemonData.pokemon.find((item) => item.id === id)
    });
    return {
        quantity: state.pokemonCompare.comparing.length,
        pokemon: pokemon
    };
};

export let CompareOverlay = connect(mapStateToProps)(CompareOverlayComponent);

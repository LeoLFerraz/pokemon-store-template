import { combineReducers } from "redux";
import cart from "./cart";
import pokemonData from "./pokemonData";

export default combineReducers({ cart, pokemonData });

import { combineReducers } from "redux";
import cart from "./cart";
import pokemonData from "./pokemonData";
import pokemonCompare from "./pokemonCompare";
import globalApp from "./globalApp";

export default combineReducers({ cart, pokemonData, pokemonCompare, globalApp });

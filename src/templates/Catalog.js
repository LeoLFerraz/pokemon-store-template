import React from 'react'
import CatalogModel from "../models/Catalog";
import { useSelector } from 'react-redux';

export function Catalog(props) {
    let pokeData = useSelector((store) => {return store.pokemonData.pokemon});

    let cat = new CatalogModel({id: 5}, pokeData);
    let cat2 = new CatalogModel({id: {gt: 5}}, pokeData);

    return (
        <main>
            Catalog Test
        </main>
    )
}

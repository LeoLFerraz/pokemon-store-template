import React, { useState } from 'react'
import CatalogModel from "../models/Catalog";
import { useSelector } from 'react-redux';

export function Catalog(props) {
    let query = new URLSearchParams(props.query);
    const [name, setName] = useState(query.get('name') || '');
    const [generations, setGenerations] = useState(query.get('generations')?.split(',') || []);
    const [types, setTypes] = useState(query.get('types')?.split(',') || []);
    const [attack, setAttack] = useState(query.get('attack') || '');
    const [defense, setDefense] = useState(query.get('defense') || '');
    const [hp, setHp] = useState(query.get('hp') || '');
    const [speed, setSpeed] = useState(query.get('speed') || '');
    const [spAttack, setSpAttack] = useState(query.get('spAttack') || '');
    const [spDefense, setSpDefense] = useState(query.get('spDefense') || '');
    const [orderBy, setOrderBy] = useState(query.get('orderBy') || 'id');
    const [seller, setSeller] = useState(query.get('seller') || '');

    let pokeData = useSelector((store) => {return store.pokemonData});
    let cat = new CatalogModel({name: name, types: types, generations: generations, stats:{attack, defense, hp, speed, spAttack, spDefense}, orderBy: orderBy, seller: seller}, pokeData.pokemon);

    let generationsOption = pokeData.generations.map(generation => {
        return (
                <option value={generation}>{generation}</option>
        )
    });
    let typesOption = pokeData.types.map(type => {
        return (
                <option value={type}>{type}</option>
        )
    });
    let pokemon = cat.catalog.map(item =>{
        return (
                <div>
                    <img src={item.sprite} />
                    {item.name}
                    {item.price}
                </div>
        )
    });

    return (
            <main>
                <label>
                    Name:
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Generation:
                    <select value={generations} onChange={(e) => setGenerations(Array.from(e.target.selectedOptions, (item) => item.value))} multiple={true}>
                        {generationsOption}
                    </select>
                </label>
                <button onClick={() => setGenerations([])}>Clear Selection</button>
                <label>
                    Type
                    <select value={types} onChange={(e) => setTypes(Array.from(e.target.selectedOptions, (item) => item.value))} multiple={true}>
                        {typesOption}>
                    </select>
                </label>
                <button onClick={() => setTypes([])}>Clear Selection</button>
                <label>
                    Defense:
                    <input value={defense} onChange={(e) => setDefense(e.target.value)} type='text'/>
                </label>
                <label>
                    Attack:
                    <input value={attack} onChange={(e) => setAttack(e.target.value)} type='text'/>
                </label>
                <label>
                    Hp:
                    <input value={hp} onChange={(e) => setHp(e.target.value)} type='text'/>
                </label>
                <label>
                    Speed:
                    <input value={speed} onChange={(e) => setSpeed(e.target.value)} type='text'/>
                </label>
                <label>
                    Special Attack:
                    <input value={spAttack} onChange={(e) => setSpAttack(e.target.value)} type='text'/>
                </label>
                <label>
                    Special Defense:
                    <input value={spDefense} onChange={(e) => setSpDefense(e.target.value)} type='text'/>
                </label>
                <label>
                    Order By:
                    <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                        <option value='id'>Id</option>
                        <option value='name'>Name</option>
                        <option value='attack'>Attack</option>
                        <option value='defense'>Defense</option>
                        <option value='hp'>HP</option>
                        <option value='speed'>Speed</option>
                        <option value='spAttack'>Special Attack</option>
                        <option value='spDefense'>Special Defense</option>

                    </select>
                </label>
                {pokemon}
            </main>
    )
}

import React, { useState } from 'react'
import CatalogModel from "../models/Catalog";
import { ProductCard } from "../components/ProductCard";
import { useSelector } from 'react-redux';
import Select from "react-select";
import { FormControl } from "react-bootstrap";
import '../assets/styles/templates/Catalog.scss';

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
        return {
            value: generation,
            label: generation.split("-")[1].toUpperCase()
        }
    });
    let typesOption = pokeData.types.map(type => {
        if(type === 'fire') {
            return {};
        }
        return {
            value: type,
            label: type
        }
    });
    let pokemon = cat.catalog.map(item =>{
        return (
            <ProductCard pokemon={item}/>
        )
    });
    let orderByOptions = [
        {
            value: "id",
            label: "Pokedex"
        },
        {
            value: "name",
            label: "Name"
        },
        {
            value: "priceAsc",
            label: "Cheapest"
        },
        {
            value: "discount",
            label: "Biggest Discount"
        },
        {
            value: "hp",
            label: "Health Points"
        },
        {
            value: "attack",
            label: "Attack"
        },
        {
            value: "spAttack",
            label: "Sp. Attack"
        },
        {
            value: "defense",
            label: "Defense"
        },
        {
            value: "spDefense",
            label: "Sp. Defense"
        },
        {
            value: "speed",
            label: "Speed"
        },
        {
            value: "priceDesc",
            label: "Most Expensive"
        },

    ]


    return (
        <main className="container catalog">
            <div className="row catalog-header">
                <div className="col-9 catalog-title">
                    Catalog
                </div>
                <div className="col-3 catalog-orderBy">
                    <label>
                        Order By:
                        <Select defaultValue={orderByOptions.find((item) => { return item.value == orderBy}) || orderByOptions[0]} onChange={(e) => setOrderBy(e.value)} options={orderByOptions} />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <label>
                        Name
                        <FormControl type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label>
                        Generation
                        <Select defaultValue={generationsOption.find((item) => { return item.value == generations}) || generationsOption[0]}  onChange={(e) => e !== null ? setGenerations(e.map((item) => {return item.value})) : setGenerations([])} isMulti className="catalog-select" options={generationsOption}/>
                    </label>
                    <label>
                        Type
                        <Select defaultValue={typesOption.find((item) => { return item.value == types}) || typesOption[0]} onChange={(e) => e !== null ? setTypes(e.map((item) => {return item.value})) : setTypes([])} isMulti className="catalog-select" options={typesOption}/>
                    </label>
                    <label>
                        Defense
                        <FormControl value={defense} onChange={(e) => setDefense(e.target.value)} type='text'/>
                    </label>
                    <label>
                        Attack
                        <FormControl value={attack} onChange={(e) => setAttack(e.target.value)} type='text'/>
                    </label>
                    <label>
                        Hp
                        <FormControl value={hp} onChange={(e) => setHp(e.target.value)} type='text'/>
                    </label>
                    <label>
                        Speed
                        <FormControl value={speed} onChange={(e) => setSpeed(e.target.value)} type='text'/>
                    </label>
                    <label>
                        Special Attack
                        <FormControl value={spAttack} onChange={(e) => setSpAttack(e.target.value)} type='text'/>
                    </label>
                    <label>
                        Special Defense
                        <FormControl value={spDefense} onChange={(e) => setSpDefense(e.target.value)} type='text'/>
                    </label>
                </div>
                <div className="col-9 catalog-results">
                    {pokemon}
                </div>
            </div>
        </main>
    )
}

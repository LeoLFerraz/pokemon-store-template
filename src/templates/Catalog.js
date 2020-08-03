import React, { useState } from 'react'
import CatalogModel from "../models/Catalog";
import { ProductCard } from "../components/ProductCard";
import { useSelector } from 'react-redux';
import Select from "react-select";
import {Collapse, FormControl} from "react-bootstrap";
import '../assets/styles/templates/Catalog.scss';
import { ArrowUp } from "react-bootstrap-icons";
import { configs } from "../config/variables";

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

    const [mobFilterMenuOpen, setMobFilterMenuOpen] = useState(true);

    let pokeData = useSelector((store) => {return store.pokemonData});
    let cat = new CatalogModel({name: name, types: types, generations: generations, stats:{attack, defense, hp, speed, spAttack, spDefense}, orderBy: orderBy, seller: seller}, pokeData.pokemon);

    let generationsOption = pokeData.generations.map(generation => {
        return {
            value: generation,
            label: generation.split("-")[1].toUpperCase()
        }
    });
    let typesOption = pokeData.types.map(type => {
        return {
            value: type,
            label: type
        }
    }).filter(type => {
        return type.value !== configs.storeType;
    });
    let pokemon = cat.catalog.map(item =>{
        return (
            <ProductCard key={item.name} pokemon={item}/>
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
    let sellerOptions = [
        {
            value: 'pokeStore',
            label: 'PokeStore'
        },
        {
            value: 'digiStore',
            label: 'DigiStore'
        }
    ]


    return (
        <main className="container catalog">
            <div className="row catalog-header">
                <div className="col-md-9 col-12 catalog-title page-title">
                    Catalog
                </div>
                <div className="col-3 d-md-block d-none catalog-orderBy">
                    <label>
                        Order By:
                        <Select defaultValue={orderByOptions.find((item) => { return item.value == orderBy}) || orderByOptions[0]} onChange={(e) => setOrderBy(e.value)} classNamePrefix="select" options={orderByOptions} />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="d-md-none d-flex mobile-filters-control" onClick={() => {setMobFilterMenuOpen(!mobFilterMenuOpen)}} aria-controls="filters" aria-expanded={mobFilterMenuOpen} >
                    <ArrowUp className={mobFilterMenuOpen ? '' : ' rotate-arrow'}/>
                    <span>Filters</span>
                </div>
                <Collapse in={mobFilterMenuOpen} className="col-md-3 col-12">
                    <div id="filters">
                        <div>
                            <label>
                                Name
                                <FormControl type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                            </label>
                            <label>
                                Generation
                                <Select defaultValue={generationsOption.find((item) => { return item.value == generations}) || []}  onChange={(e) => e !== null ? setGenerations(e.map((item) => {return item.value})) : setGenerations([])} isMulti className="catalog-select" classNamePrefix="select" options={generationsOption}/>
                            </label>
                            <label>
                                Type
                                <Select defaultValue={typesOption.find((item) => { return item.value == types}) || []} onChange={(e) => e !== null ? setTypes(e.map((item) => {return item.value})) : setTypes([])} isMulti className="catalog-select" classNamePrefix="select" options={typesOption}/>
                            </label>
                            <label>
                                Min. Defense
                                <FormControl value={defense} onChange={(e) => setDefense(e.target.value)} type='number'/>
                            </label>
                            <label>
                                Min. Attack
                                <FormControl value={attack} onChange={(e) => setAttack(e.target.value)} type='number'/>
                            </label>
                            <label>
                                Min. Hp
                                <FormControl value={hp} onChange={(e) => setHp(e.target.value)} type='number'/>
                            </label>
                            <label>
                                Min. Speed
                                <FormControl value={speed} onChange={(e) => setSpeed(e.target.value)} type='number'/>
                            </label>
                            <label>
                                Min. Special Attack
                                <FormControl value={spAttack} onChange={(e) => setSpAttack(e.target.value)} type='number'/>
                            </label>
                            <label>
                                Min. Special Defense
                                <FormControl  value={spDefense} onChange={(e) => setSpDefense(e.target.value)} type='number'/>
                            </label>
                            <label>
                                Seller
                                <Select defaultValue={sellerOptions.find((item) => { return item.value == seller}) || []} onChange={(e) => e !== null ? setSeller(e.value) : setSeller([])} className="catalog-select" classNamePrefix="select" options={sellerOptions}/>
                            </label>
                        </div>
                    </div>
                </Collapse>
                <div className="col-md-9 col-12 catalog-results">
                    {pokemon.length > 0 ? pokemon : <div className="empty-results">Sorry, no pokemon found for these search parameters :(</div>}
                </div>
            </div>
        </main>
    )
}

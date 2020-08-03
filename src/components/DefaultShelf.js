import React from "react";
import CatalogModel from "../models/Catalog";
import {useSelector} from "react-redux";
import {ProductCard} from "./ProductCard";
import { DefaultCarousel } from "./DefaultCarousel";

export const DefaultShelf = (props) => {
    const pokemon = useSelector((store) => {return store.pokemonData.pokemon});
    const sliderSettings = {
        dots: props.slider?.dots,
        lazyLoad: props.slider?.lazyLoad || true,
        desktopShow: props.slider?.desktopShow || 4,
        autoplay: props.slider?.autoplay,
        autoplaySpeed: props.slider?.autoplaySpeed,
        arrows: props.slider?.arrows || true,
        swipe:  props.slider?.swipe || true,
        column: props.column,
        mobileShow: props.slider?.mobileShow || 2
    };
    const catalogSettings ={
        name: props.catalog?.name || '',
        types: props.catalog?.types || [],
        generations: props.catalog?.generations || [],
        stats:{
            attack: props.catalog?.stats?.attack || '',
            defense: props.catalog?.stats?.defense || '',
            hp: props.catalog?.stats?.hp || '',
            speed: props.catalog?.stats?.speed || '',
            spAttack: props.catalog?.stats?.spAttack || '',
            spDefense: props.catalog?.stats?.spDefense || ''
        },
        orderBy: props.catalog?.orderBy || '',
        seller: props.catalog?.seller || ''
    };
    let cat;
    let cards;
    if(pokemon){
        cat = new CatalogModel(catalogSettings, pokemon);
        cards = cat.catalog.map(item =>{
            return (
                    <ProductCard pokemon={item}/>
            )
        });
    }
    return (
            <div className="default-carousel">
                <DefaultCarousel {...sliderSettings}>
                    {cards}
                </DefaultCarousel>
            </div>
    )
};

import React from 'react';
import { DefaultCarousel } from "../components/DefaultCarousel";
import "../assets/styles/templates/Home.scss";

export function Home(props) {
    // Full-Width Banner
    // (100% width, 500px height) DESK
    // (100% width, 365px height) MOB

    // Highlights of the Day (Shelf)
    // (310px width, 500px height per product card) DESK
    // (320px width, 470px height per product card) MOB

    // Flash Promotions (Shelf)
    // (310px width, 500px height per product card) DESK
    // (320px width, 470px height per product card) MOB

    // Banner Mosaic
    // (2 square images: 30% width, auto height)
    // (1 horizontal image: 60% width, auto height)
    // (1 vertical image: 30% width, 100% height) DESK
    // (4 100% width, auto height images) MOB

    return (
        <main className="home">
            <DefaultCarousel arrows={true} dots={true}>
                <img src="https://via.placeholder.com/1920x450.png?text=COVID-19+and+Pokemon: a message from Nurse Joy" alt="Pokemon"/>
                <img src="https://via.placeholder.com/1920x450.png?text=PokeWhey:+Pokemon+Strength+Supplements" alt="Pokemon"/>
                <img src="https://via.placeholder.com/1920x450.png?text=PokeOffer+of+the+Week" alt="Pokemon"/>
                <img src="https://via.placeholder.com/1920x450.png?text=Daily+PokeDeals!" alt="Pokemon"/>
            </DefaultCarousel>
        </main>
    )
}

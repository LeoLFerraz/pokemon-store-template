import React from 'react';
import "../assets/styles/viewparts/Header.scss";
import { DefaultCarousel } from "../components/DefaultCarousel";
import { InfoCircle, ExclamationCircle } from "react-bootstrap-icons";

export function Header(props) {
    // Tipbar (hidden if scroll-top is anywhere but 0);
    // Header (Logo, Searchbar, user module, minicart button)
    // Nav

    return (
            <header className="header">
                <div id="header-tipbar">
                    <DefaultCarousel arrows={false} autoplay={true} autoplaySpeed={3000} dots={false}>
                        <span><ExclamationCircle />Stay safe during the COVID-19 pandemic, trainers! That gym badge can wait.</span>
                        <span><InfoCircle />Download our app for Pokedroid or iPoke, click here!</span>
                    </DefaultCarousel>
                </div>
                <div className="container">
                    <div id="header">
                        Header
                    </div>
                    <nav>
                        Menu
                    </nav>
                </div>
            </header>
    )
}

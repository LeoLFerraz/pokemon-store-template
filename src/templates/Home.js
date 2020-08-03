import React from 'react';
import { DefaultCarousel } from "../components/DefaultCarousel";
import { DefaultShelf } from "../components/DefaultShelf"
import "../assets/styles/templates/Home.scss";
import { configs } from "../config/variables";

export function Home(props) {
    // TODO:
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
    // (2 100% width, auto height images) MOB

    return (
            <main className="home">
                <div className="d-xl-block d-none">
                    <DefaultCarousel arrows={true} dots={true} lazyLoad={true} swipe={true}>
                        <img src={"https://via.placeholder.com/1920x450/" + configs.bannerBGColor + "/464646/?text=COVID-19+and+Pokemon: a message from Nurse Joy"} alt="Pokemon"/>
                        <img src={"https://via.placeholder.com/1920x450/" + configs.bannerBGColor + "/464646/?text=PokeWhey:+Pokemon+Strength+Supplements"} alt="Pokemon"/>
                        <img src={"https://via.placeholder.com/1920x450/" + configs.bannerBGColor + "/464646/?text=PokeOffer+of+the+Week"} alt="Pokemon"/>
                        <img src={"https://via.placeholder.com/1920x450/" + configs.bannerBGColor + "/464646/?text=Daily+PokeDeals!"} alt="Pokemon"/>
                    </DefaultCarousel>
                </div>
                <div className="d-xl-none d-block">
                    <DefaultCarousel arrows={false} dots={true} lazyLoad={true} swipe={true}>
                        <img src={"https://via.placeholder.com/365x342/" + configs.bannerBGColor + "/464646/?text=COVID-19+and+Pokemon: a message from Nurse Joy"} alt="Pokemon"/>
                        <img src={"https://via.placeholder.com/365x342/" + configs.bannerBGColor + "/464646/?text=PokeWhey:+Pokemon+Strength+Supplements"} alt="Pokemon"/>
                        <img src={"https://via.placeholder.com/365x342/" + configs.bannerBGColor + "/464646/?text=PokeOffer+of+the+Week"} alt="Pokemon"/>
                        <img src={"https://via.placeholder.com/365x342/" + configs.bannerBGColor + "/464646/?text=Daily+PokeDeals!"} alt="Pokemon"/>
                    </DefaultCarousel>
                </div>
                <div className="container">
                    <div>
                        <h2 className="shelf-title">Weekly Deals!</h2>
                        <DefaultShelf slider={{mobileShow: 1, dots: true}} catalog={{flag: 'Weekly_Promotion'} }/>
                    </div>
                    <div className="mosaicBanner">
                        <div className="col-md-8 col-12">
                            <img src={"https://via.placeholder.com/450x450/" + configs.bannerBGColor + "/464646/?text=PokeMosaic+Square"} className="mosaicBanner-1"/>
                            <img src={"https://via.placeholder.com/450x450/" + configs.bannerBGColor + "/464646/?text=PokeMosaic+Square"} className="mosaicBanner-2"/>
                            <img src={"https://via.placeholder.com/900x450/" + configs.bannerBGColor + "/464646/?text=PokeMosaic+Rectangle"} className="mosaicBanner-3 d-none d-md-block"/>
                        </div>
                        <div className="col-md-4 col-12">
                            <img src={"https://via.placeholder.com/450x900/" + configs.bannerBGColor + "/464646/?text=PokeMosaic+Vertical+Rectangle"} className="mosaicBanner-4 d-none d-md-block"/>
                        </div>
                    </div>
                    <div>
                        <h2 className="shelf-title">Daily Discounts!</h2>
                        <DefaultShelf slider={{mobileShow: 1, dots: true}} catalog={{flag: 'Daily_Discount'} }/>
                    </div>
                    <div>
                        <h2 className="shelf-title">PokeDeal 2020!</h2>
                        <DefaultShelf slider={{mobileShow: 1, dots: true}} catalog={{flag: 'PokeDeal_2020'} }/>
                    </div>
                </div>
            </main>
    )
}

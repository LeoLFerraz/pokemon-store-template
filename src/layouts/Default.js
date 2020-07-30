import React from 'react'
import { Header } from '../viewparts/Header';
import { Footer } from '../viewparts/Footer';
import { BrowserRouter } from "react-router-dom";

export function DefaultLayout(props) {
    return (
        <BrowserRouter>
                <Header/>
                    {props.children}
                <Footer/>
        </BrowserRouter>
    )
}

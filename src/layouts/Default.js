import React from 'react'
import { Header } from '../viewparts/Header';
import { Footer } from '../viewparts/Footer';
import { Minicart } from "../components/Minicart";

export function DefaultLayout(props) {
    return (
        <div>
            <Header/>
            {props.children}
            <Footer/>
            <Minicart />
        </div>
    )
}

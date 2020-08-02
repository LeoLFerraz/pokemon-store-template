import React from 'react'
import { Header } from '../viewparts/Header';
import { Footer } from '../viewparts/Footer';
import { Minicart } from "../components/Minicart";
import { Compare } from "../components/Compare";
import { CompareOverlay } from "../components/CompareOverlay";

export function DefaultLayout(props) {
    return (
        <div>
            <Header/>
            {props.children}
            <Footer/>
            <Minicart />
            <CompareOverlay />
            <Compare />
        </div>
    )
}

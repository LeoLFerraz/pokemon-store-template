import React from 'react';
import {
    BrowserRouter,
    Route
} from "react-router-dom";

import { DefaultLayout } from "../layouts/Default";
import { MinimalLayout } from "../layouts/Minimal";

import { Home } from "../templates/Home";
import { Catalog } from "../templates/Catalog";
import { Checkout } from "../templates/Checkout";
import { Product } from "../templates/Product";

export function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact={true}> <DefaultLayout> <Home /> </DefaultLayout> </Route>
            <Route path="/catalog" exact={true}> <DefaultLayout> <Catalog /> </DefaultLayout> </Route>
            <Route path="/product" exact={true}> <DefaultLayout> <Product /> </DefaultLayout> </Route>
            <Route path="/checkout" exact={true}> <MinimalLayout> <Checkout /> </MinimalLayout> </Route>
        </BrowserRouter>
    );
}

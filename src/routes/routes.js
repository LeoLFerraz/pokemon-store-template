import React from 'react';
import {
    BrowserRouter,
    Route
} from "react-router-dom";

import { DefaultLayout } from "../layouts/Default";
import { MinimalLayout } from "../layouts/Minimal";

import { Home } from "../templates/Home";
import { Compare } from "../templates/Compare";
import { Catalog } from "../templates/Catalog";
import { Checkout } from "../templates/Checkout";
import { Product } from "../templates/Product";

export function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact={true}> <DefaultLayout> <Home /> </DefaultLayout> </Route>
            <Route path="/compare" exact={true}> <DefaultLayout> <Compare /> </DefaultLayout> </Route>
            <Route path="/catalog" exact={true} render={ routerProps => <DefaultLayout> <Catalog query={routerProps.location.search} key={routerProps.location.search}/> </DefaultLayout>} />
            <Route path="/pokemon/:id" exact={true} render={ routerProps => <DefaultLayout> <Product id={routerProps.match.params.id}/> </DefaultLayout>} />
            <Route path="/checkout" exact={true}> <MinimalLayout> <Checkout /> </MinimalLayout> </Route>
        </BrowserRouter>
    );
}

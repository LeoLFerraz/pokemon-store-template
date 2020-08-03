import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { APIInterface } from "./api-interface";
import { Provider } from 'react-redux';
import store from "./redux/store";
import {STORE_POKEMON_DATA, TOGGLE_LOADING} from './redux/actionTypes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { configs } from "./config/variables";

const pokeData = APIInterface(configs.storeType);

pokeData.then(result =>{
    store.dispatch({type: STORE_POKEMON_DATA, payload: result});
    setTimeout(() => {
        store.dispatch({type: TOGGLE_LOADING});
    }, 2500)
});

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

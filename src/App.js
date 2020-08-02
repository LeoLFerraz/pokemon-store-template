import React from 'react';
import { Routes } from './routes/routes';
import './assets/styles/globals.scss';
import { Loading } from './templates/Loading'
import {connect} from "react-redux";

function AppComponent(props) {
  let render = <Loading />;
  if(!props.loading){
    render = <Routes />;
  }
  return (
          render
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.globalApp.loading
  };
};

export let App = connect(mapStateToProps)(AppComponent);

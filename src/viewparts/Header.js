import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../assets/styles/viewparts/Header.scss";
import { DefaultCarousel } from "../components/DefaultCarousel";
import { InfoCircle, ExclamationCircle } from "react-bootstrap-icons";
import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import { ReactComponent as PokeStoreLogo } from "../assets/svg/Pokeball.svg";
import { ReactComponent as PokeUser } from "../assets/svg/Pokemon-Trainer.svg";
import { ReactComponent as Cart } from "../assets/svg/Shopping-Cart.svg";
import { ReactComponent as Search } from "../assets/svg/Search.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { OPEN_CART } from "../redux/actionTypes";
import underConstruction from "../assets/utils/under-construction";
import isMobile from "../assets/utils/is-mobile";

function RenderHeader(props) {
    let history = useHistory();
    const [searchParam, setSearchParam] = useState('');
    const [showTip, setShowTip] = useState(window.scrollY === 0);

    function searchPokemon(e) {
        e.preventDefault();
        history.push("/catalog?name=" + searchParam);
    }
    window.addEventListener('scroll', function(e) {
        setShowTip(window.scrollY === 0);
    });

    function renderDesktopHeader() {
        return (
                <header className="header">
                    <div id="header-tipbar" className={`${(showTip ? '' : 'hide-tipbar')}`}>
                        <DefaultCarousel arrows={false} autoplay={true} autoplaySpeed={3000} dots={false} swipe={false}>
                            <span><ExclamationCircle />Stay safe during the COVID-19 pandemic, trainers! That gym badge can wait.</span>
                            <span><InfoCircle />Download our app for Pokedroid or iPokedex, click here!</span>
                        </DefaultCarousel>
                    </div>
                    <div className="container">
                        <nav id="main-nav">
                            <Navbar className="row">
                                <Navbar.Brand as={Link} to="/" className="col-2">
                                    <PokeStoreLogo id="pokestoreLogo" />
                                    <div className="brand-name">PokeStore<br/><span className="brand-name-themed">Fire</span></div>
                                </Navbar.Brand>

                                <Form inline className="col-7" onSubmit={(e) => {searchPokemon(e)}}>
                                    <FormControl type="text" placeholder="Search Pokemon" className="w-100" onChange={(e) => {setSearchParam(e.target.value)}} />
                                    <Search className="search-icon" onClick={(e) => {searchPokemon(e)}}/>
                                </Form>
                                <div className="col-3 header-control-nav">
                                    <div className="user-module-wrapper" onClick={(e) => {underConstruction(e, "Sorry, no user module yet! It's a very time consuming feature :(")}}>
                                        <PokeUser className="user-module"/> Sign in
                                    </div>
                                    <div className="minicart-icon-wrapper" data-quantity={props.quantity} onClick={() => {props.dispatch({type: OPEN_CART})}}>
                                        <Cart className="minicart-icon" />
                                    </div>
                                </div>
                            </Navbar>
                            <Nav className="mr-auto col-12">
                                <NavDropdown title="Departments" className="departments-dropdown">
                                    {props.types.map((value, index) => {
                                        if(value !== "fire") {
                                            return <NavDropdown.Item className="department-link" key={'type' + index} as={Link} to={"/catalog?types=" + value}>{value}</NavDropdown.Item>
                                        }
                                    })}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/catalog">All Pokemon</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/" onClick={(e) => {underConstruction(e, "A landing-page/institutional-page template wasn't on my top-priorities list!")}}>PokeWarranty Policies</Nav.Link>
                                <Nav.Link as={Link} to="/catalog?seller=digiStore">Imported Pokemon</Nav.Link>
                                <Nav.Link as={Link} to="/catalog?orderBy=discount">Highest Discount Pokemon</Nav.Link>
                                <Nav.Link as={Link} to="/catalog?orderBy=priceAsc">Lowest Prices</Nav.Link>
                            </Nav>
                        </nav>
                    </div>
                </header>
        )
    }

    function renderMobileHeader() {
        return (
            <header className="header header-mobile">
                <div className="container">
                    <div className="row">
                        <Navbar expand="lg" className="d-flex justify-content-between w-100">
                            <div>
                                <Navbar.Brand as={Link} to="/" className="col-2">
                                    <PokeStoreLogo id="pokestoreLogo" />
                                    <div className="brand-name">PokeStore<br/><span className="brand-name-themed">Fire</span></div>
                                </Navbar.Brand>
                            </div>
                            <div>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-toggle" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Link to="/catalog" className="department-link">All Pokemon</Link>
                                        {props.types.map((value, index) => {
                                            if(value !== "fire") {
                                                return <Link className="department-link" key={'type' + index} to={"/catalog?types=" + value}>{value}</Link>
                                            }
                                        })}
                                    </Nav>
                                </Navbar.Collapse>
                            </div>
                        </Navbar>
                    </div>
                    <div className="row search-wrapper">
                        <Form inline className="col-12" onSubmit={(e) => {searchPokemon(e)}}>
                            <FormControl type="text" placeholder="Search Pokemon" className="w-100" onChange={(e) => {setSearchParam(e.target.value)}} />
                            <Search className="search-icon" onClick={(e) => {searchPokemon(e)}}/>
                        </Form>
                    </div>
                </div>
            </header>
        )
    }

    return (
        isMobile() ? renderMobileHeader() : renderDesktopHeader()
    )
}

const mapStateToProps = (state) => {
    return {
        quantity: state.cart.quantity,
        types: state.pokemonData.types
    };
};

export let Header = connect(mapStateToProps)(RenderHeader);

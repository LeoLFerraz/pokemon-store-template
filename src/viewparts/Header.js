import React from 'react';
import "../assets/styles/viewparts/Header.scss";
import { DefaultCarousel } from "../components/DefaultCarousel";
import { InfoCircle, ExclamationCircle } from "react-bootstrap-icons";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { ReactComponent as PokeStoreLogo } from "../assets/svg/Pokeball.svg"
import { ReactComponent as PokeUser } from "../assets/svg/Pokemon-Trainer.svg"
import { ReactComponent as Cart } from "../assets/svg/Shopping-Cart.svg"
import { Link } from "react-router-dom";

export function Header(props) {
    return (
            <header className="header">
                <div id="header-tipbar">
                    <DefaultCarousel arrows={false} autoplay={true} autoplaySpeed={3000} dots={false}>
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

                            <Form inline className="col-7">
                                <FormControl type="text" placeholder="Search Pokemon" className="w-100" />
                            </Form>
                            <div className="col-3 header-control-nav">
                                <div className="user-module-wrapper">
                                    <PokeUser className="user-module" /> Sign in
                                </div>
                                <Cart className="minicart-icon" />
                            </div>
                        </Navbar>
                        <Nav className="mr-auto col-12">
                            <NavDropdown title="Departments" className="departments-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">All Pokemon</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                    </nav>
                </div>
            </header>
    )
}

import React from 'react';
import "../assets/styles/viewparts/Header.scss";
import { DefaultCarousel } from "../components/DefaultCarousel";
import { InfoCircle, ExclamationCircle } from "react-bootstrap-icons";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { ReactComponent as PokeStoreLogo } from "../assets/svg/Pokeball.svg"
import { Link } from "react-router-dom";

export function Header(props) {
    // Tipbar (hidden if scroll-top is anywhere but 0);
    // Header (Logo, Searchbar, user module, minicart button)
    // Nav

    return (
            <header className="header">
                <div id="header-tipbar">
                    <DefaultCarousel arrows={false} autoplay={true} autoplaySpeed={3000} dots={false}>
                        <span><ExclamationCircle />Stay safe during the COVID-19 pandemic, trainers! That gym badge can wait.</span>
                        <span><InfoCircle />Download our app for Pokedroid or iPoke, click here!</span>
                    </DefaultCarousel>
                </div>
                <div className="container">
                    <nav id="main-nav">
                        <Navbar expand="lg">
                            <Navbar.Brand as={Link} to="/">
                                <PokeStoreLogo id="pokestoreLogo" />
                                <div className="brand-name">PokeStore<br/><span className="brand-name-themed">Fire</span></div>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavDropdown title="Departments" className="departments-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="#home">Home</Nav.Link>
                                    <Nav.Link href="#link">Link</Nav.Link>
                                </Nav>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </nav>
                </div>
            </header>
    )
}

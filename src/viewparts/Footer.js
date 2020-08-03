import React from 'react'
import "../assets/styles/viewparts/Footer.scss";
import { Envelope } from "react-bootstrap-icons";
import {ReactComponent as PokeStoreLogo} from "../assets/svg/Pokeball.svg";
import {ReactComponent as AmericanExpress} from "../assets/svg/American-Express.svg";
import {ReactComponent as Mastercard} from "../assets/svg/Mastercard.svg";
import {ReactComponent as Bitcoin} from "../assets/svg/Bitcoin.svg";
import {ReactComponent as Ebay} from "../assets/svg/Ebay.svg";
import {ReactComponent as Paypal} from "../assets/svg/Paypal.svg";
import {ReactComponent as Facebook} from "../assets/svg/Facebook.svg";
import {ReactComponent as Twitter} from "../assets/svg/Twitter.svg";
import {ReactComponent as Instagram} from "../assets/svg/Instagram.svg";
import {Form, FormControl, Button} from "react-bootstrap";
import underConstruction from "../assets/utils/under-construction";
import { configs } from "../config/variables";

//TODO: Newsletter onclick.

export function Footer(props) {
    return (
            <footer className="footer">
                <div className="mb-2 newsletter">
                    <div className="container">
                        <div className="row">
                            <div className="newsletter-text-wrapper col-md-6 col-12">
                                <Envelope className="envelope-icon d-md-block d-none" />
                                <div className="d-md-block d-none">
                                    Subscribe to our newsletter! Be the first to know about new promotions and get
                                    a whopping 5% discount on your first pokemon!
                                </div>
                                <div className="d-md-none d-block text-center w-100 mb-2">
                                    Newsletter Subscription
                                </div>
                            </div>
                            <Form inline className="col-md-6 col-12 d-flex justify-content-center align-items-center flex-nowrap">
                                <FormControl type="text" placeholder="Name" className="mr-2" />
                                <FormControl type="text" placeholder="Email" className="mr-2" />
                                <Button type="button" onClick={(e) => {underConstruction(e)}}>Submit</Button>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-3 d-lg-flex d-none store-brand justify-content-center align-items-center">
                            <PokeStoreLogo id="pokestoreLogo" />
                            <div className="brand-name">{ configs.storeShortName }<br/><span className="brand-name-themed">{ configs.storeType }</span></div>
                        </div>
                        <div className="payment-forms-wrapper col-md-5 col-12 mb-md-1 mb-4">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <span className="col-12 footer-section-title">Payment Methods</span>
                                </div>
                                <div className="col-12 d-flex justify-content-around">
                                    <Paypal />
                                    <Ebay />
                                    <Bitcoin />
                                    <AmericanExpress />
                                    <Mastercard />
                                </div>
                            </div>
                        </div>
                        <div className="social-media-wrapper col-md-4 col-12">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <span className="col-12 footer-section-title">Social Media</span>
                                </div>
                                <div className="col-12 d-flex justify-content-around">
                                    <a href="https://www.facebook.com/pokemon" target="_blank" rel="noopener noreferrer" >
                                        <Facebook />
                                    </a>
                                    <a href="https://www.twitter.com/pokemon" target="_blank" rel="noopener noreferrer" >
                                        <Twitter />
                                    </a>
                                    <a href="https://www.instagram.com/pokemon" target="_blank" rel="noopener noreferrer" >
                                        <Instagram />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 footer-text d-flex justify-content-center align-items-center">
                        B2W - Companhia Digital / CNPJ: 00.776.574/0006-60 / Inscrição Estadual: 85.687.08-5 / Endereço Rua Sacadura Cabral, 102 - Rio de Janeiro, RJ - 20081-902
                    </div>
                </div>
            </footer>
    )
}

import React from "react";
import Slider from "react-slick";
import {ArrowLeftCircleFill, ArrowRightCircleFill} from 'react-bootstrap-icons';
import "../assets/styles/components/DefaultCarousel.scss";

const SlickButtonFix = ({currentSlide, slideCount, children, ...props}) => (
        <span {...props}>{children}</span>
);

export const DefaultCarousel = (props) => {
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: props.desktopShow || 1,
        slidesToScroll: props.desktopShow || 1,
        prevArrow: <SlickButtonFix> <ArrowLeftCircleFill size={36} /> </SlickButtonFix>,
        nextArrow: <SlickButtonFix> <ArrowRightCircleFill size={36} /> </SlickButtonFix>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: props.mobileShow || 1,
                    slidesToScroll: props.mobileShow || 1,
                    arrows: false
                }
            }
        ]
    };

    return (
            <div className="default-carousel">
                <Slider {...settings}>
                    {props.children}
                </Slider>
            </div>
    )
}

import React from 'react';
import "../assets/styles/templates/Loading.scss";

export function Loading() {
    return (
            <div className="loader-wrapper">
                <h1 className="loading-text">Loading PokeStore: Fire Version</h1>
                <div className="loading-subtitle">Actually, this screen stays on for 2.5 seconds longer than it has to just so you can appreciate this awesome SVG loading screen :D</div>
                <div className="loader">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            id="Ebene_1"
                            x="0"
                            y="0"
                            version="1.1"
                            viewBox="0 0 330 331.7"
                            xmlSpace="preserve"
                    >
                        <circle id="center" cx="165" cy="165.9" r="36.5" fill="#FFF"></circle>
                        <g id="bottom" fill="#FFF">
                            <path
                                    id="bottom1"
                                    d="M165 267.6c-28.7 0-54.6-11.9-73.1-31L76.2 252c22.5 23.2 53.9 37.6 88.8 37.6 30.5 0 58.4-11 80-29.3l-14.6-16.5c-17.7 14.8-40.5 23.8-65.4 23.8z"
                            ></path>
                            <path
                                    id="bottom2"
                                    d="M288.1 178.4H266c-3.2 26.1-16.4 49.2-35.6 65.3l14.6 16.5c23.7-20.1 39.8-49 43.1-81.8z"
                            ></path>
                            <path
                                    id="bottom3"
                                    d="M244.8 178.4H223c-3.8 18.8-16.6 33.7-33.7 41.4l8.8 19.6c-9.4 4.3-19.8 6.8-30.8 7.1l.5 21c50.6-1.4 92-39.8 98.1-89.1h-21.1z"
                            ></path>
                            <path
                                    id="bottom4"
                                    d="M198.2 239.5l-8.8-19.6c-7.4 3.4-15.7 5.2-24.4 5.2-28.4 0-52.1-20-57.9-46.6h-43v.2l-.1-.2-22.1.1c2.9 28.5 15.4 54.1 34.3 73.5l15.7-15.4-.1-.2c18.5 19.2 44.5 31.1 73.2 31.1h2.8l-.5-21c11.1-.4 21.5-2.9 30.9-7.1z"
                            ></path>
                        </g>
                        <g id="top" fill="#FFF">
                            <path
                                    id="top3"
                                    d="M288.1 153.2c-2.2-22.1-10.3-42.5-22.7-59.7l-17.9 12.9-17 12.3c.1.2.2.3.3.5-14.6-20.6-38.7-34-65.8-34-40.3 0-73.7 29.5-79.8 68.1h21.9c5.8-26.7 29.5-46.6 57.9-46.6s52.1 20 57.9 46.6l65.2-.1z"
                            ></path>
                            <path
                                    id="top2"
                                    d="M165 64.1c-39.2 0-73.3 22.2-90.2 54.7l-19.5-10.2c-7.1 13.6-11.7 28.6-13.3 44.6h43.3c6-38.6 39.5-68.1 79.8-68.1 7.9 0 15.6 1.2 22.8 3.3l5.9-20.2c-9.2-2.6-18.8-4.1-28.8-4.1z"
                            ></path>
                            <path
                                    id="top1"
                                    d="M193.7 68.2l-5.9 20.2c17.4 5.1 32.4 15.9 42.7 30.3l17-12.3 17.9-12.9c-15.9-22-38.8-38.6-65.5-46.4-11.1-3.3-22.8-5-34.9-5-47.7 0-89.1 27-109.7 66.6l19.5 10.2c17-32.5 51-54.7 90.2-54.7 10-.1 19.6 1.4 28.7 4"
                            ></path>
                        </g>
                    </svg>
                </div>
            </div>
    );
}

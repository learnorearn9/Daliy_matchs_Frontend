import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HERO_SECTION_DATA } from '../../Constants/constant';// Adjust the path as necessary

export default function Herosection() {
    const token = useSelector((state) => state.token);
    const {
        heading,
        subheading,
        description,
        buttons,
        playIcon,
        versusImage,
        leftBanner,
        rightBanner
    } = HERO_SECTION_DATA;

    return (
        <section id="banner-section">
            <div className="banner-content d-flex align-items-center" data-aos="fade-up">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="main-content">
                                <div className="top-area justify-content-center text-center">
                                    <h3>{heading}</h3>
                                    <h1>{subheading}</h1>
                                    <p>{description}</p>
                                    <div className="btn-play d-flex justify-content-center align-items-center">
                                        <Link className="cmn-btn" to={token ? buttons.loggedIn.link : buttons.loggedOut.link}>
                                            {token ? buttons.loggedIn.text : buttons.loggedOut.text}
                                        </Link>
                                        <a className="mfp-iframe popupvideo">
                                            <img src={playIcon} alt="play"/>
                                        </a>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-12">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6">
                                                <div className="bottom-area text-center">
                                                    <img src={versusImage} alt="banner-vs"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ani-illu">
                        <img className="left-1 wow fadeInUp" src={leftBanner} alt="image"/>
                        <img className="right-2 wow fadeInUp" src={rightBanner} alt="image"/>
                    </div>
                </div>
            </div>
        </section>
    );
}

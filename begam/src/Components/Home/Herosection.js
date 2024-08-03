import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Herosection() {
    const token = useSelector((state) => state.token);
  return (
    <section id="banner-section">
    <div class="banner-content d-flex align-items-center" data-aos="fade-up">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="main-content">
                        <div class="top-area justify-content-center text-center">
                            <h3>Play Unlimited</h3>
                            <h1>Tournaments</h1>
                            <p>Compete in Free and Paid entry Tournaments. Transform your
                                games to real money eSports</p>
                            <div class="btn-play d-flex justify-content-center align-items-center">
                                {token ? (
                                     <Link class="cmn-btn" to={'/tournament'}>
                                     Get Started
                                  </Link>
                                ):(
                                    <Link class="cmn-btn" to={'/login'}>
                                     Get Started
                                  </Link> 
                                )}
                                <a class="mfp-iframe popupvideo">
                                    <img src="images/play-icon.png" alt="play"/>
                                </a>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-lg-12">
                                <div class="row justify-content-center">
                                    <div class="col-lg-6">
                                        <div class="bottom-area text-center">
                                            <img src="images/versus.png" alt="banner-vs"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ani-illu">
                <img class="left-1 wow fadeInUp" src="images/left-banner.png" alt="image"/>
                <img class="right-2 wow fadeInUp" src="images/right-banner.png" alt="image"/>
            </div>
        </div>
    </div>
</section>
  )
}

import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import Statistics from '../Home/Statistics'
import Features from '../Home/Features'
import Testimonial from '../Home/Reviews'
import Footer from '../Footer/Footer'
import ScrollToTop from '../atoms/scrollTotop'
import Preloader from '../atoms/Preloader'
import Herosection from '../Home/Herosection'

export default function About() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      window.scrollTo(0, 0);
    }, []);
  
    if (loading) {
      return <Preloader />;
    }
  return (
    <>
    <ScrollToTop/>
      <Navbar/>
<section id="banner-section" class="inner-banner">
        <div class="ani-img">
            <img class="img-1" src="images/banner-circle-1.png" alt="icon"/>
            <img class="img-2" src="images/banner-circle-2.png" alt="icon"/>
            <img class="img-3" src="images/banner-circle-2.png" alt="icon"/>
        </div>
        <div class="banner-content d-flex align-items-center">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="main-content">
                            <h1>About Us</h1>
                            <div class="breadcrumb-area">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb d-flex justify-content-center">
                                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li class="breadcrumb-item"><a href="#">Pages</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">About Us</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="about-us-section">
        <div class="overlay pt-120">
            <div class="container wow fadeInUp">
                <div class="main-container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-8">
                            <div class="section-header text-center">
                                <h2 class="title">ABOUT Begam</h2>
                                <p>Begam a  gaming platform hub Esports tournaments for the biggest titles on every device. Begam is an immersive online gaming experience for all Esports fans out there. Doesn’t matter if you’re a new gamer, casual player, an amateur pro or a registered professional, if you’re passionate about playing and competing in the hottest tournaments,
                                    Begam has what you need.</p>
                                <p>Our team is made up of gamers, nerds, techies, and dreamers, who love what we do and are dedicated to bringing you the best in competitive gaming. Whether it’s local, GCC, MENA or even global, we’ve got tournaments for everyone.</p>
                                <a href="#" class="cmn-btn">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
   <Statistics/>
   <Features/>
   <Testimonial/>
   <section id="team-section" class="pb-120">
        <div class="overlay pt-120">
            <div class="container wow fadeInUp">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="section-header text-center">
                            <h2 class="title">our management team</h2>
                            <p>Meet the solid base of quality experts in their field with 15+ years of experience</p>
                        </div>
                    </div>
                </div>
                <div class="row wrapper">
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-item text-center">
                            <div class="top-item text-center">
                                <img src="images/team-1.png" alt="image"/>
                                <div class="social-area">
                                    <ul class="d-flex justify-content-center">
                                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li class="border-area"><a href="#"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="bottom-area">
                                <a href="#"><h5>Tarah Landry</h5></a>
                                <p>Chief Executive Officer</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-item text-center">
                            <div class="top-item text-center">
                                <img src="images/team-2.png" alt="image"/>
                                <div class="social-area">
                                    <ul class="d-flex justify-content-center">
                                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li class="border-area"><a href="#"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="bottom-area">
                                <a href="#"><h5>Abe Gordon</h5></a>
                                <p>Chief Financial Officer</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-item text-center">
                            <div class="top-item text-center">
                                <img src="images/team-3.png" alt="image"/>
                                <div class="social-area">
                                    <ul class="d-flex justify-content-center">
                                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li class="border-area"><a href="#"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="bottom-area">
                                <a href="#"><h5>Neville Saylor</h5></a>
                                <p>Chief Technology Officer</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-item text-center">
                            <div class="top-item text-center">
                                <img src="images/team-1.png" alt="image"/>
                                <div class="social-area">
                                    <ul class="d-flex justify-content-center">
                                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li class="border-area"><a href="#"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="bottom-area">
                                <a href="#"><h5>Russel Laughlin</h5></a>
                                <p>Technology Manager</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer/> 
    </>
  )
}

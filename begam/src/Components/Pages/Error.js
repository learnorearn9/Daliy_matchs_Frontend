import React from 'react'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'

const Error = () => {
  return (
    <>
    <Navbar/>
    <section id="banner-section" class="inner-banner profile features shop">
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
                            <h1>Error</h1>
                            <div class="breadcrumb-area">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb d-flex justify-content-center">
                                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Error</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="error-section">
        <div class="overlay pb-120 pt-120">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="main-content pt-120 pb-120 text-center">
                            <h3>Whoops..</h3>
                            <h5>page not found</h5>
                            <a href="registration.html" class="cmn-btn">Join now!</a>
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

export default Error

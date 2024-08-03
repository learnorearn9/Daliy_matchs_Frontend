import React from 'react'
import Herosection from '../Home/Herosection'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'

const Contact = () => {
  return (
    <>
    <Navbar/>
     <Herosection/>
     <section id="contact-section" class="pt-120 pb-120">
        <div class="overlay">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="section-header text-center">
                            <h5>CONTACT US</h5>
                            <h2 class="title">Get in touch today!</h2>
                            <p>We will call you as soon as we can.</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <form action="#" method="post">
                            <h5>Leave your message</h5>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" placeholder="Enter your Name"/>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" placeholder="Enter your email"/>
                            </div>
                            <div class="form-group">
                                <label for="Phone">Phone</label>
                                <input type="Phone" id="Phone" placeholder="Enter your Phone Number"/>
                            </div>
                            <button class="cmn-btn" type="submit">Submit Now</button>
                        </form>
                    </div>
                    <div class="col-md-4">
                        <div class="right-sidebar">
                            <h6 class="head-area">More Information</h6>
                            <div class="single-area d-flex align-items-center">
                                <div class="img-area">
                                    <img src="images/email-icon.png" alt="image"/>
                                </div>
                                <div class="right-area">
                                    <h6>Email</h6>
                                    <p class="text-sm"><a href="https://pixner.net/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="bedcdbd9dfd3fed9d3dfd7d290ddd1d3">Support@dailymatch.in</a></p>
                                </div>
                            </div>
                            <div class="single-area d-flex align-items-center">
                                <div class="img-area">
                                    <img src="images/phone-icon.png" alt="image"/>
                                </div>
                                <div class="right-area">
                                    <h6>Phone</h6>
                                    <p class="text-sm">+91 999 865 1111</p>
                                </div>
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

export default Contact

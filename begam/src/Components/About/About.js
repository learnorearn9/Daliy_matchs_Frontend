import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Statistics from "../Home/Statistics";
import Features from "../Home/Features";
import Testimonial from "../Home/Reviews";
import ScrollToTop from "../atoms/scrollTotop";
import Preloader from "../atoms/Preloader";
import Herosection from "../Home/Herosection";
import Footer from "../Home/Footer";

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
      <ScrollToTop />
      <Navbar />
      <section id="banner-section" class="inner-banner">
        <div class="ani-img">
          <img class="img-1" src="images/banner-circle-1.png" alt="icon" />
          <img class="img-2" src="images/banner-circle-2.png" alt="icon" />
          <img class="img-3" src="images/banner-circle-2.png" alt="icon" />
        </div>
        <div class="banner-content d-flex align-items-center"  data-aos="fade-up" data-aos-offset="100">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="main-content">
                  <h1>About Us</h1>
                  <div class="breadcrumb-area">
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb d-flex justify-content-center">
                        <li class="breadcrumb-item">
                          <a href="index.html">Home</a>
                        </li>
                        <li class="breadcrumb-item">
                          <a href="#">Pages</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          About Us
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about-us-section" data-aos="fade-up" data-aos-offset="130">
        <div class="overlay pt-120">
          <div class="container wow fadeInUp">
            <div class="main-container">
              <div class="row d-flex justify-content-center">
                <div class="col-lg-8">
                  <div class="section-header text-center">
                    <h2 class="title">ABOUT Begam</h2>
                    <p>
                      Welcome to our platform, the ultimate destination for
                      thrilling and competitive gaming tournaments. We pride
                      ourselves on creating a space where players of all skill
                      levels, from beginners to professionals, can come together
                      and showcase their talents in exciting matches.
                      <p>
                        Our tournaments are designed to be inclusive and
                        competitive, offering opportunities for everyone to
                        participate and compete for glory. Whether you're just
                        starting your gaming journey or you're a seasoned pro,
                        our platform provides the perfect stage for you to
                        demonstrate your skills and rise to the top.
                      </p>
                      <p>
                        Each tournament is a battle of wits and skills, and we
                        reward the top 10 players with fantastic prizes. Our
                        reward system is designed to motivate and recognize the
                        best players, ensuring that your hard work and
                        dedication are always appreciated.
                      </p>
                    </p>
                    <p>
                      To maintain the integrity of our competitions, we have
                      implemented rigorous monitoring systems. Our advanced
                      anti-cheat technology ensures that no hacker can use any
                      unfair means to gain an advantage. We are committed to
                      providing a fair and level playing field for all
                      participants, so you can focus on what you do best –
                      playing your heart out and enjoying the game. Join us
                      today and become part of a vibrant community of gamers who
                      are passionate about competition, fairness, and fun. Your
                      journey to becoming a champion starts here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Statistics />
      <Features />
      <Testimonial /> */}
      <section id="team-section" class="pb-120" data-aos="fade-up" data-aos-offset="200">
        <div class="overlay pt-120">
          <div class="container wow fadeInUp">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div class="section-header text-center">
                  <h2 class="title">our management team</h2>
                  <p>
                    We love hearing from our community! If you have any
                    questions or need assistance with setting up custom matches,
                    feel free to reach out to any of our team members. We pride
                    ourselves on our quick response time and will get back to
                    you within 10 minutes. Your satisfaction is our top
                    priority!
                  </p>
                </div>
              </div>
            </div>
            <div class="row wrapper">
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-item text-center">
                  <div class="top-item text-center">
                    <img src="images/team-1.png" alt="image" />
                    <div class="social-area">
                      <ul class="d-flex justify-content-center">
                        <li>
                          <a href="#">
                            <i class="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li class="border-area">
                          <a href="#">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fab fa-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="bottom-area">
                    <a href="#">
                      <h5>Tarah Landry</h5>
                    </a>
                    <p>Chief Executive Officer</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-item text-center">
                  <div class="top-item text-center">
                    <img src="images/team-2.png" alt="image" />
                    <div class="social-area">
                      <ul class="d-flex justify-content-center">
                        <li>
                          <a href="#">
                            <i class="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li class="border-area">
                          <a href="#">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fab fa-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="bottom-area">
                    <a href="#">
                      <h5>Abe Gordon</h5>
                    </a>
                    <p>Chief Financial Officer</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-item text-center">
                  <div class="top-item text-center">
                    <img src="images/team-3.png" alt="image" />
                    <div class="social-area">
                      <ul class="d-flex justify-content-center">
                        <li>
                          <a href="#">
                            <i class="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li class="border-area">
                          <a href="#">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fab fa-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="bottom-area">
                    <a href="#">
                      <h5>Neville Saylor</h5>
                    </a>
                    <p>Chief Technology Officer</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-item text-center">
                  <div class="top-item text-center">
                    <img src="images/team-1.png" alt="image" />
                    <div class="social-area">
                      <ul class="d-flex justify-content-center">
                        <li>
                          <a href="#">
                            <i class="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li class="border-area">
                          <a href="#">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fab fa-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="bottom-area">
                    <a href="#">
                      <h5>Russel Laughlin</h5>
                    </a>
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
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import ScrollToTop from "../atoms/scrollTotop";
import Preloader from "../atoms/Preloader";
import Footer from "../Home/Footer";
import { ABOUT_PAGE_DATA } from "../../Constants/constant"; // Adjust the path as necessary
import { Link } from "react-router-dom";
import Spinner from "../atoms/Spinner";
export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  const { banner, aboutSection, teamSection } = ABOUT_PAGE_DATA;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section id="banner-section" className="inner-banner">
        <div className="ani-img">
          <img className="img-1" src={banner.images.img1} alt="icon" />
          <img className="img-2" src={banner.images.img2} alt="icon" />
          <img className="img-3" src={banner.images.img3} alt="icon" />
        </div>
        <div className="banner-content d-flex align-items-center" data-aos="fade-up" data-aos-offset="100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="main-content">
                  <h1>{banner.heading}</h1>
                  <div className="breadcrumb-area">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb d-flex justify-content-center">
                        {banner.breadcrumb.map((item, index) => (
                          <li className="breadcrumb-item" key={index}>
                            <Link to={item.link}>{item.label}</Link>
                          </li>
                        ))}
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
        <div className="overlay pt-120">
          <div className="container wow fadeInUp">
            <div className="main-container">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <div className="section-header text-center">
                    <h2 className="title">{aboutSection.title}</h2>
                    {aboutSection.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="team-section" className="pb-120" data-aos="fade-up" data-aos-offset="200">
        <div className="overlay pt-120">
          <div className="container wow fadeInUp">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="section-header text-center">
                  <h2 className="title">{teamSection.title}</h2>
                  <p>{teamSection.description}</p>
                </div>
              </div>
            </div>
            <div className="row wrapper">
              {teamSection.members.map((member, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                  <div className="single-item text-center">
                    <div className="top-item text-center">
                      <img src={member.img} alt="image" />
                      <div className="social-area">
                        <ul className="d-flex justify-content-center">
                          {Object.entries(member.socialLinks).map(([platform, link]) => (
                            <li key={platform}>
                              <Link>
                                <i className={`fab fa-${platform}`}></i>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="bottom-area">
                      <Link>
                        <h5>{member.name}</h5>
                      </Link>
                      <p>{member.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

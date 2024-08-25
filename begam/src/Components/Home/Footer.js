import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the path changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    // If the same link is clicked, scroll to the top
    const handleLinkClick = (e) => {
      if (location.pathname === e.currentTarget.getAttribute("href")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => link.addEventListener("click", handleLinkClick));

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
    };
  }, [location.pathname]);


  return (
    <footer id="footer-section">
      <div className="footer-mid pt-120">
        <div className="container">
          <div className="row d-flex">
            <div className="col-lg-8 col-md-8 d-flex justify-content-md-between justify-content-center align-items-center cus-grid">
              <div className="logo-section">
                <Link to="/" className="site-logo site-title">
                  <img src="/images/logo.png" alt="site-logo" />
                </Link>
              </div>
              <ul className="menu-side d-flex align-items-center">
                <li><Link to="/" className="active">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/tournament">Tournament</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 d-flex align-items-center justify-content-center justify-content-md-end">
              <div className="right-area">
                <ul className="d-flex">
                  <li><a href="#"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                  <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                  <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="main-content">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-lg-12 col-md-6">
                <div className="left-area text-center">
                  <p>
                    Copyright © 2024. All Rights Reserved By
                    <Link to="/" className="footer-brand"> Daily Matches</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
export default function Games() {
  const images = [
    "images/game-1.png",
    "images/game-2.png",
    "images/game-3.png",
    "images/game-4.png",
    "images/game-3.png",
  ];

  return (
    <section id="available-game-section">
      <div className="overlay pb-120" data-aos="fade-up">
        <div className="container wow fadeInUp">
          <div className="main-container">
            <div className="row justify-content-between">
              <div className="col-lg-10">
                <div className="section-header">
                  <h2 className="title">Available Games</h2>
                  <p>We are constantly adding new games</p>
                </div>
              </div>
            </div>
            <div className="available-game-carousel">
              {images.concat(images).map((src, index) => (
                <div className="single-item" key={index}>
                  <Link ><img src={src} alt={`game-${index}`} /></Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

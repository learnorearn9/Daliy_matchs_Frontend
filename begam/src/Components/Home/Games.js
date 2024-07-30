import React from 'react';

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
      <div className="overlay pb-120">
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
                  <a href="#"><img src={src} alt={`game-${index}`} /></a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

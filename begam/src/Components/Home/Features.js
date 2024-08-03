import React from 'react';

const features = [
  {
    imgSrc: 'images/features-icon-1.png',
    title: 'Premium Support',
    description: 'Our dedicated team ensures you receive immediate assistance, with an average response time of just 5 minutes.'
  },
  {
    imgSrc: 'images/features-icon-2.png',
    title: 'Instant Deposits',
    description: 'Deposit funds in one click and join the match instantly.'
  },
  {
    imgSrc: 'images/features-icon-3.png',
    title: 'Climb the Leaderboards',
    description: 'Compete fiercely to rise through the ranks and earn the coveted title of Player of the Week.'
  },
  {
    imgSrc: 'images/features-icon-4.png',
    title: 'MAKE UP TO 75X',
    description: 'Ensuring you\'re ready to receive your winnings by the end of the tournament.'
  },
  {
    imgSrc: 'images/features-icon-5.png',
    title: 'Make up to 10X your $$',
    description: 'Make up to 10X your money on multiplayer tourneys. With paid and free entry.'
  },
  {
    imgSrc: 'images/features-icon-6.png',
    title: 'Play at your Level',
    description: 'Discover tailored tournaments for all skill levels, ensuring fairness and excitement for every player.'
  }
];

export default function Features() {
  return (
    <section id="features-section">
      <div className="overlay pt-120" data-aos="fade-up" data-aos-offset="720" data-aos-delay="150">
        <div className="container wow fadeInUp">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-header text-center">
                <h2 className="title">Daily Matches Games Features</h2>
                <p>The biggest esports tournaments anytime, anywhere</p>
              </div>
            </div>
          </div>
          <div className="row pm-none">
            {features.map((feature, index) => (
              <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                <div className="single-item text-center">
                  <div className="img-area">
                    <img src={feature.imgSrc} alt="feature-icon"/>
                  </div>
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

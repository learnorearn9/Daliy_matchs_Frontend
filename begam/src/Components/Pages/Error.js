import React, { useEffect, useState } from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-08-12") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="countdown-item">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </>
  );
};

const ComingSoon = () => {
  return (
    <>
      {/* <Navbar/> */}
      <section id="banner-section" className="inner-banner profile features shop">
        <div className="ani-img">
          <img className="img-1" src="images/banner-circle-1.png" alt="icon" />
          <img className="img-2" src="images/banner-circle-2.png" alt="icon" />
          <img className="img-3" src="images/banner-circle-2.png" alt="icon" />
        </div>
        <div className="banner-content d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="main-content">
                  <h1>Coming Soon</h1>
                  <div className="breadcrumb-area">
                    <nav aria-label="breadcrumb">
                      <Countdown />
                      {/* <ol className="breadcrumb d-flex justify-content-center">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Coming Soon</li>
                      </ol> */}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="countdown-section">
        <div className="overlay pb-120 pt-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="main-content pt-120 pb-120 text-center">
                  {/* <h3>Coming Soon</h3>
                  <h5>Countdown to August 12, 2024</h5>
                  <div className="countdown">
                   
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default ComingSoon;

import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

const steps = [
  {
    number: 1,
    imgSrc: 'images/how-icon-1.png',
    title: 'SIGN UP'
  },
  {
    number: 2,
    imgSrc: 'images/how-icon-3.png',
    title: 'SELECT THE MATCH',
    className: 'obj-rel'
  },
  {
    number: 3,
    imgSrc: 'images/how-icon-2.png',
    title: 'INVEST',
    className: 'obj-alt'
  },
  {
    number: 4,
    imgSrc: 'images/how-icon-4.png',
    title: 'GET PAID',
    className: 'obj-rel'
  }
];

export default function Work() {
  const token = useSelector(state => state.token);


  return (
    <section id="how-works-section" className="border-area">
      <div className="overlay pt-120 pb-120" data-aos="fade-up" data-aos-offset="220" data-aos-delay="100">
        <div className="container wow fadeInUp">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="section-header">
                <h2 className="title">How It Works</h2>
                <p>It's easier than you think. Follow 4 simple easy steps</p>
              </div>
            </div>
          </div>
          <div className="row mp-top">
            {steps.map((step, index) => (
              <div
                className={`col-lg-3 col-md-3 col-sm-6 d-flex justify-content-center ${step.className || ''}`}
                key={index}
              >
                <div className="single-item">
                  <div className="icon-area">
                    <span>{step.number}</span>
                    <img src={step.imgSrc} alt={`step-${step.number}`} />
                  </div>
                  <div className="text-area">
                    <h5>{step.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 text-center">
              {!token &&(
              <Link to={"/login"} className="cmn-btn">Join Now!</Link>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { getUserReview } from '../../api/api';

const testimonials = [
  {
    imgSrc: 'images/avtar boy.png',
    quote: "I play Tournament every day, it's a great way to relax and win cash too!",
    name: 'Hemant Kashyap',
    location: 'Texas, USA',
    amount: '$306'
  },
  {
    imgSrc: 'images/avtar boy.png',
    quote: 'When I hang out with my friends, we play Tournament, its so much fun',
    name: 'Harish Maru',
    location: 'Frankfurt, Germany',
    amount: '$496'
  },
  {
    imgSrc: 'images/avtar boy.png',
    quote: 'I joined for the community but ended up winning cash, amazing.',
    name: 'Harsh Verma',
    location: 'Ontario, Canada',
    amount: '$306'
  }
];

export default function Testimonial() {

  const [review,setReview] = useState([]);

  const getReview = async () => {
    try {
      const response = await getUserReview();
      setReview(response.data.tournamentDetail ? [response.data.tournamentDetail] : []);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  useEffect(()=> {
    getReview();
  },[])


  return (
    <section id="testimonials-section">
      <div className="overlay pt-120 pb-120" data-aos="fade-up" data-aos-offset="80" data-aos-delay="150">
        <div className="container wow fadeInUp">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-header text-center">
                <h2 className="title">Our Gamers Review</h2>
                <p>Thousands of Happy Gamers All Around the World</p>
              </div>
            </div>
          </div>
          <div className="row mp-none">
            {testimonials.map((testimonial, index) => (
              <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                <div className="single-item text-center">
                  <p>{testimonial.quote}</p>
                  <div className="bottom-area d-flex justify-content-between">
                    <div className="left-area d-flex">
                      <div className="img">
                        <div className="img-area">
                          <img src={testimonial.imgSrc} alt="testimonial"/>
                        </div>
                      </div>
                      <div className="title-area">
                        <h6>{testimonial.name}</h6>
                        {/* <span>{testimonial.location}</span> */}
                      </div>
                    </div>
                    <div className="amount">
                      {/* <h6>{testimonial.amount}</h6> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

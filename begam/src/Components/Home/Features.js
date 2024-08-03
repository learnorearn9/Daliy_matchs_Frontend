import React from 'react';
import { HOME_PAGE_DATA } from '../../Constants/constant';// Adjust the path as necessary

export default function Features() {
    const { features } = HOME_PAGE_DATA;

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

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Details(props) {
  const user = props.user;

  return (
    <>
      <section id="banner-section" className="inner-banner profile">
        <div className="ani-img">
          <img className="img-1" src="images/banner-circle-1.png" alt="icon"/>
          <img className="img-2" src="images/banner-circle-2.png" alt="icon"/>
          <img className="img-3" src="images/banner-circle-2.png" alt="icon"/>
        </div>
        <div className="banner-content d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="main-content">
                  <h1>Profile Page</h1>
                  <div className="breadcrumb-area">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb d-flex justify-content-center">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Profile Page</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="heading-area">
            <div className="row justify-content-between">
              <div className="col-md-6">
                <div className="profile-area d-flex align-items-center">
                  <div className="photo">
                    <img src="images/profile-logo.png" alt="Image"/>
                  </div>
                  <div className="name-area">
                
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
                <div className="right d-flex align-items-center">
                  {user?.role && (
   <Link to={'/createtournament'} className="cmn-btn">Create Tournament</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

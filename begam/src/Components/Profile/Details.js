import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export default function Details(props) {
  const user = props.user;
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(prevShowOptions => !prevShowOptions);
  };

  return (
    <>
      <section id="banner-section" className="inner-banner profile">
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
                  <h1>Profile Page</h1>
                  <div className="breadcrumb-area">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb d-flex justify-content-center">
                        <li className="breadcrumb-item">
                          <Link to={'/'}>Home</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Profile Page
                        </li>
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
                    <img src="images/profile-logo.png" alt="Image" />
                  </div>
                  <div className="name-area">
                    <h3>{user.name}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
                <div className="right d-flex align-items-center">
                  {user?.role && (
                    <button onClick={handleToggleOptions} style={{background:"none"}}>
                      <FontAwesomeIcon icon={faEllipsisVertical} style={{color:"white", fontSize:"22px"}} />
                    </button>
                  )}
                  
                  {showOptions && (
                    <div className="options">
                      <Link to={'/admin'}>
                      <button>Go to Admin Panel</button></Link>
                    </div>
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

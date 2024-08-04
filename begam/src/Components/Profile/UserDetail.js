import React from "react";

export default function UserDetail(props) {
  const { user } = props;

  // Render nothing if user data is not available
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section id="all-trophies" className="pb-120">
      <div className="container">
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="overview-tab"
          >
            <div class="statistics-area">
              <div class="row">
                <div class="col-lg-9">
                  <div class="total-area">
                    <div class="head-area d-flex justify-content-between">
                      <div class="left">
                        <h5>Game Statistics</h5>
                        <p class="text-sm">Player's game specific statistics</p>
                      </div>
                      <div class="right">
                        <p class="text-sm">
                          Last Update: <span>3 days ago</span>
                        </p>
                      </div>
                    </div>
                    <div class="tab-content" id="myTabContents">
                      <div
                        class="tab-pane fade show active"
                        id="fortnite"
                        role="tabpanel"
                        aria-labelledby="fortnite-tab"
                      >
                        <div class="row">
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-1.png"
                                alt="image"
                              />
                              <p>Tournaments Played</p>
                              <h4>10</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/my-statistics-icon-4.png"
                                alt="image"
                                style={{width:"40px"}}
                              />
                              <p>Times<br/> Paid</p>
                              <h4>5</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/my-statistics-icon-5.png"
                                alt="image"
                                style={{width:"90px"}}
                              />
                              <p>Tournaments<br/> Won</p>
                              <h4>0</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="warzone"
                        role="tabpanel"
                        aria-labelledby="warzone-tab"
                      >
                        <div class="row">
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-1.png"
                                alt="image"
                              />
                              <p>Tournaments Entered</p>
                              <h4>10</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-2.png"
                                alt="image"
                              />
                              <p>Kills Per Game (Average)</p>
                              <h4>20</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-3.png"
                                alt="image"
                              />
                              <p>Games Played League of Legends</p>
                              <h4>5</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-4.png"
                                alt="image"
                              />
                              <p>Earnings (Per tournament)</p>
                              <h4>0</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="lofl"
                        role="tabpanel"
                        aria-labelledby="lofl-tab"
                      >
                        <div class="row">
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-1.png"
                                alt="image"
                              />
                              <p>Tournaments Entered</p>
                              <h4>10</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-2.png"
                                alt="image"
                              />
                              <p>Kills Per Game (Average)</p>
                              <h4>20</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-3.png"
                                alt="image"
                              />
                              <p>Games Played League of Legends</p>
                              <h4>5</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-4.png"
                                alt="image"
                              />
                              <p>Earnings (Per tournament)</p>
                              <h4>0</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="dota"
                        role="tabpanel"
                        aria-labelledby="dota-tab"
                      >
                        <div class="row">
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-1.png"
                                alt="image"
                              />
                              <p>Tournaments Entered</p>
                              <h4>10</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-2.png"
                                alt="image"
                              />
                              <p>Kills Per Game (Average)</p>
                              <h4>20</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-3.png"
                                alt="image"
                              />
                              <p>Games Played League of Legends</p>
                              <h4>5</h4>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <div class="single-item text-center">
                              <img
                                src="images/statistics-icon-4.png"
                                alt="image"
                              />
                              <p>Earnings (Per tournament)</p>
                              <h4>0</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistics-area">
              <div className="row">
                <div className="col-lg-9">
                  <div className="total-area" style={{ marginBottom: "30px" }}>
                    <div className="head-area d-flex justify-content-between">
                      <div className="left">
                        <h5>Personal Details</h5>
                      </div>
                    </div>
                    <div className="tab-content" id="myTabContents">
                      <div
                        className="tab-pane fade show active"
                        id="fortnite"
                        role="tabpanel"
                        aria-labelledby="fortnite-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="profile-input">
                              <label htmlFor="name">Name</label>
                              <input
                                id="name"
                                type="text"
                                value={user.name}
                                readOnly
                              />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="email">Email</label>
                              <input
                                id="email"
                                type="text"
                                value={user.email}
                                readOnly
                              />
                            </div>
                            <div className="profile-input">
                              <label htmlFor="phone">Phone</label>
                              <input
                                id="phone"
                                type="text"
                                value={user.phoneNumber}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPlayerOfWeek } from "../../api/api";
import { Link } from "react-router-dom";
export default function Topthree() {
  const [results, setResults] = useState([]);
  const authToken = useSelector((state) => state.token);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getPlayerOfWeek(authToken);
        // Ensure response data is an array
        if (Array.isArray(response.data.data)) {
          setResults(response?.data?.data);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tournament results:", error);
      }
    };

    if (authToken) {
      fetchResults();
    }
  }, [authToken]);

  return (
    <>
      {authToken && results.length >= 3 && (
        <section id="players-week-section">
          <div className="overlay pt-120 pb-120">
            <div className="container wow fadeInUp">
              <div className="row justify-content-center">
                <div className="col-lg-7 mb-30">
                  <div className="section-header text-center">
                    <h2 className="title">Players of the Week</h2>
                    <p>
                      Every week, we spotlight the top players who join daily
                      and deliver outstanding performances.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mp-none">
                <div className="col-lg-4 col-md-6">
                  <div className="single-item text-center">
                    <div className="img-area">
                      <div className="img-wrapper">
                        <img
                          src="images/playertemp.png"
                          alt={results[1].userName}
                          style={{width:"25%"}}
                        />
                      </div>
                    </div>
                    <Link>
                      <h5>{results[1].userName}</h5>
                    </Link>
                    <p className="date">
                      <span className="text-sm earn" style={{fontSize:"24px"}}>{results[1].rank}</span>
                    </p>
                    <p className="text-sm credit">
                      <span className="text-sm">
                        {results[1].tournamentName}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single-item mid-area text-center">
                    <div className="top-level">
                      <img src="images/star.png" alt="image" />
                    </div>
                    <div className="img-area">
                      <div className="img-wrapper">
                        <img
                             src="images/playertemp.png"
                             alt={results[0].userName}
                             style={{width:"25%"}}
                        />
                      </div>
                    </div>
                    <Link>
                      <h5>{results[0].userName}</h5>
                    </Link>
                    <p className="date">
                      <span className="text-sm earn" style={{fontSize:"24px"}}>{results[0].rank}</span>
                    </p>
                    <p className="text-sm credit">
                      <span className="text-sm">
                        {results[0].tournamentName}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single-item text-center">
                    <div className="img-area">
                      <div className="img-wrapper">
                        <img
                            src="images/playertemp.png"
                            alt={results[2].userName}
                            style={{width:"25%"}}
                        />
                      </div>
                    </div>
                    <Link>
                      <h5>{results[2].userName}</h5>
                    </Link>
                    <p className="date">
                      <span className="text-sm earn" style={{fontSize:"24px"}}>{results[2].rank}</span>
                    </p>
                    <p className="text-sm credit">
                      <span className="text-sm">
                        {results[2].tournamentName}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

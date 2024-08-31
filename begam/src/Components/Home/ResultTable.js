import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTournamentResults } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

export default function ResultTable() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE] = useState(7);
  const authToken = useSelector((state) => state.token);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const currentDate = new Date();
        const twoDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString().split('T')[0];
        const fiveDaysLater = new Date().toISOString().split('T')[0];

        const response = await getTournamentResults(authToken, twoDaysAgo, fiveDaysLater);

        let transformedData = [];

        if (Array.isArray(response.data)) {
          transformedData = response.data.map(item => ({
            Name: item.Name || "N/A",
            date: item.date ? new Date(item.date).toLocaleDateString() : "N/A",
            email: item.email || "N/A",
            prize: item.prize ? `₹${item.prize}` : "N/A",
            rank: item.rank || "N/A",
            tournamentFees: item.tournamentFees ? `₹${item.tournamentFees}` : "N/A",
            tournamentName: item.tournamentName || "N/A",
            tournamentSize: item.tournamentSize || "N/A",
            userAge: item.userAge || "N/A"
          }));
        } else if (response.data.results && Array.isArray(response.data.results)) {
          transformedData = response.data.results.map(item => ({
            Name: item.Name || "N/A",
            date: item.date ? new Date(item.date).toLocaleDateString() : "N/A",
            email: item.email || "N/A",
            prize: item.prize ? `₹${item.prize}` : "N/A",
            rank: item.rank || "N/A",
            tournamentFees: item.tournamentFees ? `₹${item.tournamentFees}` : "N/A",
            tournamentName: item.tournamentName || "N/A",
            tournamentSize: item.tournamentSize || "N/A",
            userAge: item.userAge || "N/A"
          }));
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Unexpected response format");
          return;
        }

        setResults(transformedData);
        console.log(transformedData);

      } catch (error) {
        console.error("Error fetching tournament results:", error);
        setError("Error fetching tournament results");
      }
    };

    if (authToken) {
      fetchResults();
    }
  }, [authToken]);

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      if (direction === 'next') {
        return Math.min(prevPage + 1, Math.ceil(results.length / ITEMS_PER_PAGE));
      } else {
        return Math.max(prevPage - 1, 1);
      }
    });
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="tournament" data-aos="fade-up" data-aos-offset="420" data-aos-delay="100">
      {authToken && (
        <>
          <div className="section-header" style={{ display: "flex", justifyContent: "center" }}>
            <h2 className="title">Tournaments Result</h2>
          </div>
          <div className="prizes pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Date</th>
                          <th scope="col">Email</th>
                          <th scope="col">Prize</th>
                          <th scope="col">Rank</th>
                          <th scope="col">Tournament Name</th>
                          <th scope="col">Tournament Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(currentResults) && currentResults.length > 0 ? (
                          currentResults.map((data, index) => (
                            <tr key={index}>
                              <td>{data.Name}</td>
                              <td>{data.date}</td>
                              <td>{data.email}</td>
                              <td>{data.prize}</td>
                              <td>{data.rank}</td>
                              <td>{data.tournamentName}</td>
                              <td>{data.tournamentSize}</td>
                            </tr>
                          ))
                        ) : error ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              {error}
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No tournament results available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="pagination-controls d-flex justify-content-between">
                <button
                  onClick={() => handlePageChange('previous')}
                  disabled={currentPage === 1}
                >
                     <FontAwesomeIcon icon={faArrowLeftLong}/>
                </button>
                <span>{`${currentPage} of ${Math.ceil(results.length / ITEMS_PER_PAGE)}`}</span>
                <button
                  onClick={() => handlePageChange('next')}
                  disabled={currentPage === Math.ceil(results.length / ITEMS_PER_PAGE)}
                >
                 <FontAwesomeIcon icon={faArrowRightLong} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

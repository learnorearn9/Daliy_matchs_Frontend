import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTournamentResults } from "../../api/api";
import { addDays, format ,subDays} from "date-fns";


export default function ResultTable() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const authToken = useSelector((state) => state.token);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Get the current date in 'YYYY-MM-DD' format
        const currentDate = format(new Date(), 'yyyy-MM-dd');

        // Get the date 2 days before the current date
        const twoDaysAgo = format(subDays(new Date(),7), 'yyyy-MM-dd');
    
        // Get the date 5 days after the current date
        const fiveDaysLater = format(addDays(new Date(),0), 'yyyy-MM-dd');
    
        // Pass the dates to getTournamentResults
        const response = await getTournamentResults(authToken, twoDaysAgo, fiveDaysLater);
        let transformedData = [];
        console.log(response);
        
        if (Array.isArray(response.data)) {
          // If response.data is an array, transform it if necessary
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
          // If response.data has a results property that is an array
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
        } else if (response.data.results && response.data.totalCount === 0) {
          // If response.data has a results property and totalCount is 0
          transformedData = [];
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

  return (
    <section id="tournament" data-aos="fade-up" data-aos-offset="420" data-aos-delay="100">
      {authToken && (
        <>
          <div
            className="section-header"
            style={{ display: "flex", justifyContent: "center" }}
            
          >
            <h2 className="title">Tournaments Result</h2>
          </div>
          <div className="prizes pb-120">
            
            <div className="container">
              {/* <div className="table-filter">
                <div>
              <input type="text" placeholder="hjbjh" />
             <button className="cmn-btn">Search</button> 
              </div>
              </div> */}
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
                          {/* <th scope="col">Tournament Fees</th> */}
                          <th scope="col">Tournament Name</th>
                          <th scope="col">Tournament Size</th>
                          {/* <th scope="col">User Age</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(results) && results.length > 0 ? (
                          results.map((data, index) => (
                            <tr key={index}>
                              <td>{data.Name}</td>
                              <td>{data.date}</td>
                              <td>{data.email}</td>
                              <td>{data.prize}</td>
                              <td>{data.rank}</td>
                              {/* <td>{data.tournamentFees}</td> */}
                              <td>{data.tournamentName}</td>
                              <td>{data.tournamentSize}</td>
                              {/* <td>{data.userAge}</td> */}
                            </tr>
                          ))
                        ) : error ? (
                          <tr>
                            <td colSpan="9" className="text-center">
                              {error}
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">
                              No tournament results available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

import React from "react";
import { useSelector } from "react-redux";

const dummyData = [
    { tournament: "Tournament 1", winner: "Winner One", email: "winner1@example.com", prize: "₹7,500" },
    { tournament: "Tournament 2", winner: "Winner Two", email: "winner2@example.com", prize: "₹4,500" },
    { tournament: "Tournament 3", winner: "Winner Three", email: "winner3@example.com", prize: "₹3,000" },
    { tournament: "Tournament 4", winner: "Winner Four", email: "winner4@example.com", prize: "₹1,875" },
    { tournament: "Tournament 5", winner: "Winner Five", email: "winner5@example.com", prize: "₹1,500" },
    { tournament: "Tournament 6", winner: "Winner Six", email: "winner6@example.com", prize: "₹1,125" },
    { tournament: "Tournament 7", winner: "Winner Seven", email: "winner7@example.com", prize: "₹750" },
    { tournament: "Tournament 8", winner: "Winner Eight", email: "winner8@example.com", prize: "₹375" },
    { tournament: "Tournament 9", winner: "Winner Nine", email: "winner9@example.com", prize: "₹300" },
    { tournament: "Tournament 10", winner: "Winner Ten", email: "winner10@example.com", prize: "₹225" } ];
  
export default function ResultTable() {
  const authToken = useSelector((state) => state.token);

  return (
    <section id="tournament">
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
                          <th scope="col">Tournament</th>
                          <th scope="col">Winner</th>
                          <th scope="col">Email</th>
                          <th scope="col">Prize</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyData.map((data, index) => (
                          <tr key={index}>
                            <th scope="row">{data.tournament}</th>
                            <td>{data.winner}</td>
                            <td>{data.email}</td>
                            <td>{data.prize}</td>
                          </tr>
                        ))}
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

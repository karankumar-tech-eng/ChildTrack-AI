import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MissingCases() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data.reports))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app">
      <Navbar />

      <div className="page-box">
        <h1>Missing Children Cases</h1>

        {reports.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="case-card">
              <h3>{report.childName}</h3>

              <p>
                <strong>Age:</strong> {report.age}
              </p>

              <p>
                <strong>Gender:</strong> {report.gender}
              </p>

              <p>
                <strong>Location:</strong> {report.location}
              </p>

              <p>
                <strong>Contact:</strong> {report.contact}
              </p>

              <p>
                <strong>Status:</strong> {report.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
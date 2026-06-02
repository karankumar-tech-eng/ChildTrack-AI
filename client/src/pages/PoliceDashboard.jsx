import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function PoliceDashboard() {
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
        <h1>Police Dashboard</h1>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h2>{reports.length}</h2>
            <p>Total Cases</p>
          </div>

          <div className="stat-card">
            <h2>
              {
                reports.filter(
                  (r) => r.status === "Pending Verification"
                ).length
              }
            </h2>
            <p>Pending Cases</p>
          </div>
        </div>

        {reports.map((report) => (
          <div className="case-card" key={report.id}>
            <h3>{report.childName}</h3>

            <p>Age: {report.age}</p>
            <p>Gender: {report.gender}</p>
            <p>Location: {report.location}</p>
            <p>Status: {report.status}</p>

            <div className="action-buttons">
              <button>Approve</button>
              <button className="secondary">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
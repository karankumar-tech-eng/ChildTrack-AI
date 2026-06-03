import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function PoliceDashboard() {
  const [reports, setReports] = useState([]);

  const fetchReports = () => {
    fetch("http://localhost:5000/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data.reports))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/reports/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      alert(data.message);
      fetchReports();
    } catch (error) {
      console.log(error);
      alert("Status update failed");
    }
  };

  const deleteReport = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/reports/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      fetchReports();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

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

          <div className="stat-card">
            <h2>
              {reports.filter((r) => r.status === "Approved").length}
            </h2>
            <p>Approved Cases</p>
          </div>
        </div>

        {reports.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          reports.map((report) => (
            <div className="case-card" key={report.id}>
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

              <div className="action-buttons">
                <button onClick={() => updateStatus(report.id, "Approved")}>
                  Approve
                </button>

                <button
                  className="secondary"
                  onClick={() => updateStatus(report.id, "Rejected")}
                >
                  Reject
                </button>

                <button
                  className="danger"
                  onClick={() => deleteReport(report.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
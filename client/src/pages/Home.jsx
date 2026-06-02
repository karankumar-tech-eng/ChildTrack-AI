import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.message))
      .catch(() => setBackendStatus("Backend not connected"));
  }, []);

  return (
    <div className="app">
      <Navbar />

      <section className="hero">
        <p className="tagline">AI Powered Missing Children Identification Platform</p>
        <h1>Helping Identify Missing Children Faster</h1>
        <p>
          ChildTrack AI helps citizens, NGOs and police report missing children,
          compare face images, manage cases and send alerts from one secure platform.
        </p>

        <div className="buttons">
          <button>Report Missing Child</button>
          <button className="secondary">View Cases</button>
        </div>

        <div className="status">{backendStatus}</div>
      </section>
    </div>
  );
}
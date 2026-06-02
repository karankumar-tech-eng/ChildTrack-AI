import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>ChildTrack AI</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/report">Report Child</Link>
        <Link to="/cases">Missing Cases</Link>
        <Link to="/dashboard">Police Dashboard</Link>
      </div>
    </nav>
  );
}
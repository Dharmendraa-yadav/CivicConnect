
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";

function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiFetch("/api/issues")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load issues");
        }
        return response.json();
      })
      .then((data) => {
        setIssues(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Home statistics error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const normalizeStatus = (status) =>
    (status || "").trim().toLowerCase();

  const totalIssues = issues.length;

  const resolvedIssues = issues.filter((issue) =>
    normalizeStatus(issue.status) === "resolved"
  ).length;

  const inProgressIssues = issues.filter((issue) =>
    normalizeStatus(issue.status) === "in progress"
  ).length;

  const underReviewIssues = issues.filter((issue) => {
    const status = normalizeStatus(issue.status);
    return status === "under review" || status === "under-review";
  }).length;

  return (
    <main>
      <section className="home-hero">
        <div className="home-content">
          <p className="eyebrow">SMART COMMUNITY PLATFORM</p>

          <h1>
            Report problems.
            <br />
            Improve your community.
          </h1>

          <p>
            CivicConnect helps citizens report community issues,
            track their progress, and stay informed about local
            improvements.
          </p>

          <div className="home-actions">
            <Link to="/report" className="primary-button">
              Report an Issue
            </Link>

            <Link to="/issues" className="secondary-button">
              Explore Issues
            </Link>
          </div>
        </div>

        <div className="home-info-card">
          <h2>Community at a glance</h2>

          {loading ? (
            <p>Loading community statistics...</p>
          ) : error ? (
            <p>Statistics are currently unavailable. Please try again later.</p>
          ) : (
            <div className="stats-grid">
              <div>
                <strong>{totalIssues}</strong>
                <span>Total Reports</span>
              </div>

              <div>
                <strong>{resolvedIssues}</strong>
                <span>Resolved</span>
              </div>

              <div>
                <strong>{inProgressIssues}</strong>
                <span>In Progress</span>
              </div>

              <div>
                <strong>{underReviewIssues}</strong>
                <span>Under Review</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="home-features">
        <div className="section-heading">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>Making community problem reporting easier</h2>
        </div>

        <div className="features-grid">
          <article>
            <span>01</span>
            <h3>Report</h3>
            <p>
              Submit details about a local problem with its
              location and description.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Track</h3>
            <p>
              Follow the status of your report from submission
              through resolution.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Resolve</h3>
            <p>
              Authorities can review and update issues until
              they are resolved.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;
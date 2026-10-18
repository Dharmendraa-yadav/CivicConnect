
import { apiFetch } from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/issues")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load community issues.");
        }
        return response.json();
      })
      .then((data) => {
        setIssues(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setError("Unable to load dashboard data. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const normalize = (value) =>
    (value || "").trim().toLowerCase();

  const total = issues.length;

  const reported = issues.filter(
    (issue) => normalize(issue.status) === "reported"
  ).length;

  const underReview = issues.filter(
    (issue) => normalize(issue.status) === "under review"
  ).length;

  const inProgress = issues.filter(
    (issue) => normalize(issue.status) === "in progress"
  ).length;

  const resolved = issues.filter(
    (issue) => normalize(issue.status) === "resolved"
  ).length;

  const categoryCounts = {};

  issues.forEach((issue) => {
    const category = issue.category || "Uncategorized";
    categoryCounts[category] =
      (categoryCounts[category] || 0) + 1;
  });

  const categories = Object.entries(categoryCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const recentIssues = [...issues]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  const statusClass = (status) => {
    const value = normalize(status);

    if (value === "resolved") return "dashboard-status-resolved";
    if (value === "in progress") return "dashboard-status-progress";
    if (value === "under review") return "dashboard-status-review";
    if (value === "reported") return "dashboard-status-reported";
    if (value === "assigned") return "dashboard-status-assigned";

    return "dashboard-status-default";
  };

  if (loading) {
    return (
      <main className="dashboard-state">
        <div className="dashboard-spinner" />
        <h2>Preparing your dashboard</h2>
        <p>Loading community issue statistics...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-state">
        <div className="dashboard-state-icon">!</div>
        <h2>Dashboard unavailable</h2>
        <p>{error}</p>
        <button
          className="dashboard-primary-button"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <span className="dashboard-eyebrow">
            CIVICCONNECT / OVERVIEW
          </span>
          <h1>Community Dashboard</h1>
          <p>
            Track reported community issues and follow their
            progress toward resolution.
          </p>
        </div>

        <Link
          to="/issues"
          className="dashboard-primary-button"
        >
          Explore issues <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="dashboard-section-heading">
        <div>
          <h2>Issue overview</h2>
          <p>A summary of the current community reports.</p>
        </div>
        <span className="dashboard-live-label">
          <span /> Live data
        </span>
      </section>

      <section className="dashboard-stats">
        <article className="dashboard-card dashboard-card-total">
          <div className="dashboard-card-top">
            <span className="dashboard-card-icon">▤</span>
            <span className="dashboard-card-label">ALL REPORTS</span>
          </div>
          <h3>{total}</h3>
          <p>Total community issues</p>
        </article>

        <article className="dashboard-card dashboard-card-reported">
          <div className="dashboard-card-top">
            <span className="dashboard-card-icon">◷</span>
            <span className="dashboard-card-label">NEW</span>
          </div>
          <h3>{reported}</h3>
          <p>Reported issues</p>
        </article>

        <article className="dashboard-card dashboard-card-review">
          <div className="dashboard-card-top">
            <span className="dashboard-card-icon">⌕</span>
            <span className="dashboard-card-label">REVIEW</span>
          </div>
          <h3>{underReview}</h3>
          <p>Under review</p>
        </article>

        <article className="dashboard-card dashboard-card-progress">
          <div className="dashboard-card-top">
            <span className="dashboard-card-icon">↗</span>
            <span className="dashboard-card-label">ONGOING</span>
          </div>
          <h3>{inProgress}</h3>
          <p>In progress</p>
        </article>

        <article className="dashboard-card dashboard-card-resolved">
          <div className="dashboard-card-top">
            <span className="dashboard-card-icon">✓</span>
            <span className="dashboard-card-label">COMPLETED</span>
          </div>
          <h3>{resolved}</h3>
          <p>Resolved issues</p>
        </article>
      </section>

      <section className="dashboard-content-grid">
        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Issues by category</h2>
              <p>Distribution of community reports</p>
            </div>
            <span className="dashboard-panel-icon">▥</span>
          </div>

          {categories.length === 0 ? (
            <div className="dashboard-empty">
              <span>▤</span>
              <p>No category data available yet.</p>
            </div>
          ) : (
            <div className="dashboard-category-list">
              {categories.map(([category, count], index) => (
                <div className="dashboard-category" key={category}>
                  <div className="dashboard-category-info">
                    <span>{category}</span>
                    <strong>{count}</strong>
                  </div>
                  <div
                    className="dashboard-category-track"
                    role="progressbar"
                    aria-label={`${category} issues`}
                    aria-valuemin={0}
                    aria-valuemax={total}
                    aria-valuenow={count}
                  >
                    <span
                      className={`dashboard-category-fill dashboard-category-fill-${index % 5}`}
                      style={{
                        width: `${total ? (count / total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="dashboard-panel dashboard-resolution-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Resolution snapshot</h2>
              <p>Current issue progress</p>
            </div>
            <span className="dashboard-panel-icon">✓</span>
          </div>

          <div className="dashboard-resolution-number">
            {total ? Math.round((resolved / total) * 100) : 0}
            <span>%</span>
          </div>
          <p className="dashboard-resolution-caption">
            of reported issues are resolved
          </p>

          <div className="dashboard-resolution-track">
            <span
              style={{
                width: `${total ? (resolved / total) * 100 : 0}%`,
              }}
            />
          </div>

          <div className="dashboard-resolution-footer">
            <span>Resolved</span>
            <strong>{resolved} of {total}</strong>
          </div>
        </article>
      </section>

      <section className="dashboard-panel dashboard-recent-panel">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Recent community reports</h2>
            <p>The latest five reports available from the API</p>
          </div>

          <Link to="/issues" className="dashboard-text-link">
            View all issues →
          </Link>
        </div>

        {recentIssues.length === 0 ? (
          <div className="dashboard-empty">
            <span>▤</span>
            <p>No community reports have been submitted yet.</p>
            <Link to="/report-issue" className="dashboard-text-link">
              Report an issue →
            </Link>
          </div>
        ) : (
          <div className="dashboard-recent-list">
            {recentIssues.map((issue) => (
              <div className="dashboard-recent-issue" key={issue.id}>
                <div className="dashboard-recent-symbol">▤</div>

                <div className="dashboard-recent-main">
                  <h3>{issue.title || "Untitled issue"}</h3>
                  <p>
                    {issue.category || "Uncategorized"}
                    <span>•</span>
                    {issue.location || "Location not provided"}
                  </p>
                </div>

                <span
                  className={`dashboard-status-badge ${statusClass(issue.status)}`}
                >
                  {issue.status || "Unknown"}
                </span>

                <Link
                  to={`/issues/${issue.id}`}
                  className="dashboard-view-link"
                  aria-label={`View details for ${issue.title || "issue"}`}
                >
                  →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="dashboard-footer">
        <span>CIVICCONNECT</span>
        <p>Better communities start with shared action.</p>
      </footer>
    </main>
  );
}

export default Dashboard;


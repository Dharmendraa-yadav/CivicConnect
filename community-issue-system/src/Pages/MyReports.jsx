
import { apiFetch } from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyReports() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    apiFetch("/api/issues/my")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load reports");
        }
        return response.json();
      })
      .then((data) => {
        setIssues(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("My Reports error:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const normalizeStatus = (status) =>
    (status || "").trim().toLowerCase();

  const resolvedCount = issues.filter(
    (issue) => normalizeStatus(issue.status) === "resolved"
  ).length;

  const activeCount = issues.filter(
    (issue) => normalizeStatus(issue.status) !== "resolved"
  ).length;

  const filteredIssues = issues.filter((issue) => {
    const query = search.toLowerCase();

    const matchesSearch = [
      issue.title,
      issue.location,
      issue.category,
      `CC${issue.id}`,
    ].some((value) => (value || "").toLowerCase().includes(query));

    const matchesStatus =
      statusFilter === "All" ||
      normalizeStatus(issue.status) === normalizeStatus(statusFilter);

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    const value = normalizeStatus(status).replace(/\s+/g, "-");

    if (value === "resolved") return "my-report-status-resolved";
    if (value === "in-progress") return "my-report-status-progress";
    if (value === "under-review" || value === "under review") {
      return "my-report-status-review";
    }

    return "my-report-status-default";
  };

  return (
    <main className="my-reports-page">
      <section className="my-reports-header">
        <p className="eyebrow">YOUR COMMUNITY CONTRIBUTION</p>
        <h1>My Reports</h1>
        <p>
          Keep track of the community issues you have submitted
          and follow their progress.
        </p>
      </section>

      {loading ? (
        <section className="my-reports-state">
          <div className="my-reports-loader" />
          <h2>Loading your reports...</h2>
          <p>Getting the latest information from CivicConnect.</p>
        </section>
      ) : error ? (
        <section className="my-reports-state">
          <h2>We couldn't load your reports</h2>
          <p>Please check your connection and sign in again if needed.</p>
          <button
            className="my-reports-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </section>
      ) : (
        <>
          <section className="my-reports-summary">
            <article className="my-reports-stat">
              <span className="my-reports-stat-icon">▤</span>
              <div>
                <p>Total Reports</p>
                <strong>{issues.length}</strong>
              </div>
            </article>

            <article className="my-reports-stat">
              <span className="my-reports-stat-icon">◷</span>
              <div>
                <p>Active Reports</p>
                <strong>{activeCount}</strong>
              </div>
            </article>

            <article className="my-reports-stat">
              <span className="my-reports-stat-icon">✓</span>
              <div>
                <p>Resolved Reports</p>
                <strong>{resolvedCount}</strong>
              </div>
            </article>
          </section>

          <section className="my-reports-toolbar">
            <div>
              <h2>Your submitted issues</h2>
              <p>Search your reports or filter them by status.</p>
            </div>

            <Link to="/report" className="my-reports-button">
              + Report an Issue
            </Link>
          </section>

          <section className="my-reports-filters">
            <input
              type="search"
              placeholder="Search title, category, location or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search your reports"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter reports by status"
            >
              <option value="All">All statuses</option>
              {[...new Set(issues.map((issue) => issue.status).filter(Boolean))]
                .map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
            </select>
          </section>

          {issues.length === 0 ? (
            <section className="my-reports-empty">
              <div className="my-reports-empty-icon">＋</div>
              <h2>No reports yet</h2>
              <p>
                You haven't reported a community issue yet.
                Submit your first report to get started.
              </p>
              <Link to="/report" className="my-reports-button">
                Report Your First Issue
              </Link>
            </section>
          ) : filteredIssues.length === 0 ? (
            <section className="my-reports-empty">
              <h2>No matching reports</h2>
              <p>Try changing your search or status filter.</p>
              <button
                className="my-reports-reset-button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
              >
                Clear Filters
              </button>
            </section>
          ) : (
            <section className="my-reports-list">
              {filteredIssues.map((issue) => (
                <article className="my-report-card" key={issue.id}>
                  <div className="my-report-main">
                    <div className="my-report-meta">
                      <span className="my-report-id">CC{issue.id}</span>
                      <span className="my-report-category">
                        {issue.category}
                      </span>
                    </div>

                    <h3>{issue.title}</h3>

                    <p className="my-report-location">
                      <span aria-hidden="true">⌖</span> {issue.location}
                    </p>

                    <p className="my-report-priority">
                      Priority: <strong>{issue.priority}</strong>
                    </p>
                  </div>

                  <div className="my-report-side">
                    <span
                      className={`my-report-status ${getStatusClass(issue.status)}`}
                    >
                      {issue.status || "Unknown"}
                    </span>

                    <Link
                      to={`/issues/${issue.id}`}
                      className="my-report-details-link"
                    >
                      View Details →
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default MyReports;
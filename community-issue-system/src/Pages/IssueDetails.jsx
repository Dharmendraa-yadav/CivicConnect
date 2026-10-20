
import { apiFetch } from "../services/api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function IssueDetails() {
  const { issueId } = useParams();

const [issue, setIssue] = useState(null);
const [history, setHistory] = useState([]);
const [notes, setNotes] = useState([]);
const [auditLogs, setAuditLogs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  setLoading(true);
  setError("");

 Promise.all([
  apiFetch(`/api/issues/${issueId}`),
  apiFetch(`/api/issues/${issueId}/history`),
  apiFetch(`/api/issues/${issueId}/notes`),
  apiFetch(`/api/issues/${issueId}/audit-logs`)
])
    .then(async ([issueResponse, historyResponse, notesResponse, auditResponse]) => {
      if (!issueResponse.ok) {
        throw new Error("Issue not found");
      }

      if (!historyResponse.ok) {
        throw new Error("Unable to load issue history");
      }

      if (!notesResponse.ok) {
        throw new Error("Unable to load issue notes");
      }
      if (!auditResponse.ok) {
  throw new Error("Unable to load audit logs");
}

      const issueData = await issueResponse.json();
      const historyData = await historyResponse.json();
      const notesData = await notesResponse.json();
      const auditData = await auditResponse.json();

      setIssue(issueData);
      setHistory(historyData);
      setNotes(notesData);
      setAuditLogs(auditData);
    })
    .catch((err) => {
      console.error("Issue details error:", err);
      setError("Unable to load this issue. Please try again.");
    })
    .finally(() => {
      setLoading(false);
    });
}, [issueId]);

  if (loading) {
    return (
      <main className="issue-detail-state">
        <div className="issue-detail-loader" />
        <h2>Loading issue details...</h2>
        <p>Please wait while we retrieve the latest information.</p>
      </main>
    );
  }

  if (error || !issue) {
    return (
      <main className="issue-detail-state">
        <div className="issue-detail-state-icon">!</div>
        <h2>{error || "Issue not found"}</h2>
        <p>The issue may be unavailable or may no longer exist.</p>
        <Link to="/issues" className="issue-detail-button">
          ← Back to Issues
        </Link>
      </main>
    );
  }

  const statuses = [
    "Reported",
    "Under Review",
    "Assigned",
    "In Progress",
    "Resolved",
  ];

  const normalize = (value) =>
    (value || "").trim().toLowerCase();

  const currentStatusIndex = statuses.findIndex(
    (status) => normalize(status) === normalize(issue.status)
  );

  const statusClass = (status) => {
    const value = normalize(status);

    if (value === "resolved") return "detail-status-resolved";
    if (value === "in progress") return "detail-status-progress";
    if (value === "under review") return "detail-status-review";
    if (value === "high") return "detail-priority-high";
    if (value === "medium") return "detail-priority-medium";
    if (value === "low") return "detail-priority-low";

    return "detail-status-default";
  };

  const formatDate = (value) => {
    if (!value) return "Not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  };

  return (
    <main className="issue-detail-page">
      <Link to="/issues" className="issue-detail-back">
        ← Back to Community Issues
      </Link>

      <section className="issue-detail-hero">
        <div>
          <p className="eyebrow">COMMUNITY ISSUE DETAILS</p>
          <div className="issue-detail-id">REPORT CC{issue.id}</div>
          <h1>{issue.title}</h1>
          <p className="issue-detail-intro">
            Follow the information and progress of this community report.
          </p>
        </div>

        <div className="issue-detail-badges">
          <span className={`issue-detail-badge ${statusClass(issue.status)}`}>
            {issue.status || "Unknown status"}
          </span>
          <span className={`issue-detail-badge ${statusClass(issue.priority)}`}>
            {issue.priority || "Priority not set"} Priority
          </span>
        </div>
      </section>

      <div className="issue-detail-layout">
        <section className="issue-detail-card">
          <div className="issue-detail-section-heading">
            <span className="issue-detail-heading-icon">▤</span>
            <div>
              <h2>Issue Overview</h2>
              <p>Information provided with this report.</p>
            </div>
          </div>

          <div className="issue-detail-description">
            <h3>Description</h3>
            <p>{issue.description || "No description available."}</p>
          </div>

          <div className="issue-detail-info-grid">
            <div className="issue-detail-info-item">
              <span>Category</span>
              <strong>{issue.category || "Not specified"}</strong>
            </div>

            <div className="issue-detail-info-item">
              <span>Location</span>
              <strong>{issue.location || "Not specified"}</strong>
            </div>

            <div className="issue-detail-info-item">
              <span>Reported by</span>
              <strong className="issue-detail-break">
                {issue.reportedBy || "Not available"}
              </strong>
            </div>

            <div className="issue-detail-info-item">
              <span>Issue reference</span>
              <strong>CC{issue.id}</strong>
            </div>
          </div>

          <div className="issue-detail-dates">
            <div>
              <span>Created</span>
              <strong>{formatDate(issue.createdAt)}</strong>
            </div>
            <div>
              <span>Last updated</span>
              <strong>{formatDate(issue.updatedAt)}</strong>
            </div>
          </div>
        </section>

        <aside className="issue-detail-card issue-detail-progress-card">
          <div className="issue-detail-section-heading">
            <span className="issue-detail-heading-icon">✓</span>
            <div>
              <h2>Issue Progress</h2>
              <p>Current status of this report.</p>
            </div>
          </div>

          <div className="issue-detail-timeline">
            {statuses.map((status, index) => {
              const completed = currentStatusIndex >= index;
              const current = currentStatusIndex === index;

              return (
                <div
                  className={`issue-detail-step ${
                    completed ? "is-completed" : ""
                  } ${current ? "is-current" : ""}`}
                  key={status}
                >
                  <div className="issue-detail-step-marker">
                    {completed ? "✓" : index + 1}
                  </div>

                  <div className="issue-detail-step-text">
                    <strong>{status}</strong>
                    {current && <span>Current status</span>}
                  </div>
                </div>
              );
            }
            )}
          </div>


{history.length > 0 && (
  <div className="issue-detail-history">
    <h3>Status History</h3>

    <div className="issue-history-list">
      {history.map((item) => (
        <div className="issue-history-item" key={item.id}>
          <div className="issue-history-marker">
            ✓
          </div>

          <div className="issue-history-content">
            <strong>
              {item.oldStatus} → {item.newStatus}
            </strong>

            <span>
              Changed by: {item.changedBy || "Administrator"}
            </span>

            <span>
              {formatDate(item.changedAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{notes.length > 0 && (
  <div className="issue-detail-notes">
    <h3>Progress Notes</h3>

    <div className="issue-notes-list">
      {notes.map((item) => (
        <div className="issue-note-item" key={item.id}>
          <div className="issue-note-marker">
            •
          </div>

          <div className="issue-note-content">
            <p>{item.note}</p>

            <span>
              Added by: {item.addedBy || "Administrator"}
            </span>

            <span>
              {formatDate(item.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{auditLogs.length > 0 && (
  <div className="issue-detail-audit">
    <h3>Audit Activity</h3>

    <div className="issue-audit-list">
      {auditLogs.map((item) => (
        <div className="issue-audit-item" key={item.id}>
          <div className="issue-audit-marker">
            ✓
          </div>

          <div className="issue-audit-content">
            <strong>{item.action}</strong>

            <p>{item.description}</p>

            <span>
              Performed by: {item.adminEmail || "Administrator"}
            </span>

            <span>
              {formatDate(item.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


          {currentStatusIndex === -1 && (
            <p className="issue-detail-note">
              Current status: {issue.status || "Not available"}. The timeline
              will reflect this status once it matches a defined stage.
            </p>
          )}

          {normalize(issue.status) === "resolved" && (
            <div className="issue-detail-resolved-note">
              ✓ This issue has been marked as resolved.
            </div>
          )}
        </aside>
      </div>

      <div className="issue-detail-footer">
        <p>Thank you for helping improve your community.</p>
        <Link to="/issues" className="issue-detail-button">
          Explore More Issues →
        </Link>
      </div>
    </main>
  );
}

export default IssueDetails;

import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    priority: "Medium",
    status: "Reported",
  });

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSuccess(false);
    setSubmitting(true);

    try {
      const response = await apiFetch("/api/issues", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create issue");
      }

      await response.json();

      setSuccess(true);
      setMessage("Your issue has been reported successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        priority: "Medium",
        status: "Reported",
      });
    } catch (error) {
      console.error("Report submission error:", error);
      setSuccess(false);
      setMessage("Unable to submit your report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="report-page">
      <section className="report-header">
        <p className="eyebrow">MAKE YOUR COMMUNITY BETTER</p>
        <h1>Report a Community Issue</h1>
        <p>
          Help improve your neighbourhood by reporting a problem.
          Provide accurate details so it can be reviewed and addressed.
        </p>
      </section>

      <section className="report-layout">
        <div className="report-form-card">
          <div className="report-card-heading">
            <span className="report-icon">＋</span>
            <div>
              <h2>Issue Details</h2>
              <p>Complete the information below.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="report-form">
            <div className="report-field">
              <label htmlFor="title">Issue title</label>
              <input
                id="title"
                name="title"
                placeholder="e.g. Broken streetlight"
                value={formData.title}
                onChange={handleChange}
                maxLength={150}
                required
              />
            </div>

            <div className="report-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the problem and how it affects the community..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                maxLength={2000}
                required
              />
            </div>

            <div className="report-field-grid">
              <div className="report-field">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  name="category"
                  placeholder="e.g. Roads, Waste"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="report-field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  placeholder="Street, area or landmark"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="report-field">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low — Minor issue</option>
                <option value="Medium">Medium — Needs attention</option>
                <option value="High">High — Urgent attention</option>
              </select>
            </div>

            <button
              type="submit"
              className="report-submit-button"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Issue →"}
            </button>

            {message && (
              <div
                className={`report-message ${
                  success ? "report-message-success" : "report-message-error"
                }`}
                role="status"
              >
                {message}
              </div>
            )}
          </form>
        </div>

        <aside className="report-guidance-card">
          <span className="report-guidance-icon">✓</span>
          <h2>Help us understand the issue</h2>
          <p>These simple tips help make your report more useful.</p>

          <div className="report-tip">
            <strong>01. Be specific</strong>
            <p>Use a clear title that describes the problem.</p>
          </div>

          <div className="report-tip">
            <strong>02. Add the location</strong>
            <p>Mention the street, area or a nearby landmark.</p>
          </div>

          <div className="report-tip">
            <strong>03. Choose priority carefully</strong>
            <p>Select the level of attention the issue needs.</p>
          </div>

          <div className="report-help-footer">
            Already submitted a report?
            <Link to="/my-reports"> Track your reports →</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default ReportIssue;
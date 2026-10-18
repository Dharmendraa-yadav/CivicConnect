import { apiFetch } from "../services/api";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Admin() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchIssues = async () => {
  try {
    const response = await apiFetch("/api/admin/issues");

    console.log("Admin response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Admin error:", errorText);
      throw new Error("Failed to load admin issues");
    }

    const data = await response.json();

    console.log("Admin issues:", data);

    setIssues(data);
    setLoading(false);
  } catch (error) {
    console.error("Admin fetch error:", error);
    setLoading(false);
  }
};
  useEffect(() => {
    fetchIssues();
  }, []);
// updatestatus
  const updateStatus = async (issue, newStatus) => {
    try {
          const response = await apiFetch(
      `/api/admin/issues/${issue.id}`,
      {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: issue.title,
            description: issue.description,
            category: issue.category,
            location: issue.location,
            priority: issue.priority,
            status: newStatus,
            reportedBy: issue.reportedBy,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update issue");
      }

      await fetchIssues();
    } catch (error) {
      console.error(error);
      alert("Failed to update issue");
    }
  };
  // delete issue
const deleteIssue = async (issueId) => {
  try {
    const response = await apiFetch(
      `/api/admin/issues/${issueId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete issue");
    }

    await fetchIssues();
  } catch (error) {
    console.error(error);
    alert("Failed to delete issue");
  }
};

const totalIssues = issues.length;

const resolvedIssues = issues.filter(
  (issue) => issue.status === "Resolved"
).length;

const underReviewIssues = issues.filter(
  (issue) => issue.status === "Under Review"
).length;

const pendingIssues = issues.filter(
  (issue) => issue.status !== "Resolved"
).length;

const statusData = [
  {
    name: "Reported",
    value: issues.filter((issue) => issue.status === "Reported").length,
  },
  {
    name: "Under Review",
    value: underReviewIssues,
  },
  {
    name: "Assigned",
    value: issues.filter((issue) => issue.status === "Assigned").length,
  },
  {
    name: "In Progress",
    value: issues.filter((issue) => issue.status === "In Progress").length,
  },
  {
    name: "Resolved",
    value: resolvedIssues,
  },
];

const priorityData = ["High", "Medium", "Low"].map((priority) => ({
  name: priority,
  total: issues.filter((issue) => issue.priority === priority).length,
}));

const chartColors = ["#2563eb", "#9333ea", "#d97706", "#0891b2", "#16a34a"];

  if (loading) {
    return <h2>Loading admin dashboard...</h2>;
  }

  return (
    <main className="admin-page">
      <p className="eyebrow">CIVICCONNECT ADMIN</p>

      <h1>Issue Management</h1>

      
<section className="admin-stats">
  <article className="stat-card">
    <h3>Total Issues</h3>
    <p>{totalIssues}</p>
  </article>

  <article className="stat-card">
    <h3>Pending Issues</h3>
    <p>{pendingIssues}</p>
  </article>

  <article className="stat-card">
    <h3>Under Review</h3>
    <p>{underReviewIssues}</p>
  </article>

  <article className="stat-card">
    <h3>Resolved Issues</h3>
    <p>{resolvedIssues}</p>
  </article>
</section>

<section className="admin-charts">
  <article className="chart-card">
    <h2>Issues by Status</h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={statusData.filter((item) => item.value > 0)}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={95}
          label
        >
          {statusData
            .filter((item) => item.value > 0)
            .map((item) => (
              <Cell key={item.name} fill={chartColors[statusData.indexOf(item)]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </article>

  <article className="chart-card">
    <h2>Issues by Priority</h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={priorityData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="total" name="Issues" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  </article>
</section>
      <p>
        Review community reports and update their progress.
      </p>

      <section className="admin-issues">
        {issues.length === 0 ? (
          <p>No issues available.</p>
        ) : (
          issues.map((issue) => (
            <article className="admin-issue-card" key={issue.id}>
              <div>
                <p>CC{issue.id}</p>

                <h2>{issue.title}</h2>

                <p>{issue.description}</p>

                <p>
                  <strong>Category:</strong> {issue.category}
                </p>

                <p>
                  <strong>Location:</strong> {issue.location}
                </p>

                <p>
                  <strong>Priority:</strong> {issue.priority}
                </p>

                <p>
                  <strong>Reported By:</strong> {issue.reportedBy}
                </p>
              </div>

              <div>
                <label>
                  Status:
                  <select
                    value={issue.status}
                    onChange={(event) =>
                      updateStatus(
                        issue,
                        event.target.value
                      )
                    }
                  >
                    <option value="Reported">
                      Reported
                    </option>

                    <option value="Under Review">
                      Under Review
                    </option>

                    <option value="Assigned">
                      Assigned
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>
                </label>
                <button onClick={() => deleteIssue(issue.id)}>
  Delete Issue
</button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Admin;
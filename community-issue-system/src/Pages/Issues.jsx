import { apiFetch } from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      apiFetch("/api/issues")
      .then((response) => response.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...new Set(issues.map((issue) => issue.category)),
  ];

  const statuses = [
    "All",
    ...new Set(issues.map((issue) => issue.status)),
  ];

  const priorities = [
    "All",
    ...new Set(issues.map((issue) => issue.priority)),
  ];

  const filteredIssues = issues.filter((issue) => {
    const searchText = search.trim().toLowerCase();

const matchesSearch =
  (issue.title || "").toLowerCase().includes(searchText) ||
  (issue.location || "").toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || issue.category === category;

    const matchesStatus =
      status === "All" || issue.status === status;

    const matchesPriority =
      priority === "All" || issue.priority === priority;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesPriority
    );
  });

  if (loading) {
    return <h2>Loading issues...</h2>;
  }

  return (
    <main className="issues-page">
      <h1>Community Issues</h1>

      <div className="issue-filters">

        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              Category: {item}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              Status: {item}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          {priorities.map((item) => (
            <option key={item} value={item}>
              Priority: {item}
            </option>
          ))}
        </select>
        <button
  type="button"
  onClick={() => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setPriority("All");
  }}
>
  Clear Filters
</button>

      </div>

      <p>
        Showing <strong>{filteredIssues.length}</strong> issue(s)
      </p>

      {filteredIssues.length === 0 ? (
        <p>No matching issues found.</p>
      ) : (
        <div className="issues-grid">
          {filteredIssues.map((issue) => (
            <article className="issue-card" key={issue.id}>
              <h2>{issue.title}</h2>

              <p>{issue.description}</p>

              <p>
                <strong>Category:</strong> {issue.category}
              </p>

              <p>
                <strong>Location:</strong> {issue.location}
              </p>

             <p>
  <strong>Priority:</strong>{" "}
  <span className={`priority-badge ${(issue.priority || "").toLowerCase()}`}>
    {issue.priority}
  </span>
</p>

<p>
  <strong>Status:</strong>{" "}
  <span className={`status-badge ${(issue.status || "").toLowerCase().replace(/\s+/g, "-")}`}>
    {issue.status}
  </span>
</p>

              <Link to={`/issues/${issue.id}`}>
                View Details
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Issues;
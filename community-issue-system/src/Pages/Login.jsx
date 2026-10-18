
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        setMessage("Invalid email or password. Please try again.");
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      setSuccess(true);
      setMessage("Login successful! Redirecting...");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand-icon">C</div>

        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login to CivicConnect</h1>
        <p className="auth-subtitle">
          Sign in to report community problems and track your reports.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            className="auth-submit-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign In →"}
          </button>

          {message && (
            <p
              className={`auth-message ${
                success ? "auth-message-success" : "auth-message-error"
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>

        <div className="auth-bottom">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>

        <div className="auth-security-note">
          <span>✓</span> Your community starts with your voice.
        </div>
      </section>
    </main>
  );
}

export default Login;
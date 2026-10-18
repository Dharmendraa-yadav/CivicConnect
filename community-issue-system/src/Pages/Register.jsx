
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: "USER",
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error("Registration error:", error);
        setMessage(
          "Registration failed. Check your details or try another email."
        );
        return;
      }

      setSuccess(true);
      setMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand-icon">C</div>

        <p className="eyebrow">JOIN YOUR COMMUNITY</p>
        <h1>Create your account</h1>
        <p className="auth-subtitle">
          Join CivicConnect to report local problems and follow their progress.
        </p>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="auth-field">
            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              maxLength={100}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            className="auth-submit-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Create Account →"}
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
          Already have an account? <Link to="/login">Sign in</Link>
        </div>

        <div className="auth-security-note">
          <span>✓</span> Every community improvement starts with participation.
        </div>
      </section>
    </main>
  );
}

export default Register;
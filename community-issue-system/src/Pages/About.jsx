
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <span className="about-eyebrow">
          ABOUT CIVICCONNECT
        </span>

        <h1>
          Better Communities
          <span> Begin With Us.</span>
        </h1>

        <p>
          CivicConnect is a community issue reporting and management
          platform designed to help citizens report local problems,
          follow their progress, and encourage transparent issue management.
        </p>

        <div className="about-hero-actions">
          <Link to="/issues" className="about-primary-button">
            Explore Community Issues <span>→</span>
          </Link>

          <Link to="/report" className="about-secondary-button">
            Report an Issue
          </Link>
        </div>

        <div className="about-hero-decoration" aria-hidden="true">
          <div className="about-decoration-circle about-circle-one" />
          <div className="about-decoration-circle about-circle-two" />
          <div className="about-decoration-grid">+</div>
        </div>
      </section>

      <section className="about-intro">
        <div className="about-section-label">
          <span>01</span> OUR PURPOSE
        </div>

        <div className="about-intro-content">
          <h2>
            Every community deserves
            <span> a better way forward.</span>
          </h2>

          <p>
            Local problems can affect everyday life. CivicConnect provides
            a central place where people can report concerns and track
            available updates. Our goal is to make community issue
            management easier to follow and understand.
          </p>
        </div>
      </section>

      <section className="about-mission-section">
        <article className="about-mission-card">
          <div className="about-card-icon about-icon-mission">◎</div>
          <span className="about-card-kicker">OUR MISSION</span>
          <h2>Make reporting easier.</h2>
          <p>
            Provide a straightforward way for citizens to share local
            concerns and keep track of their reports.
          </p>
        </article>

        <article className="about-mission-card about-vision-card">
          <div className="about-card-icon about-icon-vision">↗</div>
          <span className="about-card-kicker">OUR VISION</span>
          <h2>Build connected communities.</h2>
          <p>
            Encourage civic participation and clearer communication
            around community problems and their progress.
          </p>
        </article>

        <article className="about-mission-card">
          <div className="about-card-icon about-icon-transparency">◇</div>
          <span className="about-card-kicker">OUR PRINCIPLE</span>
          <h2>Support transparency.</h2>
          <p>
            Make issue statuses easier to understand so users can follow
            reports through the available stages of management.
          </p>
        </article>
      </section>

      <section className="about-process-section">
        <div className="about-section-label">
          <span>02</span> HOW IT WORKS
        </div>

        <div className="about-process-heading">
          <h2>A clearer path from report to resolution.</h2>
          <p>
            CivicConnect organizes community reports into a simple,
            trackable process.
          </p>
        </div>

        <div className="about-process-grid">
          <article className="about-process-card">
            <span className="about-process-number">01</span>
            <div className="about-process-icon">✎</div>
            <h3>Report</h3>
            <p>
              Submit a local concern with its description, category,
              location, and priority.
            </p>
          </article>

          <article className="about-process-card">
            <span className="about-process-number">02</span>
            <div className="about-process-icon">⌕</div>
            <h3>Review</h3>
            <p>
              Follow the report as its status changes through the
              issue management process.
            </p>
          </article>

          <article className="about-process-card">
            <span className="about-process-number">03</span>
            <div className="about-process-icon">◷</div>
            <h3>Track</h3>
            <p>
              Visit your reports and issue details to check their
              available status and updates.
            </p>
          </article>

          <article className="about-process-card">
            <span className="about-process-number">04</span>
            <div className="about-process-icon">✓</div>
            <h3>Resolve</h3>
            <p>
              When an issue is marked resolved, users can see its
              updated status on the platform.
            </p>
          </article>
        </div>
      </section>

      <section className="about-community-banner">
        <div>
          <span className="about-banner-label">BE PART OF THE CHANGE</span>
          <h2>Small actions can support better communities.</h2>
          <p>
            Explore existing reports or contribute by sharing a
            community issue.
          </p>
        </div>

        <div className="about-banner-actions">
          <Link to="/issues" className="about-banner-button">
            View Issues →
          </Link>
          <Link to="/report" className="about-banner-link">
            Submit a Report
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;


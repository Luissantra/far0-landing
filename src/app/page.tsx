import ScrollStage from "@/components/landing/ScrollStage";
import { FaroLockup, FaroIcon } from "@/components/landing/Logo";

const steps = [
  { name: "Perceive", text: "Keep confirmed facts separate. Verify the gaps that matter." },
  { name: "Decide", text: "Show the plan’s assumptions and the cost of waiting." },
  { name: "Act", text: "Coordinate calls and SMS. Replan when an assumption breaks." },
];

function DashboardLink({ className }: { className: string }) {
  const dashboardUrl = process.env.DASHBOARD_URL?.trim();

  return dashboardUrl ? (
    <a className={className} href={dashboardUrl} target="_blank" rel="noopener">
      Open dashboard<span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <span className={className} role="link" aria-disabled="true">
      Demo coming soon
    </span>
  );
}

export default function LandingPage() {
  const repositoryUrl = process.env.REPOSITORY_URL?.trim();

  return (
    <>
      <a className="lp-skip" href="#main">
        Skip to content
      </a>
      <section className="lp-intro" id="top" aria-label="Far0">
        <div className="lp-intro-stage">
          <FaroLockup className="lp-intro-lockup" gradientId="intro-gradient" />
          <a className="lp-intro-hint" href="#hero">
            Scroll <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <header className="lp-nav">
        <nav className="lp-wrap lp-nav-inner" aria-label="Primary">
          <a href="#top" aria-label="Far0, back to top">
            <FaroLockup gradientId="nav-gradient" />
          </a>
          <ul className="lp-nav-links">
            <li>
              <a href="#how">The system</a>
            </li>
            <li>
              <a href="#control">Human control</a>
            </li>
          </ul>
          <DashboardLink className="lp-btn lp-btn-outline lp-nav-cta" />
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="lp-hero" id="hero" aria-labelledby="hero-title">
          <div className="lp-hero-inner lp-wrap">
            <p className="lp-hero-intro">An agentic command center for changing crises.</p>
            <div className="lp-hero-composition">
              <h1 id="hero-title">
                See clearly.
                <br />
                Decide before
                <br />
                it&apos;s certain.
              </h1>
              <FaroIcon
                className="lp-hero-mark"
                title="Far0 square logo"
                gradientId="hero-gradient"
              />
            </div>
            <div className="lp-hero-bottom">
              <p className="lp-lede">
                Turn incomplete signals into coordinated action.
                <br />
                Keep a human in control.
              </p>
              <DashboardLink className="lp-btn lp-btn-primary" />
            </div>
            <div className="lp-hero-foot">
              <p>Built for the HappyRobot challenge</p>
              <a href="#problem">
                How it works <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>
        <section className="lp-response lp-wrap" id="problem" aria-labelledby="problem-title">
          <div className="lp-section-heading">
            <h2 id="problem-title">A crisis moves faster than certainty.</h2>
            <p>
              Reports conflict. Resources are limited. Waiting for the full picture is a decision
              too.
            </p>
          </div>
          <div className="lp-system" id="how">
            <ScrollStage src="/media/faro-scroll.mp4" poster="/media/faro-poster.jpg">
              <p className="lp-render-caption">A clear direction. Even as conditions change.</p>
            </ScrollStage>
            <div className="lp-system-copy">
              <h3>
                One picture. <br />A response that adapts.
              </h3>
              <ol className="lp-steps">
                {steps.map((step) => (
                  <li key={step.name}>
                    <h4>{step.name}</h4>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
              <p className="lp-system-note">The crisis changes. The decision loop stays.</p>
            </div>
          </div>
        </section>
        <section className="lp-control" id="control" aria-labelledby="control-title">
          <div className="lp-wrap lp-control-grid">
            <div className="lp-control-copy">
              <p className="lp-section-label">Human control</p>
              <h2 id="control-title">
                Autonomy.
                <br />
                With authority
                <br />
                in your hands.
              </h2>
              <p>
                See the reason behind an action. Review its consequences. Approve, hold or override.
              </p>
              <p className="lp-control-promise">Mass alerts always need human approval.</p>
            </div>
            <figure className="lp-decision">
              <figcaption className="lp-decision-caption">
                <span>Decision review</span>
                <span>Illustrative view</span>
              </figcaption>
              <div className="lp-decision-body">
                <span className="lp-status">
                  <span aria-hidden="true" />
                  Awaiting your decision
                </span>
                <h3>Send a public alert</h3>
                <p className="lp-decision-summary">
                  A changing situation puts the current plan in doubt.
                </p>
                <dl className="lp-decision-reasons">
                  <div>
                    <dt>What changed</dt>
                    <dd>The planned access route is unavailable.</dd>
                  </div>
                  <div>
                    <dt>Proposed response</dt>
                    <dd>Verify an alternative. Update the people affected.</dd>
                  </div>
                </dl>
                <details className="lp-consequence">
                  <summary>Review the trade-off</summary>
                  <p>
                    Holding the alert gives the coordinator time to verify the route. People remain
                    uninformed while that check is pending.
                  </p>
                </details>
                <p className="lp-decision-gate">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="5" y="10" width="14" height="11" rx="3" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
                  </svg>
                  Nothing is sent from this illustration.
                </p>
              </div>
            </figure>
          </div>
        </section>
        <section className="lp-demo lp-wrap" id="demo" aria-labelledby="demo-title">
          <div className="lp-demo-top">
            <h2 id="demo-title">
              Change the situation.
              <br />
              Watch the plan change.
            </h2>
            <DashboardLink className="lp-btn lp-btn-primary" />
          </div>
          <div className="lp-use-case">
            <p>
              One use case.
              <br />
              <span>Simulated scenario</span>
            </p>
            <div>
              <h3>Sierra Bermeja wildfire</h3>
              <p>
                Explore changing wind, a closed road and an SMS outage in the operator prototype.
              </p>
              <p className="lp-case-context">Scenario context: 112 Andalucía and INFOCA.</p>
            </div>
          </div>
          <p className="lp-demo-note">
            Hackathon prototype. Communications are simulated by default.
          </p>
        </section>
      </main>
      <footer className="lp-footer lp-wrap">
        <FaroLockup gradientId="footer-gradient" />
        <p>HackSpain 2026 · HappyRobot challenge</p>
        {repositoryUrl ? <a href={repositoryUrl}>Source code</a> : null}
      </footer>
    </>
  );
}

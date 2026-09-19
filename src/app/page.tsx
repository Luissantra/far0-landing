import Image from "next/image";
import ScrollStage from "@/components/landing/ScrollStage";
import { FaroLockup, FaroIcon } from "@/components/landing/Logo";

const steps = [
  {
    name: "Filter",
    text: "Find the signals that matter.",
    icon: (
      <>
        <circle cx="20" cy="20" r="3" fill="currentColor" stroke="none" />
        <path d="M20 5A15 15 0 0 0 5 20M35 20A15 15 0 0 1 20 35M20 11A9 9 0 0 0 11 20M29 20A9 9 0 0 1 20 29" />
      </>
    ),
  },
  {
    name: "Prioritize",
    text: "Turn signals into priorities.",
    icon: (
      <>
        <path d="M12 9h23M12 20h16M12 31h9" />
        <circle cx="5" cy="9" r="2" fill="currentColor" />
        <circle cx="5" cy="20" r="2" />
        <circle cx="5" cy="31" r="2" />
      </>
    ),
  },
  {
    name: "Coordinate",
    text: "Put resources where they’re needed.",
    icon: (
      <>
        <path d="M5 20h9m6-3 8-8h7m-15 14 8 8h7" />
        <circle cx="17" cy="20" r="3" />
        <circle cx="35" cy="9" r="2" fill="currentColor" />
        <circle cx="35" cy="31" r="2" fill="currentColor" />
      </>
    ),
  },
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

function InformationRibbon() {
  return (
    <aside className="lp-ribbon" aria-label="Partners, technology and our mission" id="ecosystem">
      <input className="lp-ribbon-toggle sr-only" type="checkbox" id="pause-ribbon" />
      <label className="lp-ribbon-control" htmlFor="pause-ribbon">
        <span className="sr-only">Pause information strip</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path className="lp-ribbon-pause" d="M9 5v14M15 5v14" strokeWidth="2" />
          <path className="lp-ribbon-play" d="m9 5 10 7-10 7Z" />
        </svg>
      </label>
      <div className="lp-ribbon-viewport">
        <div className="lp-ribbon-track">
          {[0, 1].map((copy) => (
            <ul className="lp-ribbon-group" key={copy} aria-hidden={copy === 1 || undefined}>
              <li className="lp-ribbon-brand">
                <span className="lp-ribbon-label">Built with</span>
                <Image
                  src="/brand/happyrobot.svg"
                  alt="HappyRobot"
                  width={141}
                  height={22}
                  loading="eager"
                />
              </li>
              <li className="lp-ribbon-message">
                Less noise. <span>More action.</span>
              </li>
              <li className="lp-ribbon-brand">
                <span className="lp-ribbon-label">Partner</span>
                <Image
                  className="lp-ribbon-junta"
                  src="/brand/junta-de-andalucia.png"
                  alt="Junta de Andalucía"
                  width={184}
                  height={48}
                  loading="eager"
                />
              </li>
              <li className="lp-ribbon-message">
                One goal. <span>Zero preventable harm.</span>
              </li>
              <li className="lp-ribbon-brand">
                <span className="lp-ribbon-label">Signal intelligence</span>
                <span className="lp-ribbon-jev">Jev / typesafe.ai</span>
              </li>
              <li className="lp-ribbon-event">
                HackSpain <span>2026</span>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function LandingPage() {
  const repositoryUrl = process.env.REPOSITORY_URL?.trim();

  return (
    <>
      <a className="lp-skip" href="#main">
        Skip to content
      </a>
      <ScrollStage
        className="lp-intro"
        id="top"
        label="Far0"
        pinned
        halo={false}
        src="/media/faro-intro.mp4"
        poster="/media/faro-intro-poster.jpg"
      >
        <div className="lp-intro-stage">
          <FaroLockup className="lp-intro-lockup" gradientId="intro-gradient" />
          <a className="lp-intro-hint" href="#hero">
            Scroll <span aria-hidden="true">↓</span>
          </a>
        </div>
      </ScrollStage>
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
            <p className="lp-hero-intro">Agentic crisis response</p>
            <div className="lp-hero-composition">
              <h1 id="hero-title">
                From noise
                <br />
                to coordinated
                <br />
                action.
              </h1>
              <FaroIcon
                className="lp-hero-mark"
                title="Far0 square logo"
                gradientId="hero-gradient"
              />
            </div>
            <div className="lp-hero-bottom">
              <p className="lp-lede">
                Filter the noise. Rank what matters.
                <br />
                Coordinate the response.
              </p>
              <div className="lp-hero-actions">
                <a className="lp-btn lp-btn-primary" href="#how">
                  See Far0 respond <span aria-hidden="true">↗</span>
                </a>
                <DashboardLink className="lp-btn lp-btn-outline" />
              </div>
            </div>
            <div className="lp-hero-foot">
              <p>One goal: zero preventable harm.</p>
              <a href="#meaning">
                What Far0 stands for <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>
        <InformationRibbon />
        <section className="lp-response lp-wrap" id="problem" aria-labelledby="problem-title">
          <div className="lp-section-heading">
            <h2 id="problem-title">
              Intelligence,
              <br />
              coordinated.
            </h2>
            <p>Less noise. Clear priorities. Resources in motion.</p>
          </div>
          <div className="lp-system" id="how">
            <ScrollStage src="/media/faro-scroll.mp4" poster="/media/faro-poster.jpg" steps={steps}>
              <p className="lp-render-caption">New information. Reassess. Adapt.</p>
            </ScrollStage>
            <div className="lp-technology">
              <a className="lp-happyrobot" href="https://www.happyrobot.ai">
                <span>Built with</span>
                <Image src="/brand/happyrobot.svg" alt="HappyRobot" width={141} height={22} />
              </a>
              <a href="https://typesafe.ai">Signal filtering: Jev / typesafe.ai</a>
            </div>
          </div>
        </section>
        <section className="lp-control" id="control" aria-labelledby="control-title">
          <div className="lp-wrap lp-control-grid">
            <div className="lp-control-copy">
              <p className="lp-section-label">Human control</p>
              <h2 id="control-title">
                Autonomous action.
                <br />
                Human authority.
              </h2>
            </div>
            <div className="lp-control-copy">
              <p className="lp-control-promise">Mass alerts always need human approval.</p>
              <details className="lp-consequence">
                <summary>Before an alert is sent</summary>
                <p>Review recipients and safety guidance. Approve, hold or override.</p>
              </details>
            </div>
          </div>
        </section>
        <section className="lp-demo lp-wrap" id="demo" aria-labelledby="demo-title">
          <div className="lp-demo-top">
            <h2 id="demo-title">
              Change the situation.
              <br />
              See Far0 respond.
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
              <p>A wind shift. Reassigned firefighting resources. A human-approved alert.</p>
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

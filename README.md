# Far0 landing

Standalone landing for **Far0**, an agentic command center for changing crises.
HackSpain 2026 · HappyRobot challenge.

The landing is served at `/`; `/landing` redirects to `/`. This repository
contains no operator dashboard, API, database, AI integration or live messaging.

## Run

Use Node.js 22.21+ within the 22.x release line and npm. npm 11.6.1 is recorded
for Corepack users; Node's bundled npm 10.9+ also works.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. No credentials or external services are needed.

For a production build:

```sh
npm run build
npm start
```

Runtime dependencies are Next.js and React. Tailwind v4 handles the CSS baseline
and utilities; the landing design lives in scoped plain CSS. Versions match the
source project's lockfile and are pinned.

## Configuration

Copy `.env.example` to an ignored `.env.local`, then set the values you need:

| Variable               | Purpose                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `DASHBOARD_URL`        | Absolute HTTP(S) URL of the independently hosted operator dashboard.                                                         |
| `NEXT_PUBLIC_SITE_URL` | Public origin of this landing for canonical and social metadata. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is the fallback. |
| `REPOSITORY_URL`       | Optional repository URL for the footer's “Source code” link.                                                                 |

Without `DASHBOARD_URL`, the three dashboard CTAs say “Demo coming soon” and are
unavailable. They do not open the landing itself or an invented deployment.
Once configured, they open the dashboard in a new tab with `rel="noopener"`.
The footer source link appears only when `REPOSITORY_URL` is configured.

These values are included in static output at build time. Rebuild after changing
them in production; restart the development server after editing `.env.local`.
Never put credentials in these variables.

Social cards currently use the existing lighthouse poster. A bespoke 1200×630
Open Graph image is optional future design work; there is no missing-image URL.

## Checks

```sh
npm run check
```

This runs Secretlint, Prettier, ESLint, TypeScript, a production build and HTTP
smoke tests. `npm test` starts its own production server on an available port;
run `npm run build` first if testing separately.

Verified on Linux with Node 22.21.0 and npm 10.9.4. All eight smoke tests passed
both without configuration and with a test dashboard URL supplied at build time.

The smoke tests cover root/legacy routes, absent operator APIs, configured and
unconfigured dashboard CTAs, assets, video range requests, poster fallback and
social-image metadata. They are not browser interaction tests.

Secretlint scans Git-tracked/staged files. Stage new files explicitly before
the final check so they are included. Do not stage `.env.local`, generated output
or dependencies.

Validation stays local: do not add CI workflows. No Git hooks are installed by
this standalone package. Run the complete check before committing or publishing.

## Project map

- `src/app/page.tsx` — landing and server-rendered configurable dashboard links.
- `src/app/layout.tsx` — document, metadata and `.lp` wrapper.
- `src/app/globals.css` — Tailwind and base typography.
- `src/app/landing.css` — scoped design, responsive layout and animation.
- `src/app/icon.svg` — gradient square favicon.
- `src/components/landing/Logo.tsx` — square SVG symbol and vector wordmark.
- `src/components/landing/ScrollStage.tsx` — videos, name animation and manual response; the sole client component.
- `public/brand/` — original Far0 exports, Quiver wordmark and official partner/technology logos.
- `public/media/` — committed videos and posters.
- `scripts/landing-video/` — optional media renderer.
- `docs/design-context.md` — confirmed decisions and continuation brief.
- `AGENTS.md` — instructions for subsequent coding sessions.

## Media and motion

Two lighthouse videos are committed, each six seconds, 1920×1080, H.264,
24 fps, all-intra (`-g 1`), about 3 MB and silent, with a 1920×1080 JPEG poster:

- `faro-intro.mp4` — the intro dolly from the studio view into the lantern room,
  scrubbed while the intro is pinned at the top of the page.
- `faro-scroll.mp4` — the orbit shown in the system section as it scrolls in.

Both use the same `ScrollStage` client component (`pinned` selects the intro
behaviour). Scroll scrubbing is enabled from 768px and respects reduced motion.
The static poster remains for mobile, reduced motion, disabled JavaScript and
video errors; there the intro is a single static screen. Video loading is
deferred until its section is nearby.

Below the emerald hero, a horizontal information strip mixes HappyRobot,
Junta de Andalucía and HackSpain logos, the Jev / typesafe.ai credit, the 2026
event year and short mission statements. A native checkbox pauses the CSS animation without
JavaScript, and hovering pauses it on pointer devices. Reduced motion shows
all items in a static, wrapping layout. The decorative duplicate is hidden
from assistive technology. All logos are served locally; asset provenance and
the user-selected partner are recorded in `docs/design-context.md`.

Beside the second lighthouse, F / a / r explains Fully / Automated / Response.
The zero types “harm”, “time lost” and “victims” as an explicit aspiration,
with Pause / Resume. Typing pauses offscreen or in a hidden tab. Reduced motion
and disabled JavaScript show all goals statically; screen readers receive one
stable description.

Filter / Prioritize / Coordinate icons and one glass card sit underneath.
“Show the response” starts the manual sequence: wind shift, threat priority,
resource reassignment and “Alert ready for approval”. “Next step”, “Back” and
“Replay scenario” never advance automatically or approve an alert. Each change
has a polite status announcement. Returning to step one moves focus from the
disabled Back button to Next step without scrolling. Without JavaScript, the
full summary stays visible and the controls are hidden. Reduced motion keeps
the controls without transitions. The landing sends no messages.

The mouse halo is pointer-transparent and limited to fine mouse pointers,
desktop widths and no reduced-motion preference. The hero's mint light sweep
runs once on entry and is disabled with reduced motion.

To regenerate the media, install Blender 4.5 LTS and FFmpeg:

```sh
npm run render:video   # faro-scroll.mp4 + faro-poster.jpg
npm run render:intro   # faro-intro.mp4 + faro-intro-poster.jpg
```

Set `BLENDER` if the executable is not named `blender` on your PATH. For example,
Bash supports `BLENDER="/path/to/blender" npm run render:video`; in PowerShell,
set `$env:BLENDER` before running the npm command.

The renderer uses Cycles, 48 source frames at 8 fps, FFmpeg interpolation to
24 fps and all-intra encoding. It caches frames under the user's home directory,
removes them after success and preserves them on failure. Media is already
committed: Blender and FFmpeg are not required for normal development.

## Continue in another Devin session

Connect this repository to Devin's GitHub integration, select it for the new
session, and ask:

> Continue the Far0 landing. Read AGENTS.md, README.md and
> docs/design-context.md first. Install with npm ci and run the local checks.
> Start the app and expose a preview before making my requested changes.
> Keep the confirmed design and do not publish or deploy without my approval.

The separate repository is the source for future landing work. The original
session is linked in the design context for historical reference.

## Provenance

Extracted from `alvarovegaromero/hackandalus-hackathon`, branch
`feat/landing-page`, commit `4ae62c179bd587c69b5d6a877bd7f7ad9248ce5c`.
The original source repository is preserved. Its MIT copyright notice is
retained in `LICENSE`.

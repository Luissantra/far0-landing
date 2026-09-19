# Far0 — confirmed design and continuation context

## Source

- Original session: https://app.devin.ai/sessions/dca6d9a54c6e4e018f20750c4d09b48d
- Original repository: https://github.com/alvarovegaromero/hackandalus-hackathon
- Source commit: `4ae62c179bd587c69b5d6a877bd7f7ad9248ce5c`.
- The user requested a separate repository containing only the landing, to
  continue its development from that source in another chat.

This repository intentionally starts its own history. It contains the final
landing assets and render source, not the original dashboard or its Git history.

## Intent and audience

Far0 is an agentic command center for crises that change while the system runs.
It uses incomplete information, updates plans and coordinates actions with
human oversight. This is a HackSpain 2026 submission for the HappyRobot challenge.

The main audience is the jury: understand the difference quickly and reach the
demo. Human control is the primary proof point. Sierra Bermeja is a secondary,
explicitly simulated use case, not the overarching product identity.

## Direction chosen by the user

The user found the first version too long and text-heavy, with repetitive
cards, weak first-screen impact and a flat lighthouse. They requested:

- A short, premium presentation: clear, precise, technical and spacious.
- A hero consisting of typography and the supplied square logo.
- Monospace headlines with medium weight.
- Ink `#131720`, paper `#f4f2ec` and supplied-brand green in graphics.
- A few large scenes rather than many similar cards.
- Problem → what changes with Far0 → demonstration.
- Prominent human control and direct access to the separate dashboard.
- A dimensional 3D lighthouse render with materials, lighting and a green beam.

All copy is English. Preserve the proper nouns Sierra Bermeja, 112 Andalucía
and INFOCA. Do not invent statistics, testimonials, customers or partnerships.
Keep simulations labeled and make clear the illustrative approval UI sends
nothing. Mass alerts always require human approval.

## Latest branding and motion decisions

The displayed brand is **Far0**: capital F, lowercase ar, then the digit zero.
The wordmark is vector lettering (`FaroWordmark` in `Logo.tsx`): a squarish
geometric sans with softly rounded corners echoing the symbol, and a slashed
zero. It replaces the earlier monospace text so it renders identically
everywhere and stays sharp at any size.

Preserve the square geometry from the supplied SVG. The inline symbol and
favicon use a dark emerald `#008e65` → green `#07b37c` → mint `#a7f3d0`
gradient. Original SVG exports in `public/brand/` remain unchanged.

The user allowed Quiver. It was not used for the symbol: the gradient was
applied directly to the supplied SVG. It was used (model `arrow-2`) to generate
the wordmark lettering; the raw export is `public/brand/far0-wordmark.svg`.

The hero has a subtle, one-time mint light sweep on entry. A separate subtle
halo follows the mouse across the landing. Both respect reduced motion; the
halo is disabled for mobile widths and touch and never intercepts clicks.

The page opens with an intro screen showing only the lockup (square symbol and
Far0 wordmark). Scrolling zooms into the symbol while the navigation and hero
slide up over it. This uses CSS scroll-driven animations (`view-timeline`) with
no JavaScript; the symbol's size is animated rather than a transform so the
vector stays crisp at full-screen scale; browsers without support, or with
reduced motion, show a static full-height intro followed by the hero.

The hero sits on a full-bleed emerald tone (`#0d2f29` fading into ink, with two
soft green radial glows). The one-time mint light sweep is applied to the
headline text via `background-clip: text` so it works over the tinted surface.

The decorative 3D video scrubs with scroll. It has no audio, controls, crisis
map or wildfire imagery. Its camera and beacon move around a metallic,
graphite lighthouse. A static poster covers unsupported/disabled motion.

## Current structure

1. Intro screen with the Far0 lockup and scroll-driven zoom.
2. Sticky navigation with the Far0 lockup.
3. Hero: “See clearly. Decide before it's certain.”
4. Problem: “A crisis moves faster than certainty.”
5. Lighthouse and the Perceive / Decide / Act loop.
6. Human control: “Autonomy. With authority in your hands.” with an illustrative
   decision review and native disclosure of trade-offs.
7. Demo invitation and a secondary simulated Sierra Bermeja wildfire example.
8. Footer.

The original brief listed eleven sections. The user subsequently requested
this shorter structure; do not restore the earlier version without approval.

## Standalone extraction

- `/` is now the landing; `/landing` is a permanent redirect.
- The operator dashboard remains in the original project.
- `DASHBOARD_URL` configures the external dashboard destination. Without it,
  CTAs are unavailable and say “Demo coming soon”.
- `REPOSITORY_URL` optionally supplies the footer source link.
- Canonical and social metadata use `NEXT_PUBLIC_SITE_URL` or the documented
  Vercel fallback. The existing poster provides a working social image.
- The app needs no credentials, database, AI SDK, Supabase, Workflow or map packages.
- Next.js/React/Tailwind versions were retained from the original lockfile.

## Continuation

Use this repository for subsequent landing work. The original conversation can
be consulted via its session URL if more context is needed.

The owner still needs to provide the real dashboard URL before the CTAs can
open it. An independently designed 1200×630 Open Graph image is optional later
work; the original missing asset is not referenced by this standalone app.

Keep all work local until the user authorizes publication or deployment. The
request to separate the repository does not authorize changes to the original
dashboard, live communications or a public web deployment.

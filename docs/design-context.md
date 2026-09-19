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
demo. The story follows filtering, prioritization, resource coordination and
reassessment. Human approval gates mass alerts. Sierra Bermeja demonstrates
the loop as an explicitly simulated use case, not the overarching product identity.

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

The page opens with a full-screen intro: the lockup (square symbol and Far0
wordmark) floats over the studio lighthouse. Scrolling dollies the camera into
the lantern room — past the gallery rail, between the supports, up to the
emerald optic — so entering the site feels like entering the lighthouse's
control room. The lockup fades out early, the frame tints to the hero tone at
the end, then the navigation and hero slide up over it. The shot is a second
Blender render of the same scene (`scene.py --shot intro`, perspective camera)
scrubbed by `ScrollStage` in `pinned` mode; mobile, reduced motion and no-JS
show the wide poster as a static intro. An earlier iteration zoomed the logo
itself; it was replaced because the user wanted the lighthouse to be the way in.

The hero sits on a full-bleed emerald tone (`#0d2f29` fading into ink, with two
soft green radial glows). The one-time mint light sweep is applied to the
headline text via `background-clip: text` so it works over the tinted surface.

The decorative 3D video scrubs with scroll. It has no audio, controls, crisis
map or wildfire imagery. Its camera and beacon move around a metallic,
graphite lighthouse. A static poster covers unsupported/disabled motion.

## Storytelling and information strip

The user requested integration against the latest `main` (`bcb5455`) after
another session added the intro dolly. Preserve that opening and its media.
The current review branch combines that opening with the human-centered copy
requested by the user. It must not reach `main` without their approval:

- Hero: “When danger shifts, help must follow.” Far0 helps emergency teams
  adapt priorities and coordinate resources with people at risk at the center.
- The hero CTA and closing simulation CTA link directly to `#response`.
  Dashboard links remain separate and unavailable until configured.
- The system introduction starts with “A change in the wind. A community now
  at risk.” Sierra Bermeja is explicitly labeled as a simulated example.
- Far0 means Fully Automated Response. Beside the second lighthouse, F / a / r
  explains each word while the zero cycles through “harm”, “time lost” and
  “victims”. “Our ambition” makes the goal aspirational, not a guarantee.
  The user explicitly requested preserving this visual rotation. “Automated
  coordination. Human-approved alerts.” clarifies the scope next to the name.
  Repeated zero-harm slogans elsewhere are removed.
- The typing animation pauses offscreen, in a hidden tab or using Pause / Resume.
  Reduced motion and no-JS show static alternatives. Screen readers receive a
  stable description. All client animation remains in `ScrollStage.tsx`.
- The user-described flow is Jev (typesafe.ai) filtering → scoring and priority
  ranking → an LLM agent coordinating resources → reassessment.
- Under the lighthouse, Understand / Prioritize / Coordinate icons lead into one
  glass card. A wind shift threatens a new community and Far0 reassigns
  firefighting resources.
- The card starts with a complete summary. Show the response / Next step /
  Back / Replay scenario provide four manual stages, ending at “Alert ready
  for approval”. Future events use pending wording. There is no auto-advance,
  approval button or live messaging integration.
- Step changes are announced politely. At the lower Back bound, focus moves
  to Next step without scrolling. Reduced motion removes transitions and
  no-JS keeps the summary with controls hidden.
- Human control explains why approval matters: “People will act on these
  alerts. People must approve them.” The closing invitation follows the
  simulation through to an alert ready for review, without implying that
  this landing can send alerts or let visitors change the situation.

The user asked for a horizontal strip with logos, including Junta de Andalucía
as a partner, and short slogans. It sits immediately below the hero, using
the existing ink, emerald and mint palette. Content includes HappyRobot,
Junta de Andalucía, Jev / typesafe.ai, HackSpain 2026, “Changing situations.
Shared priorities.” and “Coordinated teams. People first.” Do not add other partnership claims
without user confirmation.

The strip uses a slow CSS loop with a native Pause information strip checkbox.
It also pauses on hover. It needs no JavaScript, library or remote script.
Reduced motion presents all items statically in wrapping rows; the duplicate
track is hidden from assistive technology.

Logo provenance:

- `public/brand/hackspain.svg`: official logo supplied by the user on 2026-09-19.
  The original SVG is stored unchanged and displayed beside the event year,
  preserving its colors and aspect ratio.
- `public/brand/happyrobot.svg`: official header SVG from
  https://www.happyrobot.ai, retrieved on 2026-09-19. Original path geometry
  is preserved; its fill variable resolves to the landing's paper color.
  “Built with” credits the technology, without claiming endorsement.
- `public/brand/junta-de-andalucia.png`: official horizontal monochrome logo,
  downloaded unchanged on 2026-09-19 from
  https://www.juntadeandalucia.es/sites/default/files/2023-02/byn_0.png.
  Listed on the Junta's official 2021–2027 logos page:
  https://www.juntadeandalucia.es/organismos/economiahaciendayfondoseuropeos/areas/fondos-europeos-andalucia/comunicacion/logos-manuales/periodos-2021-27/logos-21-27.html.
  CSS renders it white on the dark strip, retaining its aspect ratio.
  The partner designation was supplied by the user.

Original Far0 SVG exports remain unchanged.

## Current structure

1. Intro dolly into the lighthouse with the Far0 lockup.
2. Sticky navigation with the Far0 lockup.
3. Emerald hero: “When danger shifts, help must follow.”
4. Horizontal partner, technology and mission strip.
5. Simulated example: “A change in the wind. A community now at risk.”
6. Lighthouse beside the Far0 meaning, followed by icons and the manual response card.
7. Human control: “People will act on these alerts. People must approve them.” with a native disclosure.
8. Demo invitation and a secondary simulated Sierra Bermeja wildfire example.
9. Footer.

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

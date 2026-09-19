# Agent instructions

Read `README.md` and `docs/design-context.md` before changing this repository.
They describe the standalone app and the user's confirmed visual direction.

- Keep project code, UI copy, documentation and commits in English.
- Preserve the supplied logo geometry and original exports in `public/brand/`.
- Keep Next.js App Router, TypeScript, Tailwind v4 and npm. Use the lockfile.
- Keep this repository limited to the landing; the operator dashboard is external.
- Configure its link using `DASHBOARD_URL`; never invent a deployment URL.
- Preserve reduced-motion, poster fallback, keyboard navigation, visible focus
  and the readable server-rendered page.
- Do not add animation libraries, third-party scripts, new runtime dependencies
  or a long page structure without an explicit requirement.
- Keep the only animation client component in `ScrollStage.tsx`.
- Never commit secrets or local environment files. Secretlint covers staged files.
- Run `npm run check` before committing or publishing. It includes HTTP smoke
  tests, not browser-driven end-to-end tests.
- Keep validation local. Do not add CI workflows or require remote checks.
- Use feature branches and English commits. Never skip checks or force-push.
- Obtain explicit permission before pushing, opening a PR or deploying.
- An empty repository's first push to `main` requires explicit user approval;
  subsequent changes should use feature branches and PRs.
- Update README and design context whenever configuration or decisions change.
- Production environment settings are consumed at build time; rebuild to test them.

The app has no credentials, database or external messaging integration.
Running it must not trigger HappyRobot calls or SMS.

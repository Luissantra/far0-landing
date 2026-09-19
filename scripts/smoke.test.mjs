import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { after, before, test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";

const require = createRequire(import.meta.url);
let server;
let origin;
let html;
let output = "";

before(
  async () => {
    const probe = createServer();
    probe.listen(0, "127.0.0.1");
    await once(probe, "listening");
    const address = probe.address();
    assert.ok(address && typeof address === "object");
    await new Promise((resolve, reject) =>
      probe.close((error) => (error ? reject(error) : resolve())),
    );
    origin = `http://127.0.0.1:${address.port}`;

    server = spawn(
      process.execPath,
      [
        require.resolve("next/dist/bin/next"),
        "start",
        "--hostname",
        "127.0.0.1",
        "--port",
        String(address.port),
      ],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    server.stdout.on("data", (chunk) => (output += chunk));
    server.stderr.on("data", (chunk) => (output += chunk));

    const deadline = Date.now() + 30_000;
    while (Date.now() < deadline) {
      assert.equal(server.exitCode, null, output);
      try {
        const response = await fetch(origin, { signal: AbortSignal.timeout(2_000) });
        if (response.ok) {
          html = await response.text();
          return;
        }
      } catch {
        // The server may not be listening yet.
      }
      await delay(100);
    }
    assert.fail(`Production server did not become ready.\n${output}`);
  },
  { timeout: 35_000 },
);

after(async () => {
  if (server && server.exitCode === null) {
    const exited = once(server, "exit");
    server.kill();
    await exited;
  }
});

test("the root serves the landing without the operator dashboard", () => {
  assert.equal([...html.matchAll(/<main\b/g)].length, 1);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /When danger shifts/);
  assert.match(html, /Simulated scenario/);
  assert.match(html, /Mass alerts always need human approval/);
  assert.match(html, /<details\b/);
  assert.doesNotMatch(html, /SKETCH — Prototype dashboard/);
});

test("the previous landing route redirects to the root", async () => {
  const response = await fetch(`${origin}/landing?from=previous`, { redirect: "manual" });
  assert.equal(response.status, 308);
  const destination = new URL(response.headers.get("location"), origin);
  assert.equal(destination.pathname, "/");
  assert.equal(destination.searchParams.get("from"), "previous");
});

test("the operator API is absent", async () => {
  const response = await fetch(`${origin}/api/situation`);
  assert.equal(response.status, 404);
});

test("dashboard CTAs use the configured destination or are explicitly unavailable", () => {
  const destination = process.env.DASHBOARD_URL?.trim();
  if (!destination) {
    assert.equal([...html.matchAll(/aria-disabled="true"/g)].length, 3);
    assert.match(html, /Demo coming soon/);
    assert.doesNotMatch(html, /Open dashboard/);
    return;
  }

  const escaped = destination.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  const links = [...html.matchAll(/<a\b[^>]*>/g)]
    .map(([tag]) => tag)
    .filter((tag) => tag.includes(`href="${escaped}"`));
  assert.equal(links.length, 3);
  for (const link of links) {
    assert.match(link, /target="_blank"/);
    assert.match(link, /rel="noopener"/);
  }
  assert.doesNotMatch(html, /aria-disabled="true"/);
});

test("logos, favicon and poster are served by the standalone app", async () => {
  const paths = [
    "/icon.svg",
    "/brand/faro-icon.svg",
    "/brand/faro-icon-dark.svg",
    "/brand/faro-logo-horizontal-on-dark.svg",
    "/brand/faro-logo-horizontal-on-light.svg",
    "/brand/faro-mark.svg",
    "/brand/happyrobot.svg",
    "/brand/junta-de-andalucia.png",
    "/media/faro-poster.jpg",
    "/media/faro-intro-poster.jpg",
  ];
  await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(`${origin}${path}`, { method: "HEAD" });
      assert.equal(response.status, 200, path);
      assert.match(response.headers.get("content-type"), /image\//, path);
    }),
  );
});

test("the scrub video supports byte ranges", async () => {
  const response = await fetch(`${origin}/media/faro-scroll.mp4`, {
    headers: { Range: "bytes=0-1023" },
  });
  assert.equal(response.status, 206);
  assert.match(response.headers.get("content-type"), /video\/mp4/);
  assert.match(response.headers.get("content-range"), /^bytes 0-1023\/\d+$/);
  assert.equal((await response.arrayBuffer()).byteLength, 1024);
});

test("server-rendered markup provides a poster without eagerly loading the video", () => {
  assert.match(html, /<img\b[^>]*src="\/media\/faro-poster\.jpg"/);
  const video = html.match(/<video\b[^>]*>/)?.[0];
  assert.ok(video);
  assert.doesNotMatch(video, /\bsrc="/);
});

test("social metadata references an existing image", () => {
  assert.match(html, /property="og:image" content="[^"]+\/media\/faro-poster\.jpg"/);
  assert.doesNotMatch(html, /\/og\/faro-og\.png/);
});

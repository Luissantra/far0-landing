// Requires Blender 4.5 LTS (or BLENDER=<path>) and ffmpeg.
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../../public/media");
const cache = join(homedir(), ".cache", "faro-render");
mkdirSync(cache, { recursive: true });
mkdirSync(outDir, { recursive: true });
const framesDir = mkdtempSync(join(cache, "frames-"));
const seconds = 6;
const renderFps = 8;
const fps = 24;

function run(bin, args) {
  const result = spawnSync(bin, args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${bin} failed with status ${result.status}`);
}

try {
  run(process.env.BLENDER ?? "blender", [
    "--background",
    "--factory-startup",
    "--python-exit-code",
    "1",
    "--python",
    join(here, "scene.py"),
    "--",
    "--output",
    framesDir,
    "--frames",
    String(seconds * renderFps),
  ]);
  run("ffmpeg", [
    "-y",
    "-framerate",
    String(renderFps),
    "-i",
    join(framesDir, "frame-%04d.png"),
    "-vf",
    `tpad=stop_mode=clone:stop_duration=0.25,minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc`,
    "-t",
    String(seconds),
    "-c:v",
    "libx264",
    "-g",
    "1",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "25",
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    "-an",
    join(outDir, "faro-scroll.mp4"),
  ]);
  run("ffmpeg", [
    "-y",
    "-i",
    join(framesDir, "frame-0001.png"),
    "-frames:v",
    "1",
    "-q:v",
    "3",
    join(outDir, "faro-poster.jpg"),
  ]);
  rmSync(framesDir, { recursive: true });
  console.log("Rendered faro-scroll.mp4 and faro-poster.jpg");
} catch (error) {
  console.error(`Render frames preserved at ${framesDir}`);
  throw error;
}

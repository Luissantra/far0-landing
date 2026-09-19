"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  children: React.ReactNode;
};

// All-intra video (ffmpeg -g 1), ~1080p and under 15 MB keeps seeking responsive.
export default function ScrollStage({ src, poster, children }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const root = stageRef.current?.closest<HTMLElement>(".lp");
    if (!root) return;

    const media = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--lp-cursor-x", `${x}px`);
      root.style.setProperty("--lp-cursor-y", `${y}px`);
      root.style.setProperty("--lp-cursor-visible", "1");
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      root.style.setProperty("--lp-cursor-visible", "0");
    };

    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    media.addEventListener("change", hide);
    return () => {
      hide();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      media.removeEventListener("change", hide);
      for (const property of ["--lp-cursor-x", "--lp-cursor-y", "--lp-cursor-visible"]) {
        root.style.removeProperty(property);
      }
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage || !video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let nearby = false;
    let frame = 0;

    const tick = () => {
      frame = 0;
      if (!nearby || !motion.matches || !desktop.matches || video.readyState < 2) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const rect = stage.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (viewport * 0.85 - rect.top) / (rect.height + viewport * 0.45)),
      );
      const target = progress * Math.max(0, video.duration - 1 / 24);
      const delta = target - video.currentTime;
      if (Math.abs(delta) > 0.02 && !video.seeking) {
        video.currentTime += delta * 0.18;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const update = () => {
      setEnabled(nearby && motion.matches && desktop.matches);
      schedule();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        nearby = entry.isIntersecting;
        update();
      },
      { rootMargin: "300px" },
    );
    observer.observe(stage);
    motion.addEventListener("change", update);
    desktop.addEventListener("change", update);
    video.addEventListener("loadeddata", schedule);
    video.addEventListener("seeked", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
      video.removeEventListener("loadeddata", schedule);
      video.removeEventListener("seeked", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={stageRef} className="lp-stage">
      <div className="lp-stage-media" aria-hidden="true">
        <div className="lp-stage-frame">
          {/* eslint-disable-next-line @next/next/no-img-element -- original poster shared with the video */}
          <img
            className="lp-stage-video"
            src={poster}
            width={1920}
            height={1080}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
          />
          <video
            ref={videoRef}
            className="lp-stage-video"
            src={enabled && !failed ? src : undefined}
            poster={enabled ? poster : undefined}
            width={1920}
            height={1080}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            hidden={!enabled || !ready || failed}
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
          />
          <div className="lp-stage-scrim" />
        </div>
      </div>
      {children}
    </div>
  );
}

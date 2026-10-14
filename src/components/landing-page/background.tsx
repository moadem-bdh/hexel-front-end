"use client";

import { useEffect, useRef } from "react";

function hash2(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}
function vnoise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function noise2(x: number, y: number) {
  return 0.65 * vnoise(x, y) + 0.35 * vnoise(x * 2.1 + 19.7, y * 2.1 + 7.3);
}

export function ErosionTrail({
  gridSize = 96,
  contourStep = 0.08,
  brushSigma = 28,
  carveRate = 0.9,
  healTau = 2.2,
  showReadout = false,
  className = "h-96",
  "aria-label": ariaLabel = "Topographic map",
  minorColor = "rgba(0,0,0,0.10)",
  majorColor = "rgba(0,0,0,0.22)",
  driftSpeed: driftSpeedProp = (Math.PI * 2) / 40,
}: {
  gridSize?: number;
  contourStep?: number;
  brushSigma?: number;
  carveRate?: number;
  healTau?: number;
  showReadout?: boolean;
  className?: string;
  "aria-label"?: string;
  minorColor?: string;
  majorColor?: string;
  driftSpeed?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = Math.max(8, Math.floor(gridSize));
    const NN = N * N;
    const base = new Float32Array(NN);
    const delta = new Float32Array(NN);
    const field = new Float32Array(NN);
    const freq = 3.4 / (N - 1);
    for (let gy = 0; gy < N; gy++)
      for (let gx = 0; gx < N; gx++)
        base[gy * N + gx] = noise2(gx * freq + 11.8, gy * freq + 5.2);

    const driftFreq = 0.9 / (N - 1);
    const driftPhase = new Float32Array(NN);
    for (let gy = 0; gy < N; gy++)
      for (let gx = 0; gx < N; gx++)
        driftPhase[gy * N + gx] = noise2(gx * driftFreq + 41.3, gy * driftFreq + 27.6) * Math.PI * 2;

    const ambientAmp = contourStep * 0.42;

    let w = 0, h = 0, dpr = 1, cellW = 1, cellH = 1;
    const resize = () => {
      const rect = root.getBoundingClientRect();
      w = rect.width; h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      cellW = w / (N - 1); cellH = h / (N - 1);
    };
    resize();

    let raf = 0, last = 0, elapsed = 0, visible = true;
    let down = false, rawX = 0, rawY = 0, sx = 0, sy = 0, lastSx = 0, lastSy = 0;
    const TRAIL_MAX = 10;
    const trailX = new Float32Array(TRAIL_MAX);
    const trailY = new Float32Array(TRAIL_MAX);
    let trailLen = 0;

    const P = reduced ? 0 : 42;
    const partX = new Float32Array(P);
    const partY = new Float32Array(P);
    const partAge = new Float32Array(P);
    const partLife = new Float32Array(P);
    const spawnParticle = (i: number) => {
      partX[i] = Math.random() * w; partY[i] = Math.random() * h;
      partAge[i] = 0; partLife[i] = 3 + Math.random() * 4;
    };
    for (let i = 0; i < P; i++) spawnParticle(i);

    const updateParticles = (dt: number) => {
      for (let i = 0; i < P; i++) {
        const gx = Math.min(N - 2, Math.max(1, Math.round(partX[i]! / cellW)));
        const gy = Math.min(N - 2, Math.max(1, Math.round(partY[i]! / cellH)));
        const row = gy * N;
        const dHdx = (base[row + gx + 1]! - base[row + gx - 1]!) / (2 * cellW);
        const dHdy = (base[row + N + gx]! - base[row - N + gx]!) / (2 * cellH);
        let vx = -dHdx * 2600, vy = -dHdy * 2600;
        const sp = Math.hypot(vx, vy);
        if (sp > 26) { vx = (vx / sp) * 26; vy = (vy / sp) * 26; }
        else if (sp < 4) {
          const a = noise2(partX[i]! * 0.01, partY[i]! * 0.01 + elapsed * 0.15) * Math.PI * 2;
          vx = Math.cos(a) * 6; vy = Math.sin(a) * 6;
        }
        partX[i]! += vx * dt; partY[i]! += vy * dt; partAge[i]! += dt;
        if (partAge[i]! > partLife[i]! || partX[i]! < 0 || partX[i]! > w || partY[i]! < 0 || partY[i]! > h)
          spawnParticle(i);
      }
    };

    const carveSegment = (dt: number) => {
      const segLen = Math.hypot(sx - lastSx, sy - lastSy);
      const speed = segLen / Math.max(dt, 1e-4);
      const speedScale = speed <= 80 ? 1 : speed >= 400 ? 0.25 : 1 - 0.75 * ((speed - 80) / 320);
      const total = carveRate * dt * speedScale;
      const stamps = Math.max(1, Math.ceil(segLen / (brushSigma * 0.5)));
      const dep = total / stamps;
      const reach = brushSigma * 3;
      const inv2s2 = 1 / (2 * brushSigma * brushSigma);
      for (let s = 0; s < stamps; s++) {
        const f = stamps === 1 ? 1 : s / (stamps - 1);
        const px = lastSx + (sx - lastSx) * f;
        const py = lastSy + (sy - lastSy) * f;
        const gx0 = Math.max(0, Math.floor((px - reach) / cellW));
        const gx1 = Math.min(N - 1, Math.ceil((px + reach) / cellW));
        const gy0 = Math.max(0, Math.floor((py - reach) / cellH));
        const gy1 = Math.min(N - 1, Math.ceil((py + reach) / cellH));
        for (let gy = gy0; gy <= gy1; gy++) {
          const dy = gy * cellH - py; const row = gy * N;
          for (let gx = gx0; gx <= gx1; gx++) {
            const dx = gx * cellW - px;
            const wgt = Math.exp(-(dx * dx + dy * dy) * inv2s2);
            if (wgt < 0.01) continue;
            const v = delta[row + gx]! + dep * wgt;
            delta[row + gx] = v > 1 ? 1 : v;
          }
        }
      }
      if (trailLen < TRAIL_MAX) { trailX[trailLen] = sx; trailY[trailLen] = sy; trailLen++; }
      else {
        for (let i = 1; i < TRAIL_MAX; i++) { trailX[i - 1] = trailX[i]!; trailY[i - 1] = trailY[i]!; }
        trailX[TRAIL_MAX - 1] = sx; trailY[TRAIL_MAX - 1] = sy;
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      let minH = Infinity, maxH = -Infinity;
      for (let i = 0; i < NN; i++) {
        const v = base[i]! - delta[i]! + ambientAmp * Math.sin(driftPhase[i]! - elapsed * driftSpeedProp);
        field[i] = v;
        if (v < minH) minH = v;
        if (v > maxH) maxH = v;
      }

      if (down && trailLen > 0) {
        let bx0 = Infinity, bx1 = -Infinity, by0 = Infinity, by1 = -Infinity;
        for (let i = 0; i < trailLen; i++) {
          const tx = trailX[i]!, ty = trailY[i]!;
          if (tx < bx0) bx0 = tx; if (tx > bx1) bx1 = tx;
          if (ty < by0) by0 = ty; if (ty > by1) by1 = ty;
        }
        const R = 40, R2 = R * R;
        const gx0 = Math.max(0, Math.floor((bx0 - R) / cellW));
        const gx1 = Math.min(N - 1, Math.ceil((bx1 + R) / cellW));
        const gy0 = Math.max(0, Math.floor((by0 - R) / cellH));
        const gy1 = Math.min(N - 1, Math.ceil((by1 + R) / cellH));
        ctx.fillStyle = "rgba(0,107,255,0.18)";
        for (let gy = gy0; gy <= gy1; gy++) {
          const ny = gy * cellH; const row = gy * N;
          for (let gx = gx0; gx <= gx1; gx++) {
            if (delta[row + gx]! <= 0.12) continue;
            const nx = gx * cellW;
            let near = false;
            for (let i = 0; i < trailLen; i++) {
              const dx = nx - trailX[i]!, dy = ny - trailY[i]!;
              if (dx * dx + dy * dy < R2) { near = true; break; }
            }
            if (near) ctx.fillRect(nx - cellW / 2, ny - cellH / 2, cellW + 1, cellH + 1);
          }
        }
      }

      const minor = new Path2D();
      const major = new Path2D();
      const kMin = Math.ceil(minH / contourStep);
      const kMax = Math.floor(maxH / contourStep);
      for (let k = kMin; k <= kMax; k++) {
        const t = k * contourStep;
        const path = k % 5 === 0 ? major : minor;
        for (let gy = 0; gy < N - 1; gy++) {
          const rowA = gy * N, rowB = rowA + N;
          const y0 = gy * cellH, y1 = y0 + cellH;
          for (let gx = 0; gx < N - 1; gx++) {
            const a = field[rowA + gx]!, b = field[rowA + gx + 1]!;
            const c = field[rowB + gx + 1]!, d = field[rowB + gx]!;
            const code = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (d > t ? 1 : 0);
            if (code === 0 || code === 15) continue;
            const x0 = gx * cellW, x1 = x0 + cellW;
            const topX = () => x0 + (cellW * (t - a)) / (b - a);
            const rightY = () => y0 + (cellH * (t - b)) / (c - b);
            const botX = () => x0 + (cellW * (t - d)) / (c - d);
            const leftY = () => y0 + (cellH * (t - a)) / (d - a);
            switch (code) {
              case 1: case 14: path.moveTo(x0, leftY()); path.lineTo(botX(), y1); break;
              case 2: case 13: path.moveTo(botX(), y1); path.lineTo(x1, rightY()); break;
              case 3: case 12: path.moveTo(x0, leftY()); path.lineTo(x1, rightY()); break;
              case 4: case 11: path.moveTo(topX(), y0); path.lineTo(x1, rightY()); break;
              case 5: path.moveTo(topX(), y0); path.lineTo(x1, rightY()); path.moveTo(x0, leftY()); path.lineTo(botX(), y1); break;
              case 6: case 9: path.moveTo(topX(), y0); path.lineTo(botX(), y1); break;
              case 7: case 8: path.moveTo(topX(), y0); path.lineTo(x0, leftY()); break;
              case 10: path.moveTo(topX(), y0); path.lineTo(x0, leftY()); path.moveTo(botX(), y1); path.lineTo(x1, rightY()); break;
            }
          }
        }
      }
      ctx.lineJoin = "round";
      ctx.strokeStyle = minorColor;
      ctx.lineWidth = 0.75;
      ctx.stroke(minor);
      ctx.strokeStyle = majorColor;
      ctx.lineWidth = 1;
      ctx.stroke(major);

      if (P > 0) {
        ctx.fillStyle = majorColor;
        for (let i = 0; i < P; i++) {
          const life = partLife[i]!, age = partAge[i]!;
          const fadeIn = Math.min(1, age / 0.6);
          const fadeOut = Math.min(1, (life - age) / 0.6);
          const alpha = Math.max(0, Math.min(fadeIn, fadeOut)) * 0.4;
          if (alpha <= 0.01) continue;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(partX[i]!, partY[i]!, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    };

    const loop = (now: number) => {
      const dt = last === 0 ? 1 / 60 : Math.min(0.05, (now - last) / 1000);
      last = now; elapsed += dt;
      if (down) { sx += (rawX - sx) * 0.25; sy += (rawY - sy) * 0.25; carveSegment(dt); lastSx = sx; lastSy = sy; }
      let maxDelta = 0;
      const decay = Math.exp(-dt / healTau);
      for (let i = 0; i < NN; i++) { const v = delta[i]! * decay; delta[i] = v; if (v > maxDelta) maxDelta = v; }
      if (!down && maxDelta <= 0.002) delta.fill(0);
      updateParticles(dt);
      draw();
      if (visible) { raf = requestAnimationFrame(loop); } else { raf = 0; last = 0; }
    };

    const wake = () => {
      if (reduced) return;
      if (!raf) { last = 0; raf = requestAnimationFrame(loop); }
    };

    const updateReadout = (x: number, y: number) => {
      const el = readoutRef.current;
      if (!el) return;
      const gx = Math.min(N - 1, Math.max(0, Math.round(x / cellW)));
      const gy = Math.min(N - 1, Math.max(0, Math.round(y / cellH)));
      el.textContent = `GRID ${String(gx).padStart(2, "0")}·${String(gy).padStart(2, "0")}`;
    };
    const clearReadout = () => { const el = readoutRef.current; if (el) el.textContent = "GRID --·--"; };

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      rawX = e.clientX - rect.left; rawY = e.clientY - rect.top;
    };
    const onDown = (e: PointerEvent) => {
      if (reduced) return;
      toLocal(e); root.setPointerCapture(e.pointerId);
      down = true; sx = rawX; sy = rawY; lastSx = rawX; lastSy = rawY; trailLen = 0;
      updateReadout(rawX, rawY); wake();
    };
    const onMove = (e: PointerEvent) => { toLocal(e); updateReadout(rawX, rawY); };
    const endDrag = () => { down = false; trailLen = 0; };
    const onUp = () => endDrag();
    const onLeave = () => { clearReadout(); };

    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(root);

    const io = reduced ? null : new IntersectionObserver((entries) => {
      const entry = entries[0]; if (!entry) return;
      visible = entry.isIntersecting;
      if (visible) { wake(); } else if (raf) { cancelAnimationFrame(raf); raf = 0; last = 0; }
    }, { threshold: 0 });
    if (io) io.observe(root);

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    if (!reduced) {
      root.addEventListener("pointerdown", onDown);
      root.addEventListener("pointerup", onUp);
      root.addEventListener("pointercancel", onUp);
      root.addEventListener("lostpointercapture", onUp);
    }

    if (reduced) { draw(); } else { wake(); }

    return () => {
      cancelAnimationFrame(raf); raf = 0;
      ro.disconnect(); if (io) io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      if (!reduced) {
        root.removeEventListener("pointerdown", onDown);
        root.removeEventListener("pointerup", onUp);
        root.removeEventListener("pointercancel", onUp);
        root.removeEventListener("lostpointercapture", onUp);
      }
    };
  }, [gridSize, contourStep, brushSigma, carveRate, healTau, minorColor, majorColor, driftSpeedProp]);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={ariaLabel}
      className={`relative w-full cursor-crosshair touch-none select-none overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      {showReadout && (
        <div ref={readoutRef} aria-hidden className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] tracking-widest opacity-40">
          GRID --·--
        </div>
      )}
    </div>
  );
}

export default ErosionTrail;

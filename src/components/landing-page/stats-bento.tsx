"use client";
import React from "react";

export const StatsBento = () => {
  return (
    <div className="flex flex-col gap-4 w-full mx-auto">
      {/* Primary Stat */}
      <div className="bg-greenx rounded-2xl p-6 flex flex-row items-center justify-between overflow-hidden relative min-h-30 gap-4">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[repeating-linear-gradient(45deg,#ffffff_0px_1px,transparent_1px_10px)] opacity-10 mask-[radial-gradient(ellipse_80%_50%_at_100%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>
        <div className="z-10 shrink-0">
          <h3 className="text-5xl md:text-6xl tracking-tighter text-white font-gilroy font-extrabold">
            94%
          </h3>
        </div>
        <p className="text-white/70 text-sm max-w-48 font-rubik text-right z-10 leading-relaxed">
          Of our students land their dream job within 6 months of graduation.
        </p>
      </div>

      {/* Secondary Stat */}
      <div className="bg-zinc-100 rounded-2xl p-5 border border-zinc-200 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-1 font-rubik">
            Growth
          </p>
          <p className="text-2xl md:text-3xl text-black font-gilroy font-extrabold">+240%</p>
        </div>
        <div className="flex gap-1 items-end h-6">
          {[10, 20, 40, 30, 60, 50, 80, 70, 90, 100, 110].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-black rounded-full"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBento;

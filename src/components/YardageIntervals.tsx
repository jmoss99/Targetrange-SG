import { useState } from "react";

interface YardageIntervalsProps {
  session: {
    date: string;
    shots: number;
    targets: number;
    strokesGained: number;
  };
  onBack: () => void;
}

type ViewTab = "strokes-gained" | "dispersion";

interface IntervalData {
  label: string;
  shotCount: number;
  strokesGained: number;
  avgProximity: number;
  bestShot: number;
}

const intervals: IntervalData[] = [
  { label: "0 - 25", shotCount: 0, strokesGained: 0, avgProximity: 0, bestShot: 0 },
  { label: "25 - 50", shotCount: 3, strokesGained: -1.3, avgProximity: 12.4, bestShot: 6.2 },
  { label: "50 - 75", shotCount: 8, strokesGained: -0.45, avgProximity: 9.8, bestShot: 3.1 },
  { label: "75 - 100", shotCount: 13, strokesGained: -0.83, avgProximity: 14.2, bestShot: 4.5 },
  { label: "100 - 125", shotCount: 5, strokesGained: 0.78, avgProximity: 8.6, bestShot: 3.5 },
  { label: "125 - 150", shotCount: 0, strokesGained: 0, avgProximity: 0, bestShot: 0 },
  { label: "150 - 175", shotCount: 7, strokesGained: 1.02, avgProximity: 16.3, bestShot: 7.8 },
  { label: "175 - 200", shotCount: 6, strokesGained: 0.47, avgProximity: 18.9, bestShot: 9.2 },
  { label: "200 - 225", shotCount: 9, strokesGained: 1.3, avgProximity: 22.1, bestShot: 11.4 },
  { label: "225 - 250", shotCount: 5, strokesGained: 0.62, avgProximity: 25.7, bestShot: 14.6 },
  { label: "250 - 275", shotCount: 0, strokesGained: 0, avgProximity: 0, bestShot: 0 },
  { label: "275 - 300", shotCount: 10, strokesGained: -0.14, avgProximity: 21.4, bestShot: 15.7 },
  { label: "300 - 325", shotCount: 3, strokesGained: 0.91, avgProximity: 19.6, bestShot: 17.9 },
];

function getTotal(data: IntervalData[]): { shotCount: number; strokesGained: number; avgProximity: number; bestShot: number } {
  const withShots = data.filter((d) => d.shotCount > 0);
  const totalShots = data.reduce((sum, d) => sum + d.shotCount, 0);
  const avgSG =
    withShots.length > 0
      ? withShots.reduce((sum, d) => sum + d.strokesGained * d.shotCount, 0) /
        totalShots
      : 0;
  const avgProximity =
    withShots.length > 0
      ? withShots.reduce((sum, d) => sum + d.avgProximity * d.shotCount, 0) /
        totalShots
      : 0;
  const bestShot =
    withShots.length > 0
      ? Math.min(...withShots.map((d) => d.bestShot))
      : 0;
  return { shotCount: totalShots, strokesGained: avgSG, avgProximity, bestShot };
}

function formatSG(value: number): string {
  if (value === 0) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}`;
}

function sgTextColor(value: number): string {
  if (value > 0) return "text-green-500";
  if (value < 0) return "text-primary";
  return "text-neutral-800";
}

const maxAbsSG = Math.max(
  ...intervals.filter((d) => d.shotCount > 0).map((d) => Math.abs(d.strokesGained)),
  0.01
);

export default function YardageIntervals({ session, onBack }: YardageIntervalsProps) {
  const [activeTab, setActiveTab] = useState<ViewTab>("strokes-gained");

  const total = getTotal(intervals);

  const tabs: { id: ViewTab; label: string }[] = [
    { id: "strokes-gained", label: "Strokes Gained" },
    { id: "dispersion", label: "Dispersion" },
  ];

  return (
    <div className="flex flex-col gap-8 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex h-6 w-6 items-center justify-center rounded-lg"
          >
            <ChevronLeftIcon className="h-4 w-4 text-black" />
          </button>
          <h1 className="font-acumin text-[40px] font-bold italic uppercase leading-none text-black">
            Session Overview - {session.date}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-5 py-2.5 font-barlow text-sm font-semibold uppercase tracking-wider transition-colors ${
              activeTab === tab.id
                ? "bg-neutral-900 text-white"
                : "bg-neutral-200/60 text-neutral-800 hover:bg-neutral-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "strokes-gained" && (
        <div className="flex flex-col gap-6">
          {/* Table Header */}
          <div className="flex items-center rounded-t-lg bg-black px-6 py-4">
            <div className="w-[140px] shrink-0 font-barlow text-sm font-semibold uppercase tracking-wider text-white">
              Target Interval
            </div>
            <div className="w-[70px] shrink-0 text-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
              # Shots
            </div>
            <div className="flex flex-1 items-center justify-center gap-1 font-barlow text-sm font-semibold uppercase tracking-wider text-white">
              <span>Strokes Gained</span>
              <InfoIcon className="h-4 w-4 text-neutral-400" />
            </div>
            <div className="w-[100px] shrink-0 text-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
              Avg Prox.
              <div className="text-[10px] font-medium normal-case tracking-tight text-neutral-400">(ft)</div>
            </div>
            <div className="w-[100px] shrink-0 text-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
              Best Shot
              <div className="text-[10px] font-medium normal-case tracking-tight text-neutral-400">(ft)</div>
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {intervals.map((interval, idx) => {
              const hasData = interval.shotCount > 0;
              const barWidthPct = hasData
                ? (Math.abs(interval.strokesGained) / maxAbsSG) * 40
                : 0;
              const isPositive = interval.strokesGained > 0;

              return (
                <div
                  key={idx}
                  className={`flex items-center border-b border-neutral-200/60 px-6 py-4 ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
                  }`}
                >
                  <div className="w-[140px] shrink-0 font-barlow text-sm font-semibold tracking-tight text-black">
                    {interval.label}
                    <span className="ml-1 text-neutral-800">yards</span>
                  </div>
                  <div className="w-[70px] shrink-0 text-center font-acumin text-xl font-bold italic text-black">
                    {hasData ? interval.shotCount : ""}
                  </div>
                  <div className="flex flex-1 items-center gap-4">
                    <div className="flex flex-1 items-center">
                      <div className="relative h-5 w-full">
                        {hasData && (
                          <div
                            className={`absolute top-0 h-full rounded-sm ${
                              isPositive ? "bg-green-500" : "bg-primary"
                            }`}
                            style={{
                              width: `${barWidthPct}%`,
                              left: isPositive ? "50%" : undefined,
                              right: !isPositive ? "50%" : undefined,
                            }}
                          />
                        )}
                        <div className="absolute left-1/2 top-0 h-full w-px bg-neutral-200" />
                      </div>
                    </div>
                    <div
                      className={`w-[80px] shrink-0 text-right font-acumin text-xl font-bold italic ${
                        hasData ? sgTextColor(interval.strokesGained) : "text-neutral-300"
                      }`}
                    >
                      {hasData ? formatSG(interval.strokesGained) : "-"}
                    </div>
                  </div>
                  <div className="w-[100px] shrink-0 text-center font-acumin text-xl font-bold italic text-black">
                    {hasData ? interval.avgProximity.toFixed(1) : "-"}
                  </div>
                  <div className="w-[100px] shrink-0 text-center font-acumin text-xl font-bold italic text-black">
                    {hasData ? interval.bestShot.toFixed(1) : "-"}
                  </div>
                </div>
              );
            })}

            {/* Total Row */}
            <div className="flex items-center border-t-2 border-black px-6 py-4 bg-neutral-100">
              <div className="w-[140px] shrink-0 font-barlow text-sm font-bold uppercase tracking-wider text-black">
                Total
              </div>
              <div className="w-[70px] shrink-0 text-center font-acumin text-xl font-bold italic text-black">
                {total.shotCount}
              </div>
              <div className="flex flex-1 items-center gap-4">
                <div className="flex-1" />
                <div
                  className={`w-[80px] shrink-0 text-right font-acumin text-xl font-bold italic ${sgTextColor(
                    total.strokesGained
                  )}`}
                >
                  {formatSG(total.strokesGained)}
                </div>
              </div>
              <div className="w-[100px] shrink-0 text-center font-acumin text-xl font-bold italic text-black">
                {total.avgProximity.toFixed(1)}
              </div>
              <div className="w-[100px] shrink-0 text-center font-acumin text-xl font-bold italic text-black">
                {total.bestShot.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 pt-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-6 rounded-sm bg-green-500" />
              <span className="font-barlow text-sm font-medium text-neutral-800">
                Strokes Gained
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-6 rounded-sm bg-primary" />
              <span className="font-barlow text-sm font-medium text-neutral-800">
                Strokes Lost
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "dispersion" && (
        <DispersionView />
      )}
    </div>
  );
}

interface DispersionShot {
  id: number;
  club: string;
  carry: number;
  proximity: number;
  sideCarry: number;
  sg: number;
  x: number;
  y: number;
  targetYards: number;
}

const dispersionTargets = [
  { label: "300", yards: 300, x: 56, y: 22 },
  { label: "200", yards: 200, x: 32, y: 52 },
  { label: "100", yards: 100, x: 22, y: 26 },
];

const dispersionShots: DispersionShot[] = [
  { id: 1,  club: "D",  carry: 280.4, proximity: 19.6, sideCarry: 8.2,  sg: 0.45,  x: 60, y: 24, targetYards: 300 },
  { id: 2,  club: "D",  carry: 275.9, proximity: 24.1, sideCarry: -12.3, sg: -0.32, x: 52, y: 28, targetYards: 300 },
  { id: 3,  club: "D",  carry: 282.1, proximity: 17.9, sideCarry: 5.1,  sg: 0.91,  x: 64, y: 20, targetYards: 300 },
  { id: 9,  club: "D",  carry: 278.6, proximity: 21.4, sideCarry: -6.7, sg: -0.14, x: 50, y: 32, targetYards: 300 },
  { id: 10, club: "D",  carry: 284.3, proximity: 15.7, sideCarry: 3.8,  sg: 1.52,  x: 68, y: 18, targetYards: 300 },
  { id: 4,  club: "D",  carry: 185.3, proximity: 14.7, sideCarry: 9.4,  sg: 1.12,  x: 36, y: 48, targetYards: 200 },
  { id: 5,  club: "D",  carry: 180.8, proximity: 19.2, sideCarry: -11.8, sg: -0.18, x: 27, y: 56, targetYards: 200 },
  { id: 6,  club: "Aw", carry: 98.2,  proximity: 6.8,  sideCarry: 4.2,  sg: 0.78,  x: 26, y: 23, targetYards: 100 },
  { id: 7,  club: "Aw", carry: 101.5, proximity: 3.5,  sideCarry: -7.6, sg: -0.56, x: 18, y: 30, targetYards: 100 },
  { id: 8,  club: "4w", carry: 95.7,  proximity: 9.3,  sideCarry: 2.1,  sg: 0.33,  x: 24, y: 34, targetYards: 100 },
];

function DispersionView() {
  const [selectedShot, setSelectedShot] = useState<number | null>(null);
  const [activeTarget, setActiveTarget] = useState<number | null>(null);

  const filteredShots = activeTarget
    ? dispersionShots.filter((s) => s.targetYards === activeTarget)
    : dispersionShots;

  const activeTargetData = activeTarget
    ? dispersionTargets.find((t) => t.yards === activeTarget)
    : null;

  const zoomScale = activeTarget ? 2.5 : 1;
  const zoomOrigin = activeTargetData
    ? `${activeTargetData.x}% ${activeTargetData.y}%`
    : "50% 50%";

  const avgSG = filteredShots.length > 0
    ? filteredShots.reduce((sum, s) => sum + s.sg, 0) / filteredShots.length
    : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Target selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setActiveTarget(null); setSelectedShot(null); }}
          className={`rounded-lg px-5 py-2.5 font-barlow text-sm font-semibold uppercase tracking-wider transition-colors ${
            activeTarget === null
              ? "bg-neutral-900 text-white"
              : "bg-neutral-200/60 text-neutral-800 hover:bg-neutral-200"
          }`}
        >
          All Targets
        </button>
        {dispersionTargets.map((target) => {
          const count = dispersionShots.filter((s) => s.targetYards === target.yards).length;
          const isActive = activeTarget === target.yards;
          return (
            <button
              key={target.yards}
              onClick={() => { setActiveTarget(isActive ? null : target.yards); setSelectedShot(null); }}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 font-barlow text-sm font-semibold uppercase tracking-wider transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-neutral-200/60 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              <FlagIcon className="h-3.5 w-3.5" />
              <span>{target.label} yds</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${
                isActive ? "bg-white/20 text-white" : "bg-neutral-300/60 text-neutral-800"
              }`}>
                {count}
              </span>
            </button>
          );
        })}

        {activeTarget && (
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2">
              <span className="font-barlow text-sm font-medium text-neutral-800">
                {filteredShots.length} {filteredShots.length === 1 ? "shot" : "shots"}
              </span>
              <div className="h-4 w-px bg-neutral-300" />
              <span className="font-barlow text-sm font-medium text-neutral-800">Avg SG:</span>
              <span className={`font-acumin text-lg font-bold italic ${avgSG > 0 ? "text-green-500" : avgSG < 0 ? "text-primary" : "text-black"}`}>
                {avgSG > 0 ? "+" : ""}{avgSG.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Map */}
        <div className="relative flex-1 overflow-hidden rounded-xl" style={{ minHeight: 600 }}>
          {/* Zoomable layer */}
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: zoomOrigin,
            }}
          >
            {/* Golf course background */}
            <img
              src={`${import.meta.env.BASE_URL}golf-course-map.jpg`}
              alt="Golf course aerial view"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Target flags */}
            {dispersionTargets.map((target) => {
              const isHidden = activeTarget !== null && activeTarget !== target.yards;
              return (
                <div
                  key={target.label}
                  className={`absolute flex flex-col items-center transition-opacity duration-300 ${isHidden ? "opacity-20" : "opacity-100"}`}
                  style={{ left: `${target.x}%`, top: `${target.y}%`, transform: "translate(-50%, -100%)" }}
                >
                  <div className={`flex items-center gap-1 rounded px-2 py-0.5 ${
                    activeTarget === target.yards ? "bg-primary" : "bg-black/70"
                  }`}>
                    <FlagIcon className="h-3 w-3 text-white" />
                    <span className="font-barlow text-xs font-semibold text-white">
                      {target.label} yds
                    </span>
                  </div>
                  <div className="h-4 w-px bg-white/60" />
                  <div className={`h-2 w-2 rounded-full border ${
                    activeTarget === target.yards ? "border-primary bg-primary/50" : "border-white/60 bg-white/30"
                  }`} />
                </div>
              );
            })}

            {/* Shot dots */}
            {dispersionShots.map((shot) => {
              const isFiltered = activeTarget !== null && shot.targetYards !== activeTarget;
              const isSelected = selectedShot === shot.id;
              const dotColor = shot.sg > 0 ? "bg-green-500" : shot.sg < 0 ? "bg-red-500" : "bg-orange-400";
              return (
                <button
                  key={shot.id}
                  onClick={() => !isFiltered && setSelectedShot(isSelected ? null : shot.id)}
                  className={`absolute rounded-full transition-all ${dotColor} ${
                    isFiltered
                      ? "z-0 h-2 w-2 opacity-10 cursor-default"
                      : isSelected
                        ? "z-20 h-5 w-5 ring-2 ring-white shadow-lg"
                        : "z-10 h-3 w-3 opacity-90 hover:h-4 hover:w-4 hover:opacity-100"
                  }`}
                  style={{ left: `${shot.x}%`, top: `${shot.y}%`, transform: "translate(-50%, -50%)" }}
                />
              );
            })}

            {/* Player marker at tee */}
            <div
              className={`absolute z-10 flex items-center justify-center transition-opacity duration-300 ${activeTarget ? "opacity-30" : "opacity-100"}`}
              style={{ left: "72%", top: "88%", transform: "translate(-50%, -50%)" }}
            >
              <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-md" />
            </div>
          </div>

          {/* Selected shot tooltip (outside zoom layer so text stays readable) */}
          {selectedShot && (() => {
            const shot = filteredShots.find((s) => s.id === selectedShot);
            if (!shot) return null;
            const displayX = activeTargetData
              ? 50 + (shot.x - activeTargetData.x) * zoomScale
              : shot.x;
            const displayY = activeTargetData
              ? 50 + (shot.y - activeTargetData.y) * zoomScale
              : shot.y;
            const tooltipLeft = displayX > 70 ? displayX - 25 : displayX + 3;
            return (
              <div
                className="absolute z-30 rounded-lg bg-black/90 px-4 py-3 shadow-xl"
                style={{ left: `${tooltipLeft}%`, top: `${displayY + 5}%` }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-acumin text-lg font-bold italic text-white">#{shot.id}</span>
                  <div className="flex flex-col">
                    <span className="font-barlow text-xs font-medium text-neutral-400">Carry</span>
                    <span className="font-acumin text-base font-bold italic text-white">{shot.carry.toFixed(1)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-barlow text-xs font-medium text-neutral-400">Prox.</span>
                    <span className="font-acumin text-base font-bold italic text-white">{shot.proximity.toFixed(1)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-barlow text-xs font-medium text-neutral-400">Side Carry</span>
                    <span className="font-acumin text-base font-bold italic text-white">{shot.sideCarry.toFixed(1)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-barlow text-xs font-medium text-neutral-400">SG</span>
                    <span className={`font-acumin text-base font-bold italic ${shot.sg > 0 ? "text-green-400" : "text-red-400"}`}>
                      {shot.sg > 0 ? "+" : ""}{shot.sg.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Shot List Sidebar */}
        <div className="flex w-[320px] shrink-0 flex-col rounded-xl bg-neutral-900 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-neutral-800 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="font-barlow text-xs font-semibold uppercase tracking-wider text-neutral-400">
              #
            </span>
            <span className="flex-1 font-barlow text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Carry
            </span>
            <span className="w-14 text-center font-barlow text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Prox.
            </span>
            <span className="w-14 text-center font-barlow text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Side Carry
            </span>
            <span className="w-12 text-center font-barlow text-xs font-semibold uppercase tracking-wider text-neutral-400">
              SG
            </span>
          </div>
          {/* Rows */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            {filteredShots.map((shot) => {
              const isSelected = selectedShot === shot.id;
              return (
                <button
                  key={shot.id}
                  onClick={() => setSelectedShot(isSelected ? null : shot.id)}
                  className={`flex items-center gap-3 border-b border-neutral-800 px-4 py-2.5 text-left transition-colors ${
                    isSelected ? "bg-neutral-800" : "hover:bg-neutral-800/50"
                  }`}
                >
                  <div className={`h-3 w-3 shrink-0 rounded-full ${shot.sg > 0 ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="font-acumin text-sm font-bold italic text-white">
                    #{shot.id}
                  </span>
                  <span className="flex-1 font-acumin text-sm font-bold italic text-white">
                    {shot.carry.toFixed(1)}
                  </span>
                  <span className="w-14 text-center font-acumin text-sm font-bold italic text-white">
                    {shot.proximity.toFixed(1)}
                  </span>
                  <span className="w-14 text-center font-acumin text-sm font-bold italic text-white">
                    {shot.sideCarry > 0 ? "+" : ""}{shot.sideCarry.toFixed(1)}
                  </span>
                  <span className={`w-12 text-center font-acumin text-sm font-bold italic ${shot.sg > 0 ? "text-green-400" : "text-red-400"}`}>
                    {shot.sg > 0 ? "+" : ""}{shot.sg.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="font-barlow text-sm font-medium text-neutral-800">Strokes Gained</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="font-barlow text-sm font-medium text-neutral-800">Strokes Lost</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full border-2 border-white bg-blue-500" />
          <span className="font-barlow text-sm font-medium text-neutral-800">Tee Position</span>
        </div>
      </div>
    </div>
  );
}

function FlagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none">
      <path d="M3 1v10M3 1l6 2.5L3 6" fill="currentColor" />
      <line x1="3" y1="1" x2="3" y2="11" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

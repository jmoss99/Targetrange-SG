import { useState } from "react";

interface SessionDetailProps {
  session: {
    date: string;
    shots: number;
    targets: number;
    strokesGained: number;
  };
  onBack: () => void;
  onYardageIntervals?: () => void;
}

const clubs = [
  { abbr: "D", brand: "TAYLORMADE", model: "Sim 2", color: "#4DC693" },
  { abbr: "D", brand: "TITLEIST", model: "Lorem Ipsum", color: "#D54100" },
  { abbr: "4w", brand: "TITLEIST", model: "VOKEY TVD-M Ca...", color: "#FF06DB" },
  { abbr: "Aw", brand: "MIZUNO", model: "JPX 921 Forged", color: "#FFAD2A" },
];

const yardageFilters = [
  { label: "ALL SHOTS", yards: null },
  { label: "100", yards: 100 },
  { label: "200", yards: 200 },
  { label: "300", yards: 300 },
];

interface Shot {
  id: number;
  clubIndex: number;
  targetYards: number;
  carry: string;
  total: string;
  clubSpeed: string;
  ballSpeed: string;
  launchAngle: string;
  strokesGained: number;
}

const shots: Shot[] = [
  // Target 1: 300 yards
  { id: 1,  clubIndex: 0, targetYards: 300, carry: "280.4", total: "301.2", clubSpeed: "112.3", ballSpeed: "167.1", launchAngle: "10.8°", strokesGained: 0.45 },
  { id: 2,  clubIndex: 0, targetYards: 300, carry: "275.9", total: "295.7", clubSpeed: "111.8", ballSpeed: "165.4", launchAngle: "11.2°", strokesGained: -0.32 },
  { id: 3,  clubIndex: 0, targetYards: 300, carry: "282.1", total: "303.8", clubSpeed: "113.1", ballSpeed: "168.2", launchAngle: "10.5°", strokesGained: 0.91 },
  // Target 2: 200 yards
  { id: 4,  clubIndex: 1, targetYards: 200, carry: "185.3", total: "202.1", clubSpeed: "94.6",  ballSpeed: "132.8", launchAngle: "16.4°", strokesGained: 1.12 },
  { id: 5,  clubIndex: 1, targetYards: 200, carry: "180.8", total: "198.5", clubSpeed: "93.2",  ballSpeed: "130.1", launchAngle: "17.1°", strokesGained: -0.18 },
  // Target 3: 100 yards
  { id: 6,  clubIndex: 3, targetYards: 100, carry: "98.2",  total: "105.4", clubSpeed: "72.1",  ballSpeed: "95.3",  launchAngle: "28.6°", strokesGained: 0.78 },
  { id: 7,  clubIndex: 3, targetYards: 100, carry: "101.5", total: "108.9", clubSpeed: "73.8",  ballSpeed: "97.1",  launchAngle: "27.2°", strokesGained: -0.56 },
  { id: 8,  clubIndex: 2, targetYards: 100, carry: "95.7",  total: "102.3", clubSpeed: "70.5",  ballSpeed: "92.8",  launchAngle: "30.1°", strokesGained: 0.33 },
  // Target 4: 300 yards (second set)
  { id: 9,  clubIndex: 0, targetYards: 300, carry: "278.6", total: "298.4", clubSpeed: "112.0", ballSpeed: "166.3", launchAngle: "11.0°", strokesGained: -0.14 },
  { id: 10, clubIndex: 0, targetYards: 300, carry: "284.3", total: "306.1", clubSpeed: "113.7", ballSpeed: "169.5", launchAngle: "10.3°", strokesGained: 1.52 },
];

function formatSG(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}`;
}

function sgColor(value: number): string {
  if (value > 0) return "text-green-500";
  if (value < 0) return "text-primary";
  return "text-black";
}

export default function SessionDetail({ session, onBack, onYardageIntervals }: SessionDetailProps) {
  const [activeYardage, setActiveYardage] = useState<number | null>(null);
  const [selectedClub, setSelectedClub] = useState<number | null>(null);

  const filteredShots = shots.filter((shot) => {
    if (selectedClub !== null && shot.clubIndex !== selectedClub) return false;
    if (activeYardage !== null && shot.targetYards !== activeYardage) return false;
    return true;
  });

  const groupedByTarget = filteredShots.reduce<
    { targetYards: number; shots: Shot[] }[]
  >((groups, shot) => {
    const existing = groups.find((g) => g.targetYards === shot.targetYards);
    if (existing) {
      existing.shots.push(shot);
    } else {
      groups.push({ targetYards: shot.targetYards, shots: [shot] });
    }
    return groups;
  }, []);

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
            Practice - {session.date}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-[#EEEDE9] bg-white px-5 py-3 shadow-sm">
            <span className="font-barlow text-sm font-semibold uppercase tracking-wider text-neutral-800">
              Total Strokes Gained
            </span>
            <span className={`font-acumin text-3xl font-bold italic leading-none ${sgColor(session.strokesGained)}`}>
              {formatSG(session.strokesGained)}
            </span>
          </div>
          <button
            onClick={onYardageIntervals}
            className="flex items-center gap-2 rounded-lg border-2 border-neutral-900 px-5 py-3 text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            <BarChartIcon className="h-5 w-5" />
            <span className="font-barlow text-sm font-semibold uppercase tracking-wider">
              Yardage Intervals
            </span>
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-white">
            <ExportIcon className="h-5 w-5" />
            <span className="font-barlow text-sm font-semibold uppercase tracking-wider">
              Export Session
            </span>
          </button>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="grid grid-cols-4 gap-4">
        <HighlightCard value={String(shots.length)} label="Shots" />
        <HighlightCard value="4" label="Clubs" />
        <HighlightCard value="306" label="Longest Shot" unit="YARDS" />
        <HighlightCard value="170" label="Fastest Ball Speed" unit="MPH" />
      </div>

      {/* Filter + Tabs */}
      <div className="flex flex-col gap-4 rounded-xl bg-[#F7F7F7] px-3 py-3">
        {/* Yardage Filters */}
        <div className="flex gap-2">
          {yardageFilters.map((filter, idx) => {
            const isActive = activeYardage === filter.yards;
            return (
              <button
                key={idx}
                onClick={() => setActiveYardage(filter.yards)}
                className={`flex h-[45px] w-20 flex-col items-center justify-center rounded-[10px] border ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-neutral-800 text-neutral-800"
                }`}
              >
                {filter.yards ? (
                  <>
                    <div className="flex items-center gap-1">
                      <span className="font-acumin text-lg font-bold italic uppercase leading-none">
                        {filter.label}
                      </span>
                      <span className="font-barlow text-[10px] font-medium">
                        yards
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 text-[10px]">
                      <span className="font-acumin text-base font-bold italic uppercase leading-none">
                        5/10
                      </span>
                      <span className="font-barlow font-medium">-</span>
                      <span className="font-barlow font-medium">50%</span>
                    </div>
                  </>
                ) : (
                  <span className="font-acumin text-lg font-bold italic uppercase leading-none">
                    {filter.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Club Tabs */}
        <div className="flex gap-2">
          {clubs.map((club, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedClub(selectedClub === idx ? null : idx)}
              className={`flex w-40 items-center gap-1 rounded-full border p-1 ${
                selectedClub === idx
                  ? "border-primary bg-white"
                  : "border-[#EEEDE9] bg-white"
              }`}
            >
              <ClubBadge abbr={club.abbr} color={club.color} />
              <div className="flex flex-col overflow-hidden text-left">
                <span className="truncate font-barlow text-xs font-semibold uppercase tracking-wider text-[#A19C9B]">
                  {club.brand}
                </span>
                <span className="truncate font-barlow text-sm font-semibold tracking-tight text-black">
                  {club.model}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shot Table */}
      <div className="w-full">
        <div className="flex items-center rounded-t-lg bg-black px-6 py-5">
          <div className="w-10 shrink-0" />
          <div className="flex flex-1 justify-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
            Club Type
          </div>
          <div className="flex flex-1 flex-col items-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
            <span>Carry</span>
            <span className="text-xs font-medium normal-case tracking-tight text-neutral-400">(yards)</span>
          </div>
          <div className="flex flex-1 flex-col items-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
            <span>Total</span>
            <span className="text-xs font-medium normal-case tracking-tight text-neutral-400">(yards)</span>
          </div>
          <div className="flex flex-1 flex-col items-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
            <span>Club Speed</span>
            <span className="text-xs font-medium normal-case tracking-tight text-neutral-400">(mph)</span>
          </div>
          <div className="flex flex-1 flex-col items-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
            <span>Ball Speed</span>
            <span className="text-xs font-medium normal-case tracking-tight text-neutral-400">(mph)</span>
          </div>
          <div className="flex flex-1 flex-col items-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
            <span>Launch Ang.</span>
            <span className="text-xs font-medium normal-case tracking-tight text-neutral-400">(deg)</span>
          </div>
          <div className="flex flex-1 flex-col items-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
            <span>Strokes Gained</span>
          </div>
          <div className="w-[140px] shrink-0 text-center font-barlow text-sm font-semibold uppercase tracking-wider text-white">
            Replay Options
          </div>
        </div>

        <div className="flex flex-col">
          {groupedByTarget.map((group, groupIdx) => {
            const avgSG =
              group.shots.reduce((sum, s) => sum + s.strokesGained, 0) /
              group.shots.length;
            return (
              <div key={`${group.targetYards}-${groupIdx}`}>
                <TargetHeader
                  targetYards={group.targetYards}
                  shotCount={group.shots.length}
                  avgStrokesGained={avgSG}
                />
                {group.shots.map((shot, idx) => {
                  const club = clubs[shot.clubIndex];
                  const bgColor = idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]";
                  return (
                    <div
                      key={shot.id}
                      className={`flex items-center px-6 py-3 ${bgColor}`}
                    >
                      <div className="flex w-10 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-6 w-6 rounded border-2 border-neutral-800 accent-primary"
                        />
                      </div>
                      <div className="flex flex-1 items-center justify-center">
                        <div className="flex items-center gap-1 rounded-full">
                          <ClubBadge abbr={club.abbr} color={club.color} />
                          <div className="flex flex-col overflow-hidden">
                            <span className="truncate font-barlow text-xs font-semibold uppercase tracking-wider text-[#A19C9B]">
                              {club.brand}
                            </span>
                            <span className="truncate font-barlow text-sm font-semibold tracking-tight text-black">
                              {club.model}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 justify-center font-acumin text-xl font-bold italic text-black">
                        {shot.carry}
                      </div>
                      <div className="flex flex-1 justify-center font-acumin text-xl font-bold italic text-black">
                        {shot.total}
                      </div>
                      <div className="flex flex-1 justify-center font-acumin text-xl font-bold italic text-black">
                        {shot.clubSpeed}
                      </div>
                      <div className="flex flex-1 justify-center font-acumin text-xl font-bold italic text-black">
                        {shot.ballSpeed}
                      </div>
                      <div className="flex flex-1 justify-center font-acumin text-xl font-bold italic text-black">
                        {shot.launchAngle}
                      </div>
                      <div className={`flex flex-1 justify-center font-acumin text-xl font-bold italic ${sgColor(shot.strokesGained)}`}>
                        {formatSG(shot.strokesGained)}
                      </div>
                      <div className="flex w-[140px] shrink-0 items-center justify-center gap-1">
                        <ReplayButton icon="swing" />
                        <ReplayButton icon="tracer" />
                        <ReplayButton icon="data" />
                        <ChevronDownSmall />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TargetHeader({
  targetYards,
  shotCount,
  avgStrokesGained,
}: {
  targetYards: number;
  shotCount: number;
  avgStrokesGained: number;
}) {
  return (
    <div className="flex items-center gap-4 border-l-4 border-primary bg-neutral-900 px-6 py-3">
      <div className="flex items-center gap-2">
        <TargetIcon className="h-5 w-5 text-primary" />
        <span className="font-acumin text-2xl font-bold italic uppercase leading-none text-white">
          Target — {targetYards} yards
        </span>
      </div>
      <div className="h-4 w-px bg-neutral-700" />
      <span className="font-barlow text-sm font-medium text-neutral-400">
        {shotCount} {shotCount === 1 ? "shot" : "shots"}
      </span>
      <div className="h-4 w-px bg-neutral-700" />
      <div className="flex items-center gap-1">
        <span className="font-barlow text-sm font-medium text-neutral-400">
          Avg SG:
        </span>
        <span
          className={`font-acumin text-lg font-bold italic ${
            avgStrokesGained > 0
              ? "text-green-400"
              : avgStrokesGained < 0
                ? "text-red-400"
                : "text-white"
          }`}
        >
          {avgStrokesGained >= 0 ? "+" : ""}
          {avgStrokesGained.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="8" />
      <circle cx="10" cy="10" r="5" />
      <circle cx="10" cy="10" r="2" />
    </svg>
  );
}

function HighlightCard({
  value,
  label,
  unit,
}: {
  value: string;
  label: string;
  unit?: string;
}) {
  return (
    <div className="flex h-20 overflow-hidden rounded-lg border border-[#EEEDE9] bg-white">
      <div className="relative flex w-[140px] shrink-0 items-center justify-center">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 140 80"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 0H120L100 80H0V0Z" fill="#1a1a1a" />
          <path d="M100 0H140L120 80H80L100 0Z" fill="#CD1B32" />
        </svg>
        <div className="relative z-10 flex items-center gap-1">
          <span className="font-acumin text-[40px] font-bold italic uppercase leading-none text-white">
            {value}
          </span>
          {unit && (
            <span className="-rotate-90 font-barlow text-[10px] font-semibold uppercase tracking-wider text-[#A19C9B]">
              {unit}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 items-center pl-6">
        <span className="font-acumin text-2xl font-bold italic uppercase leading-none text-black">
          {label}
        </span>
      </div>
    </div>
  );
}

function ClubBadge({ abbr, color }: { abbr: string; color: string }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-md">
      <div
        className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: color }}
      >
        <span className="font-barlow text-sm font-semibold tracking-tight">
          {abbr}
        </span>
      </div>
    </div>
  );
}

function ReplayButton({ icon }: { icon: "swing" | "tracer" | "data" }) {
  const paths: Record<string, React.ReactNode> = {
    swing: (
      <path
        d="M10 4v12M7 7l3-3 3 3M10 16c-3 0-5-1-5-3"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    tracer: (
      <path
        d="M4 16c2-4 5-8 8-10s4 2 4 6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    ),
    data: (
      <path
        d="M8 4v12M12 8v8"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
    ),
  };
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-black">
      <svg className="h-5 w-5" viewBox="0 0 20 20">
        {paths[icon]}
      </svg>
    </button>
  );
}

function ChevronDownSmall() {
  return (
    <svg className="h-5 w-5 text-neutral-800" viewBox="0 0 20 20" fill="none">
      <polyline
        points="6 8 10 12 14 8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <rect x="2" y="10" width="4" height="7" rx="1" fill="currentColor" />
      <rect x="8" y="6" width="4" height="11" rx="1" fill="currentColor" />
      <rect x="14" y="3" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}

function ExportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path
        d="M10 3v10M6 7l4-4 4 4M4 13v2a2 2 0 002 2h8a2 2 0 002-2v-2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

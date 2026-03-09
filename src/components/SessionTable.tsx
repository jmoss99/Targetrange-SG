interface Session {
  id: number;
  date: string;
  shots: number;
  targets: number;
  mode: string;
  ballType: string;
  elevation: string;
  strokesGained: number;
}

const sessions: Session[] = [
  { id: 1, date: "8/30/23", shots: 64, targets: 4, mode: "Range", ballType: "Titleist Pro V1x with RPT", elevation: "1500 mt", strokesGained: 1.24 },
  { id: 2, date: "8/17/23", shots: 23, targets: 2, mode: "Net", ballType: "Premium Ball", elevation: "3200 mt", strokesGained: -0.56 },
  { id: 3, date: "8/10/23", shots: 107, targets: 3, mode: "Range", ballType: "Range Ball", elevation: "1700 mt", strokesGained: 0.83 },
  { id: 4, date: "8/8/23", shots: 1000, targets: 17, mode: "Range", ballType: "Titleist Pro V1 with RPT", elevation: "500 mt", strokesGained: 2.15 },
  { id: 5, date: "8/3/23", shots: 17, targets: 1, mode: "Range", ballType: "Range Ball", elevation: "250 mt", strokesGained: 0.32 },
  { id: 6, date: "8/3/23", shots: 17, targets: 1, mode: "Range", ballType: "Callaway Chrome Soft X wit...", elevation: "1500 mt", strokesGained: -1.07 },
  { id: 7, date: "8/3/23", shots: 17, targets: 1, mode: "Range", ballType: "Titleist Pro V1x with RPT", elevation: "1500 mt", strokesGained: 0.45 },
  { id: 8, date: "8/3/23", shots: 17, targets: 1, mode: "Range", ballType: "Callaway Chrome Soft X wit...", elevation: "1500 mt", strokesGained: -0.22 },
  { id: 9, date: "8/3/23", shots: 17, targets: 1, mode: "Range", ballType: "Titleist Pro V1x with RPT", elevation: "1500 mt", strokesGained: 1.68 },
  { id: 10, date: "8/3/23", shots: 17, targets: 1, mode: "Range", ballType: "Premium Ball", elevation: "1500 mt", strokesGained: 0.91 },
  { id: 11, date: "8/3/23", shots: 17, targets: 1, mode: "Range", ballType: "Range Ball", elevation: "1500 mt", strokesGained: -0.14 },
];

const columns = ["Date", "Shots", "Targets", "Mode", "Ball Type", "Elevation", "Strokes Gained", ""];

function formatSG(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}`;
}

function sgColor(value: number): string {
  if (value > 0) return "text-success";
  if (value < 0) return "text-primary";
  return "text-black";
}

interface SessionTableProps {
  onViewShots?: (session: { date: string; shots: number; targets: number; strokesGained: number }) => void;
}

export default function SessionTable({ onViewShots }: SessionTableProps) {
  return (
    <div className="w-full">
      <div className="flex items-center rounded-t-lg bg-black px-6 py-5">
        {columns.map((col) => (
          <div
            key={col || "action"}
            className="flex flex-1 justify-center font-barlow text-sm font-semibold uppercase tracking-wider text-white"
          >
            {col}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 pt-6">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center px-6"
          >
            <div className="flex flex-1 justify-center font-barlow text-sm font-medium tracking-tight text-black">
              {session.date}
            </div>
            <div className="flex flex-1 justify-center font-acumin text-xl font-bold italic text-black">
              {session.shots}
            </div>
            <div className="flex flex-1 justify-center font-acumin text-xl font-bold italic text-black">
              {session.targets}
            </div>
            <div className="flex flex-1 justify-center font-barlow text-sm font-medium tracking-tight text-black">
              {session.mode}
            </div>
            <div className="flex flex-1 justify-center overflow-hidden font-barlow text-xs font-medium tracking-tight text-black">
              <span className="truncate">{session.ballType}</span>
            </div>
            <div className="flex flex-1 justify-center font-barlow text-sm font-medium tracking-tight text-black">
              {session.elevation}
            </div>
            <div className={`flex flex-1 justify-center font-acumin text-xl font-bold italic ${sgColor(session.strokesGained)}`}>
              {formatSG(session.strokesGained)}
            </div>
            <div className="flex flex-1 justify-end">
              <button
                onClick={() => onViewShots?.({ date: session.date, shots: session.shots, targets: session.targets, strokesGained: session.strokesGained })}
                className="font-barlow text-base font-semibold text-primary underline"
              >
                View Shots
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

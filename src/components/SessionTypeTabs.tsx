import { useState } from "react";

const sessionTypes = [
  "Practice",
  "Combines",
  "Courses",
  "Closest to Pin",
  "Range",
  "Speed",
  "Target Range",
];

export default function SessionTypeTabs() {
  const [active, setActive] = useState("Target Range");

  return (
    <div className="inline-flex items-start gap-0 rounded-full border border-neutral-200 bg-white p-1">
      {sessionTypes.map((type) => (
        <button
          key={type}
          onClick={() => setActive(type)}
          className={`flex h-10 items-center justify-center rounded-full px-4 font-barlow text-sm font-semibold tracking-tight transition-colors ${
            active === type
              ? "bg-primary text-white"
              : "text-neutral-800 hover:text-black"
          }`}
          style={{ minWidth: 100 }}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

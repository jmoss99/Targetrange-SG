import { useState } from "react";

const timeOptions = ["Lifetime", "Week", "Month", "3 Months", "6 Months", "Year"];

export default function TimeTabs() {
  const [active, setActive] = useState("Lifetime");

  return (
    <div className="flex gap-6">
      {timeOptions.map((option) => (
        <button
          key={option}
          onClick={() => setActive(option)}
          className="flex flex-col items-center gap-2"
        >
          <span
            className={`font-barlow text-lg leading-snug tracking-tight ${
              active === option
                ? "font-semibold text-black"
                : "font-medium text-neutral-800"
            }`}
          >
            {option}
          </span>
          {active === option && (
            <div className="h-[3px] w-full rounded-full bg-black" />
          )}
        </button>
      ))}
    </div>
  );
}

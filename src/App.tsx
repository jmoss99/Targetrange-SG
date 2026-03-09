import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TimeTabs from "./components/TimeTabs";
import SessionTypeTabs from "./components/SessionTypeTabs";
import SessionTable from "./components/SessionTable";
import SessionDetail from "./components/SessionDetail";
import YardageIntervals from "./components/YardageIntervals";
import { SyncDotIcon, CalendarIcon, ChevronDownIcon } from "./components/Icons";
import "./index.css";

interface SelectedSession {
  date: string;
  shots: number;
  targets: number;
  strokesGained: number;
}

type View = "list" | "detail" | "yardage-intervals";

export default function App() {
  const [selectedSession, setSelectedSession] = useState<SelectedSession | null>(null);
  const [view, setView] = useState<View>("list");

  const goToDetail = (session: SelectedSession) => {
    setSelectedSession(session);
    setView("detail");
  };

  const goToList = () => {
    setSelectedSession(null);
    setView("list");
  };

  const goToYardageIntervals = () => {
    setView("yardage-intervals");
  };

  const goBackToDetail = () => {
    setView("detail");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="ml-[176px] flex-1 p-6 pb-16">
        {view === "yardage-intervals" && selectedSession ? (
          <YardageIntervals
            session={selectedSession}
            onBack={goBackToDetail}
          />
        ) : view === "detail" && selectedSession ? (
          <SessionDetail
            session={selectedSession}
            onBack={goToList}
            onYardageIntervals={goToYardageIntervals}
          />
        ) : (
          <div className="flex flex-col gap-8 pt-8">
            <div className="flex items-center justify-between">
              <h1 className="font-acumin text-[40px] font-bold italic uppercase leading-none text-black">
                Sessions
              </h1>
              <div className="flex items-center gap-2 rounded-full px-2 py-2">
                <SyncDotIcon className="h-4 w-4" />
                <span className="font-barlow text-sm font-semibold tracking-tight text-neutral-800">
                  Last Sync: 4:23 PM 8/17/23
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <TimeTabs />
                <div className="flex h-10 w-60 items-center gap-3 rounded-md border border-neutral-200 bg-white px-3 shadow-xs">
                  <CalendarIcon className="h-5 w-5 text-neutral-800" />
                  <span className="flex-1 font-barlow text-sm font-medium tracking-tight text-neutral-900">
                    Select Date
                  </span>
                  <ChevronDownIcon className="h-5 w-5 text-neutral-800" />
                </div>
              </div>
              <SessionTypeTabs />
            </div>

            <SessionTable onViewShots={(session) => goToDetail(session)} />
          </div>
        )}
      </main>
    </div>
  );
}

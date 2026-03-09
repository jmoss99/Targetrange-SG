import {
  HomeIcon,
  PlayIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "./Icons";

const navItems = [
  { label: "HOME", icon: HomeIcon, active: false },
  { label: "SESSIONS", icon: PlayIcon, active: true },
  { label: "CLUB COMPARISON", icon: ChartBarIcon, active: false },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-[176px] flex-col bg-black">
      <div className="flex flex-col items-center gap-10 pt-10">
        <div className="flex items-center justify-center px-4">
          <RapsodoLogo />
        </div>

        <nav className="flex w-full flex-col">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex h-12 items-center gap-2 px-4 ${
                item.active
                  ? "border-b border-primary bg-white"
                  : "text-white"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${item.active ? "text-black" : "text-white"}`}
              />
              <span
                className={`font-barlow text-sm font-semibold uppercase tracking-wider ${
                  item.active ? "text-black" : "text-white"
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto flex flex-col items-center gap-10 pb-16">
        <div className="flex w-full flex-col gap-4">
          <a
            href="#"
            className="flex h-12 items-center gap-2 px-4 text-white"
          >
            <UserCircleIcon className="h-6 w-6" />
            <span className="font-barlow text-sm font-semibold uppercase tracking-wider">
              PROFILE
            </span>
          </a>

          <div className="mx-4 h-px bg-neutral-700" />

          <div className="px-4">
            <div className="flex flex-col gap-0 overflow-hidden rounded-lg border border-neutral-900 bg-[#111]">
              <AppSwitcherButton label="PC APP" active={false} />
              <AppSwitcherButton label="MLM2PRO APP" active={true} />
              <AppSwitcherButton label="MLM APP" active={false} />
            </div>
          </div>
        </div>

        <div className="w-full px-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white px-5 py-3 text-white">
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
            <span className="font-barlow text-sm font-semibold uppercase tracking-wider">
              LOGOUT
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}

function AppSwitcherButton({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <button
      className={`flex h-10 items-center justify-center rounded-full px-4 font-barlow text-sm font-semibold tracking-tight ${
        active ? "bg-primary text-white" : "text-neutral-800"
      }`}
    >
      {label}
    </button>
  );
}

function RapsodoLogo() {
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 178 56"
        className="h-14 w-[178px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="32"
          textAnchor="middle"
          fontFamily="Impact, 'Arial Narrow Bold', sans-serif"
          fontSize="28"
          fontStyle="italic"
          fill="white"
          letterSpacing="1"
        >
          Rapsodo
        </text>
        <text
          x="50%"
          y="52"
          textAnchor="middle"
          fontFamily="'Barlow', sans-serif"
          fontWeight="600"
          fontSize="14"
          fill="white"
          letterSpacing="4"
        >
          GOLF
        </text>
      </svg>
    </div>
  );
}

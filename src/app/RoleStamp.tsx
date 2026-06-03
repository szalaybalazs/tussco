import { iAppRole } from "./app";

const STAMPS: Record<iAppRole, { label: string; className: string }> = {
  indie: {
    label: "Indie",
    className:
      "bg-indigo-100 text-indigo-800 ring-1 ring-inset ring-indigo-600/25 dark:bg-indigo-500/20 dark:text-indigo-200 dark:ring-indigo-400/30",
  },
  "co-owner": {
    label: "Co-owner",
    className:
      "bg-amber-100 text-amber-900 ring-1 ring-inset ring-amber-600/30 dark:bg-amber-400/20 dark:text-amber-100 dark:ring-amber-300/30",
  },
  contract: {
    label: "Contract",
    className:
      "bg-slate-200 text-slate-700 ring-1 ring-inset ring-slate-500/30 dark:bg-slate-500/30 dark:text-slate-100 dark:ring-slate-300/30",
  },
};

export const RoleStamp = ({
  role,
  className = "",
}: {
  role: iAppRole;
  className?: string;
}) => {
  const stamp = STAMPS[role];
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide leading-none ${stamp.className} ${className}`}
    >
      {stamp.label}
    </span>
  );
};

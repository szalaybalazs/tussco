import { iAppRole } from "./app";

const STAMPS: Record<iAppRole, { label: string; className: string }> = {
  indie: {
    label: "Indie",
    className: "text-indigo-600 dark:text-indigo-400",
  },
  "co-owner": {
    label: "Co-owner",
    className: "text-amber-600 dark:text-amber-500",
  },
  contract: {
    label: "Contract",
    className: "text-slate-500 dark:text-slate-400",
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
      className={`shrink-0 text-[11px] font-bold uppercase tracking-wide leading-none ${stamp.className} ${className}`}
    >
      {stamp.label}
    </span>
  );
};

import { iAppRole } from "./app";

const STAMPS: Record<iAppRole, { label: string; className: string }> = {
  indie: {
    label: "Indie",
    className:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
  "co-owner": {
    label: "Co-owner",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
  contract: {
    label: "Contract",
    className:
      "bg-gray-100 text-gray-600 dark:bg-gray-600/40 dark:text-gray-300",
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
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tracking-wide ${stamp.className} ${className}`}
    >
      {stamp.label}
    </span>
  );
};

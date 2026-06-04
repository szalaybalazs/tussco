"use client";

import { useRouter } from "next/navigation";

export const BackLink = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        // Go back through history so the timeline's scroll position is
        // restored, rather than pushing a fresh "/" that lands at the top.
        if (window.history.length > 1) router.back();
        else router.push("/");
      }}
      className="inline-flex items-center gap-1.5 text-indigo-500 font-medium mb-6 hover:underline underline-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <span>Back</span>
    </button>
  );
};

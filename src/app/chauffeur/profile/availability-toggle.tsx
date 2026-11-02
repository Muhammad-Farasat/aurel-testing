"use client";

import { useTransition } from "react";
import { setAvailabilityAction } from "./actions";
import { cn } from "@/lib/utils";

export function AvailabilityToggle({ isAvailable }: { isAvailable: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => setAvailabilityAction(!isAvailable))}
      className={cn(
        "flex items-center gap-3 rounded-sm border px-4 py-3 text-sm transition-colors disabled:opacity-60",
        isAvailable
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-midnight/15 bg-midnight/5 text-slate",
      )}
    >
      <span
        className={cn(
          "inline-block size-2.5 rounded-full",
          isAvailable ? "bg-emerald-500" : "bg-slate",
        )}
      />
      {isAvailable ? "Available for assignments" : "Unavailable"}
      <span className="ml-2 text-xs underline underline-offset-2">
        {isAvailable ? "Set unavailable" : "Set available"}
      </span>
    </button>
  );
}

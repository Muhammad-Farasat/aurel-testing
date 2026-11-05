import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { newDraft, type Draft, type Service } from "./model";
import { readJson, removeKey, writeJson } from "./storage";

const KEY = "aurel.draft.v1";

interface DraftApi {
  draft: Draft;
  update: (patch: Partial<Draft> | ((d: Draft) => Partial<Draft>)) => void;
  setService: (s: Service) => void;
  reset: (service?: Service) => void;
  replace: (d: Draft) => void;
}

const Ctx = createContext<DraftApi | null>(null);

function load(): Draft {
  const saved = readJson<Draft>(KEY);
  if (saved && saved.version === 1) return { ...newDraft(), ...saved };
  return newDraft();
}

export function DraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Draft>(load);

  useEffect(() => {
    if (draft.updatedAt) writeJson(KEY, draft);
  }, [draft]);

  const update = useCallback<DraftApi["update"]>((patch) => {
    setDraft((d) => ({ ...d, ...(typeof patch === "function" ? patch(d) : patch), updatedAt: Date.now() }));
  }, []);

  // Switching service keeps what still applies (pickup stays from Transfer to Hourly).
  const setService = useCallback((service: Service) => {
    setDraft((d) => {
      if (d.service === service) return d;
      const next: Draft = { ...d, service, updatedAt: Date.now() };
      if (service !== "transfer") next.stops = [];
      return next;
    });
  }, []);

  const reset = useCallback((service?: Service) => {
    removeKey(KEY);
    setDraft(newDraft(service));
  }, []);

  const replace = useCallback((d: Draft) => setDraft({ ...d, updatedAt: Date.now() }), []);

  const api = useMemo(() => ({ draft, update, setService, reset, replace }), [draft, update, setService, reset, replace]);
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useDraft(): DraftApi {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDraft outside DraftProvider");
  return v;
}

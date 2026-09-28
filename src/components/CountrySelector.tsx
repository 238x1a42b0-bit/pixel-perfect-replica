import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES } from "@/data/travel";
import { cn } from "@/lib/utils";

interface Props {
  value: string | null;
  onChange: (code: string) => void;
}

export function CountrySelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const selected = COUNTRIES.find((c) => c.code === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q)) : COUNTRIES;
  }, [query]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-full items-center gap-3 rounded-full border border-border bg-card/90 px-5 text-left text-sm transition-colors hover:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        <Globe2 className="h-5 w-5 shrink-0 text-accent" />
        <span className={cn("min-w-0 flex-1 truncate font-medium", !selected && "text-muted-foreground")}>
          {selected ? `${selected.flag}  ${selected.name}` : "Select a country"}
        </span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-16 z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
          <div className="border-b border-border p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a country…"
              aria-label="Filter countries"
              className="h-10 w-full rounded-xl bg-secondary px-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-muted-foreground">No country found.</li>
            ) : (
              filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.code === value}
                    onClick={() => {
                      onChange(c.code);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-secondary"
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    {c.code === value ? <Check className="h-4 w-4 text-accent" /> : null}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

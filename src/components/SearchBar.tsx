import { Link } from "@tanstack/react-router";
import { Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { searchAll } from "@/data/travel";
import { cn } from "@/lib/utils";

interface Props {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
}

export function SearchBar({ placeholder = "Search countries, cities, destinations…", className, autoFocus, onNavigate }: Props) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchAll(query), [query]);
  const open = query.trim().length > 0;

  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor="global-search" className="sr-only">
        Search ExploreWorld
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        id="global-search"
        type="search"
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-border bg-card/80 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30"
      />

      {open ? (
        <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
          {results.length === 0 ? (
            <div className="flex items-center gap-3 px-5 py-6 text-sm text-muted-foreground">
              <SearchX className="h-5 w-5" />
              No matches for “{query}”. Try another city or country.
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((r) => (
                <li key={`${r.type}-${r.label}`}>
                  <Link
                    to={r.to}
                    params={r.params as never}
                    onClick={() => {
                      setQuery("");
                      onNavigate?.();
                    }}
                    className="flex items-center justify-between gap-4 px-5 py-3 text-sm transition-colors hover:bg-secondary"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-foreground">{r.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{r.sub}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                      {r.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

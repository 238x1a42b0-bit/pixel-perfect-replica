import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { COUNTRIES, destinationsOf, imageFor } from "@/data/travel";

export const Route = createFileRoute("/countries")({
  head: () => ({
    meta: [
      { title: "All Countries — ExploreWorld" },
      { name: "description", content: "Browse every country on ExploreWorld and see how many destinations each one has." },
      { property: "og:title", content: "All Countries — ExploreWorld" },
      { property: "og:description", content: "Browse every country on ExploreWorld and start planning your next trip." },
    ],
  }),
  component: CountriesPage,
});

function CountriesPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(s)) : COUNTRIES;
  }, [q]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Countries</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {COUNTRIES.length} countries, each with curated destinations, categories and travel timings.
      </p>

      <div className="relative mt-8 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter countries…"
          aria-label="Filter countries"
          className="h-12 w-full rounded-full border border-border bg-card/70 pl-11 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
      </div>

      {list.length === 0 ? (
        <p className="mt-16 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center text-muted-foreground">
          No country matches “{q}”.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Link
              key={c.code}
              to="/country/$code"
              params={{ code: c.code }}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
            >
              <img
                src={imageFor(`country-${c.code}`, 900, 600)}
                alt={c.name}
                loading="lazy"
                width={900}
                height={600}
                className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="space-y-2 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="min-w-0 truncate text-lg font-semibold">
                    <span className="mr-2">{c.flag}</span>
                    {c.name}
                  </h2>
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                    {destinationsOf(c.code).length}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{c.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

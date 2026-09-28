import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { DestinationGrid } from "@/components/DestinationGrid";
import { CATEGORIES, COUNTRIES, DESTINATIONS, countryName, type Category } from "@/data/travel";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "All Destinations — ExploreWorld" },
      { name: "description", content: "Search and filter every destination on ExploreWorld by category, country or name." },
      { property: "og:title", content: "All Destinations — ExploreWorld" },
      { property: "og:description", content: "Filter destinations by category and country to plan your trip." },
    ],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  const [category, setCategory] = useState<Category | "All">("All");
  const [country, setCountry] = useState("all");
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return DESTINATIONS.filter(
      (d) =>
        (category === "All" || d.category === category) &&
        (country === "all" || d.countryCode === country) &&
        (!s || d.name.toLowerCase().includes(s) || d.region.toLowerCase().includes(s) || countryName(d.countryCode).toLowerCase().includes(s)),
    );
  }, [category, country, q]);

  const counts = useMemo(() => {
    const base = DESTINATIONS.filter((d) => country === "all" || d.countryCode === country);
    const map: Partial<Record<Category | "All", number>> = { All: base.length };
    CATEGORIES.forEach((c) => (map[c] = base.filter((d) => d.category === c).length));
    return map;
  }, [country]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Destinations</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {DESTINATIONS.length} places across {COUNTRIES.length} countries — filter until you find yours.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search destinations, cities or regions…"
            aria-label="Search destinations"
            className="h-12 w-full rounded-full border border-border bg-card/70 pl-11 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          aria-label="Filter by country"
          className="h-12 shrink-0 rounded-full border border-border bg-card/70 px-5 text-sm outline-none focus:border-accent"
        >
          <option value="all">All countries</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <CategoryFilter value={category} onChange={setCategory} counts={counts} />
      </div>

      <div className="mt-10">
        <DestinationGrid
          destinations={results}
          emptyTitle="No destinations found"
          emptyText="Try clearing the search or picking a different category."
        />
      </div>
    </main>
  );
}

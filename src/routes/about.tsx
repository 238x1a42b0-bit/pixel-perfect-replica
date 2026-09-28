import { createFileRoute } from "@tanstack/react-router";
import { COUNTRIES, DESTINATIONS } from "@/data/travel";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ExploreWorld" },
      { name: "description", content: "What ExploreWorld is, how the destination data is organised and what is coming next." },
      { property: "og:title", content: "About ExploreWorld" },
      { property: "og:description", content: "A travel discovery platform built around countries, categories and curated places." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">About ExploreWorld</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        ExploreWorld is a travel discovery platform built around one simple idea: start with a country, then let the
        places come to you. Every destination is tagged by category, region and popularity so you can narrow a whole
        country down to the handful of places that actually fit your trip.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { k: COUNTRIES.length, v: "Countries" },
          { k: DESTINATIONS.length, v: "Destinations" },
          { k: 8, v: "Categories" },
        ].map((s) => (
          <div key={s.v} className="rounded-3xl border border-border bg-card/60 p-6 text-center shadow-soft">
            <p className="text-3xl font-bold text-accent">{s.k}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-semibold tracking-tight">How it works</h2>
      <ul className="mt-4 space-y-3 text-muted-foreground">
        <li>Pick a country from the home page and jump straight to its destination list.</li>
        <li>Filter by category — cities, beaches, mountains, historical, religious and more.</li>
        <li>Open any place for things to do, best time to visit and how long to stay.</li>
        <li>Heart the ones you like; your shortlist is stored on this device.</li>
      </ul>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">A note on the data</h2>
      <p className="mt-4 text-muted-foreground">
        The current version uses a structured sample dataset so the whole site works offline and instantly. It is
        designed to be extended — adding a country or a new destination is a single entry in the data file.
      </p>
    </main>
  );
}

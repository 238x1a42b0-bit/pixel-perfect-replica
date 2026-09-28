import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Heart, MapPinned } from "lucide-react";
import { Hero } from "@/components/Hero";
import { DestinationGrid } from "@/components/DestinationGrid";
import { COUNTRIES, DESTINATIONS, destinationsOf, imageFor } from "@/data/travel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ExploreWorld — Discover the World, One Place at a Time" },
      {
        name: "description",
        content:
          "Choose a country and explore its most beautiful destinations, attractions and experiences with ExploreWorld.",
      },
      { property: "og:title", content: "ExploreWorld — Discover the World, One Place at a Time" },
      {
        property: "og:description",
        content: "Pick a country and browse curated destinations, best times to visit and things to do.",
      },
    ],
  }),
  component: Index,
});

const featured = DESTINATIONS.filter((d) => d.popularity === 5).slice(0, 6);

function Index() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: MapPinned, title: `${DESTINATIONS.length} destinations`, text: "Hand-written highlights across every continent." },
            { icon: Compass, title: `${COUNTRIES.length} countries`, text: "Search, filter and compare before you book." },
            { icon: Heart, title: "Save favorites", text: "Your shortlist stays on this device, no account needed." },
          ].map((f) => (
            <div key={f.title} className="rounded-3xl border border-border bg-card/60 p-6 shadow-soft">
              <f.icon className="h-6 w-6 text-accent" />
              <h2 className="mt-4 text-lg font-semibold">{f.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Popular right now</h2>
            <p className="mt-2 text-sm text-muted-foreground">The places travellers open first on ExploreWorld.</p>
          </div>
          <Link to="/destinations" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            See all destinations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <DestinationGrid destinations={featured} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Browse by country</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTRIES.slice(0, 8).map((c) => (
            <Link
              key={c.code}
              to="/country/$code"
              params={{ code: c.code }}
              className="group relative overflow-hidden rounded-3xl border border-border shadow-soft transition-transform hover:-translate-y-1"
            >
              <img
                src={imageFor(`country-${c.code}`, 700, 900)}
                alt={c.name}
                loading="lazy"
                width={700}
                height={900}
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-2xl">{c.flag}</p>
                <p className="mt-1 truncate text-lg font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{destinationsOf(c.code).length} destinations</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

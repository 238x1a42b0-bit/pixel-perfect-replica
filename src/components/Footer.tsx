import { Link } from "@tanstack/react-router";
import { Compass, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { DESTINATIONS } from "@/data/travel";

const popular = DESTINATIONS.filter((d) => d.popularity === 5).slice(0, 5);

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand">
              <Compass className="h-5 w-5 text-accent-foreground" />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Explore<span className="text-accent">World</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pick a country, discover its most beautiful places, and build a shortlist you can actually travel to.
          </p>
          <div className="flex gap-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/", label: "Home" },
              { to: "/countries", label: "Countries" },
              { to: "/destinations", label: "Destinations" },
              { to: "/favorites", label: "Favorites" },
              { to: "/about", label: "About" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Popular destinations</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {popular.map((d) => (
              <li key={d.id}>
                <Link to="/destination/$id" params={{ id: d.id }} className="transition-colors hover:text-accent">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Travel smarter</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Every destination page lists the best time to visit, how long to stay and what not to miss — so you can plan a
            trip in an afternoon.
          </p>
        </div>
      </div>

      <div className="border-t border-border/60 px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} ExploreWorld. Sample travel data for demonstration purposes.
      </div>
    </footer>
  );
}

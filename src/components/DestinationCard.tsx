import { Link } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import { countryName, imageFor, type Destination } from "@/data/travel";
import { FavoriteButton } from "./FavoriteButton";

export function DestinationCard({ destination }: { destination: Destination }) {
  const d = destination;
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageFor(d.id)}
          alt={d.name}
          loading="lazy"
          width={900}
          height={650}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground backdrop-blur">
          {d.category}
        </span>
        <FavoriteButton id={d.id} className="absolute right-3 top-3 px-2.5" />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 truncate text-lg font-semibold tracking-tight">{d.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm text-accent">
            <Star className="h-4 w-4 fill-accent" />
            {d.popularity.toFixed(1)}
          </span>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {d.region}, {countryName(d.countryCode)}
          </span>
        </p>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{d.short}</p>
        <Link
          to="/destination/$id"
          params={{ id: d.id }}
          className="inline-flex w-full items-center justify-center rounded-full border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

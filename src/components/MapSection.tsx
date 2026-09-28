import { MapPin, Navigation } from "lucide-react";
import type { Destination } from "@/data/travel";
import { countryName } from "@/data/travel";

/**
 * Map placeholder.
 *
 * To plug in a real map later, swap the <div> below for your map component
 * (Mapbox / Google Maps / Leaflet) using `destination.coords`.
 */
export function MapSection({ destination }: { destination: Destination }) {
  const { lat, lng } = destination.coords;
  const osm = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=11/${lat}/${lng}`;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Location</h2>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-deep p-8 sm:p-12">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-grid" aria-hidden="true" />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-2">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              <span className="truncate">
                {destination.region}, {countryName(destination.countryCode)}
              </span>
            </p>
            <p className="text-2xl font-semibold tracking-tight">{destination.name}</p>
            <p className="font-mono text-xs text-muted-foreground">
              {lat.toFixed(4)}° , {lng.toFixed(4)}°
            </p>
          </div>
          <a
            href={osm}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            <Navigation className="h-4 w-4" />
            Open in maps
          </a>
        </div>
      </div>
    </section>
  );
}

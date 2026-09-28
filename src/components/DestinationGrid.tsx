import { Compass } from "lucide-react";
import type { Destination } from "@/data/travel";
import { DestinationCard } from "./DestinationCard";

interface Props {
  destinations: Destination[];
  loading?: boolean;
  emptyTitle?: string;
  emptyText?: string;
  emptyAction?: React.ReactNode;
}

export function DestinationGrid({ destinations, loading, emptyTitle, emptyText, emptyAction }: Props) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="aspect-[4/3] animate-pulse bg-secondary" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-secondary" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
              <div className="h-10 w-full animate-pulse rounded-full bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
        <Compass className="h-10 w-10 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold">{emptyTitle ?? "Nothing here yet"}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{emptyText ?? "Try a different filter or search."}</p>
        </div>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((d) => (
        <DestinationCard key={d.id} destination={d} />
      ))}
    </div>
  );
}

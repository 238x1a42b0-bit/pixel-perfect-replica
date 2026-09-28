import { createFileRoute, Link } from "@tanstack/react-router";
import { DestinationGrid } from "@/components/DestinationGrid";
import { DESTINATIONS } from "@/data/travel";
import { useFavorites } from "@/hooks/useFavorites";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Your Favorites — ExploreWorld" },
      { name: "description", content: "Every destination you saved on ExploreWorld, kept on this device." },
      { property: "og:title", content: "Your Favorites — ExploreWorld" },
      { property: "og:description", content: "Your saved travel shortlist on ExploreWorld." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { ids, ready } = useFavorites();
  const saved = DESTINATIONS.filter((d) => ids.includes(d.id));

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Favorites</h1>
      <p className="mt-3 text-muted-foreground">
        {ready ? `${saved.length} saved ${saved.length === 1 ? "place" : "places"}` : "Loading your list…"}
      </p>

      <div className="mt-10">
        <DestinationGrid
          destinations={saved}
          loading={!ready}
          emptyTitle="No favorites yet"
          emptyText="Tap the heart on any destination and it will show up here — even after a refresh."
          emptyAction={
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              Browse destinations
            </Link>
          }
        />
      </div>
    </main>
  );
}

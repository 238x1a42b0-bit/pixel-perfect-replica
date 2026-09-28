import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  label?: string;
  className?: string;
}

export function FavoriteButton({ id, label, className }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-2 text-sm font-medium backdrop-blur transition-all hover:border-accent/60 hover:text-accent active:scale-95",
        active && "border-accent/70 text-accent",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4 transition-transform", active && "fill-accent text-accent scale-110")} />
      {label ? <span>{active ? "Saved" : label}</span> : null}
    </button>
  );
}

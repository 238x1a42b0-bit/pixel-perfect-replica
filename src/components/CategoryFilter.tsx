import { CATEGORIES, type Category } from "@/data/travel";
import { cn } from "@/lib/utils";

interface Props {
  value: Category | "All";
  onChange: (value: Category | "All") => void;
  counts?: Partial<Record<Category | "All", number>>;
}

export function CategoryFilter({ value, onChange, counts }: Props) {
  const options: (Category | "All")[] = ["All", ...CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter destinations by category">
      {options.map((opt) => {
        const active = opt === value;
        const count = counts?.[opt];
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              active
                ? "border-transparent bg-accent text-accent-foreground shadow-glow"
                : "border-border bg-card/60 text-muted-foreground hover:border-accent/50 hover:text-foreground",
            )}
          >
            {opt}
            {typeof count === "number" ? <span className="ml-2 text-xs opacity-70">{count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

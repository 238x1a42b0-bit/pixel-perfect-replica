import { Link } from "@tanstack/react-router";
import { Compass, Heart, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/countries", label: "Countries" },
  { to: "/destinations", label: "Destinations" },
  { to: "/favorites", label: "Favorites" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand">
            <Compass className="h-5 w-5 text-accent-foreground" />
          </span>
          <span className="truncate text-lg font-bold tracking-tight">
            Explore<span className="text-accent">World</span>
          </span>
        </Link>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-accent" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            type="button"
            aria-label="Toggle search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>
          <Link
            to="/favorites"
            aria-label="Favorites"
            className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((m) => !m)}
            className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {searchOpen ? (
        <div className="border-t border-border/60 bg-background/95 px-4 py-3 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <SearchBar autoFocus onNavigate={() => setSearchOpen(false)} />
          </div>
        </div>
      ) : null}

      {menuOpen ? (
        <ul className="border-t border-border/60 bg-background px-4 py-2 md:hidden">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-accent" }}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-secondary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}

import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero.jpg";
import { CountrySelector } from "./CountrySelector";

export function Hero() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const explore = () => {
    if (!code) {
      setError(true);
      return;
    }
    navigate({ to: "/country/$code", params: { code } });
  };

  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImage}
        alt="Coastal mountain road at sunset"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-overlay" aria-hidden="true" />

      <div className="mx-auto flex min-h-[38rem] max-w-5xl flex-col justify-center px-4 py-24 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">ExploreWorld</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Discover the World, One Place at a Time
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Choose a country and explore its most beautiful destinations, attractions and experiences.
        </p>

        <div className="mt-10 max-w-2xl rounded-[1.75rem] border border-border/70 bg-background/70 p-3 shadow-soft backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="min-w-0 flex-1">
              <CountrySelector
                value={code}
                onChange={(c) => {
                  setCode(c);
                  setError(false);
                }}
              />
            </div>
            <button
              type="button"
              onClick={explore}
              className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-brand px-8 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              Explore Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {error ? (
            <p role="alert" className="px-4 pb-1 pt-3 text-sm text-destructive">
              Please pick a country first.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

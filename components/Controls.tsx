"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import { navLinks, profile } from "@/lib/content";
import { t } from "@/lib/i18n";
import { lenisRef } from "@/components/Motion";

// The "signal W" brand mark: a pulse that spells W, ending in a dot.
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 10l5 13 6-10 6 10 4-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="26" cy="9" r="2.4" className="mark__dot" />
    </svg>
  );
}

export function Controls() {
  const [open, setOpen] = useState(false);

  const setMenu = (next: boolean) => {
    setOpen(next);
    if (next) lenisRef.current?.stop();
    else lenisRef.current?.start();
  };


  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    // Circular wipe from the button; falls back to an instant swap.
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
    root.style.setProperty("--vt-x", `${e.clientX}px`);
    root.style.setProperty("--vt-y", `${e.clientY}px`);
    document.startViewTransition(apply);
  };

  return (
    <header className="nav" data-nav>
      <a href="#top" className="nav__brand" aria-label={profile.name}>
        <Mark className="nav__mark" />
        <span className="nav__name">{profile.name}</span>
      </a>

      <nav className="nav__links" aria-label="Primary">
        {navLinks.map((link, i) => (
          <a key={link.href} href={link.href} data-nav-link={link.href.slice(1)}>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            {t.navigation[i]}
          </a>
        ))}
      </nav>

      <div className="nav__actions">
        <button type="button" className="chip chip--icon" onClick={toggleTheme} aria-label={t.toggleTheme} title={t.toggleTheme}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
            <path className="theme-half" d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
          </svg>
        </button>
        <a href={profile.cvUrl} download className="chip chip--accent nav__cv">
          {t.downloadCv}
        </a>
        <button
          type="button"
          className="chip nav__burger"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setMenu(!open)}
        >
          {open ? t.close : t.menu}
        </button>
      </div>

      <div id="menu" className="menu" data-open={open} inert={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a key={link.href} href={link.href} onClick={() => setMenu(false)} style={{ "--i": i } as CSSProperties}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              {t.navigation[i]}
            </a>
          ))}
        </nav>
        <a href={profile.cvUrl} download className="btn btn--solid">
          {t.downloadCv}
        </a>
      </div>
    </header>
  );
}

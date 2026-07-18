'use client';

export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__orb ambient__orb--a" />
      <div className="ambient__orb ambient__orb--b" />
      <div className="ambient__orb ambient__orb--c" />
      <div className="ambient__grid" />
      <div className="ambient__scan" />
      <div className="ambient__vignette" />
    </div>
  );
}

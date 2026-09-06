/* eslint-disable @next/next/no-img-element */

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <span className={`vx-brand${compact ? " vx-brand--compact" : ""}`}>
      <img
        className="vx-brand-logo"
        src="/assets/brand/digital-solutions-logo.jpg"
        alt="Digital Solutions — Smart Solutions, Digital Growth"
      />
    </span>
  );
}

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <span className={`vx-brand${compact ? " vx-brand--compact" : ""}`} aria-label="Digital Solutions">
      <span className="vx-brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="vx-brand-word">
        <strong>Digital</strong>
        {!compact && <small>Solutions</small>}
      </span>
    </span>
  );
}

export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-card border border-dashed border-brand-blue/20 bg-brand-mist/50 p-12 text-center">
      <h3 className="font-display text-lg font-bold text-brand-blue">{title}</h3>
      {description && <p className="mt-2 text-sm text-brand-ink/60">{description}</p>}
    </div>
  );
}
const STYLES = {
  pending:    'bg-yellow-50 text-yellow-700',
  reviewing:  'bg-blue-50 text-blue-700',
  contacted:  'bg-purple-50 text-purple-700',
  booked:     'bg-green-50 text-green-700',
  closed:     'bg-brand-mist text-brand-ink/50',
};

export default function StatusBadge({ status }) {
  return (
    <span className={'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ' + (STYLES[status] || STYLES.closed)}>
      {status}
    </span>
  );
}
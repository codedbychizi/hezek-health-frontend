import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownEditor({ value, onChange, rows = 20 }) {
  const [tab, setTab] = useState('write'); // 'write' | 'preview'

  return (
    <div className="overflow-hidden rounded-xl border border-brand-blue/20">
      {/* Tab bar */}
      <div className="flex border-b border-brand-blue/10 bg-brand-mist">
        {['write', 'preview'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? 'border-b-2 border-brand-teal bg-white text-brand-blue'
                : 'text-brand-ink/50 hover:text-brand-ink'
            }`}
          >
            {t}
          </button>
        ))}
        <span className="ml-auto px-4 py-2.5 text-xs text-brand-ink/40">Markdown supported</span>
      </div>

      {tab === 'write' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full bg-white p-4 font-mono text-sm text-brand-ink focus:outline-none"
          placeholder="Write your post in Markdown..."
        />
      ) : (
        <div className="prose-custom min-h-64 bg-white p-6">
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="text-sm text-brand-ink/40">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
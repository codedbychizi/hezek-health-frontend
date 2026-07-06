import { useState } from 'react';

export function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-card border border-brand-blue/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-brand-ink">{question}</span>
        <span className="ml-4 text-lg text-brand-teal">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="px-5 pb-5 text-sm text-brand-ink/70">{answer}</p>}
    </div>
  );
}
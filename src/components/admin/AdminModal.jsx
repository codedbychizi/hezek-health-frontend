import { X } from 'lucide-react';

/**
 * Generic modal shell used by every admin CRUD form.
 * Children render inside the white card — the form content,
 * save/cancel buttons, etc.
 */
export default function AdminModal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-ink/40 px-4 py-12">
      <div className="w-full max-w-lg rounded-card bg-white shadow-card-hover">
        <div className="flex items-center justify-between border-b border-brand-blue/10 px-6 py-4">
          <h2 className="font-display text-base font-bold text-brand-blue">{title}</h2>
          <button onClick={onClose} className="text-brand-ink/40 hover:text-brand-ink">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
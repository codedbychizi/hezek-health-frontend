const COMPANY_WHATSAPP = import.meta.env.VITE_COMPANY_WHATSAPP || '2347046502462';

export default function WhatsAppFloatButton() {
  return (
    <a
      href={`https://wa.me/${COMPANY_WHATSAPP}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Hezek Health on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white shadow-card-hover transition-transform hover:scale-105"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.74 13.42L3 21l3.69-1.27A8.93 8.93 0 0 0 12.06 21h.01A8.94 8.94 0 0 0 21 12.07a8.86 8.86 0 0 0-3.4-5.75ZM12.06 19.4a7.34 7.34 0 0 1-3.74-1.03l-.27-.16-2.78.96.94-2.71-.18-.28a7.39 7.39 0 0 1 11.6-9.04 7.32 7.32 0 0 1 2.18 5.21A7.4 7.4 0 0 1 12.06 19.4Zm4.06-5.54c-.22-.11-1.31-.65-1.51-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.11-.92-.34-1.75-1.08-.65-.58-1.08-1.29-1.21-1.51-.13-.22-.01-.34.11-.45.11-.11.25-.28.37-.43.13-.15.17-.25.25-.42.08-.16.04-.3-.04-.42-.08-.11-.5-1.2-.69-1.65-.18-.43-.37-.37-.5-.38h-.43c-.15 0-.39.06-.59.28-.2.22-.78.76-.78 1.84s.8 2.13.91 2.28c.11.15 1.5 2.29 3.64 3.13 1.82.72 2.19.58 2.59.54.4-.04 1.31-.53 1.49-1.05.18-.51.18-.95.13-1.04-.06-.1-.21-.15-.43-.26Z" />
      </svg>
    </a>
  );
}
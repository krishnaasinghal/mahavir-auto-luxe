const PHONE = "919927662233";
const MSG = "Hi, I'm interested in your premium car seat covers. Please share details.";

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MSG)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 py-3 text-white font-medium shadow-[0_20px_50px_-10px_rgba(37,211,102,0.5)] hover:scale-105 transition-transform animate-pulse-ring"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004c-1.96 0-3.882-.529-5.555-1.526L6.1 19.97l-3.694.968.985-3.6-.234-.367a9.85 9.85 0 01-1.51-5.26C1.652 6.18 6.328 1.5 12.072 1.5a10.32 10.32 0 017.378 3.058 10.32 10.32 0 013.06 7.382c-.003 5.745-4.68 10.42-10.42 10.42z"/></svg>
      <span className="hidden sm:inline">Get Instant Quote</span>
    </a>
  );
}

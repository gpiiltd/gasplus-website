import { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useComingSoon } from '../context/ComingSoonContext';

export const ComingSoonModal: React.FC = () => {
  const { open, closeModal } = useComingSoon();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) return;

    const raf = requestAnimationFrame(() => setVisible(true));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      setVisible(false);
    };
  }, [open, closeModal]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={closeModal}
    >
      <div
        className={`relative w-full max-w-sm bg-white rounded-2xl p-8 text-center shadow-2xl transition-all duration-300 ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="w-14 h-14 rounded-full bg-[#EAF4F7] flex items-center justify-center mx-auto mb-5">
          <Sparkles size={22} className="text-[#3D88A6]" />
        </div>

        <h3 className="font-display font-semibold text-[#0f1117] text-lg tracking-wide mb-2">
          Coming soon
        </h3>
        <p className="font-display text-gray-500 text-sm tracking-wide leading-relaxed mb-6">
          We're putting the finishing touches on this. Check back shortly —
          we can't wait to show you what's next.
        </p>

        <button
          onClick={closeModal}
          className="inline-flex items-center justify-center gap-2 bg-[#3D88A6] hover:bg-[#316D85] text-white font-display text-sm tracking-wide font-medium rounded-full px-6 py-2.5 transition-colors cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

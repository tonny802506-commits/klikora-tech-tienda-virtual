import React from 'react';
import { useCart } from '../context/CartContext';
import { Info, Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#14213D] text-white shadow-xl border border-white/10 text-xs font-semibold max-w-sm">
        <div className="w-5 h-5 rounded-full bg-[#09B6A2] text-[#14213D] flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        </div>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

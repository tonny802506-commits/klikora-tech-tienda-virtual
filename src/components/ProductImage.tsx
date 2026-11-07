import React, { useState } from 'react';
import { Product } from '../types/store';
import { 
  Laptop, 
  Headphones, 
  Zap, 
  Briefcase, 
  Mouse, 
  Keyboard, 
  Speaker, 
  Mic, 
  Smartphone, 
  Cable, 
  BatteryCharging, 
  Video, 
  Lightbulb, 
  SlidersHorizontal,
  Package
} from 'lucide-react';

interface ProductImageProps {
  product: Product;
  className?: string;
  aspect?: '4/3' | '1/1' | '16/9';
}

export const ProductImage: React.FC<ProductImageProps> = ({ 
  product, 
  className = '',
  aspect = '4/3' 
}) => {
  const [imageError, setImageError] = useState(false);

  // Selector de icono representativo según SKU
  const getProductIcon = () => {
    switch (product.sku) {
      case 'KT001': return Mouse;
      case 'KT002': return Keyboard;
      case 'KT003': return SlidersHorizontal;
      case 'KT004': return Package;
      case 'KT005': return Laptop;
      case 'KT006': return SlidersHorizontal;
      case 'KT007': return Headphones;
      case 'KT008': return Headphones;
      case 'KT009': return Mic;
      case 'KT010': return Speaker;
      case 'KT011': return Zap;
      case 'KT012': return Cable;
      case 'KT013': return BatteryCharging;
      case 'KT014': return Laptop;
      case 'KT015': return Zap;
      case 'KT016': return Lightbulb;
      case 'KT017': return Cable;
      case 'KT018': return Laptop;
      case 'KT019': return Video;
      case 'KT020': return Smartphone;
      default:
        if (product.category === 'Periféricos') return Mouse;
        if (product.category === 'Audio') return Headphones;
        if (product.category === 'Carga y conexión') return Zap;
        return Briefcase;
    }
  };

  const IconComponent = getProductIcon();

  const aspectClass = aspect === '1/1' ? 'aspect-square' : aspect === '16/9' ? 'aspect-video' : 'aspect-4/3';

  // Si tiene imagen asignada y no falló
  if (product.image && !imageError) {
    return (
      <div className={`relative overflow-hidden bg-slate-100 ${aspectClass} ${className}`}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback con ilustración gráfica vectorial estilizada y tonos de la marca
  return (
    <div 
      className={`relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200/80 border-b border-slate-200/60 text-[#14213D] ${aspectClass} ${className}`}
      aria-label={`Ilustración de ${product.name}`}
    >
      {/* Círculo concéntrico sutil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-32 h-32 rounded-full border border-[#09B6A2]/20"></div>
        <div className="absolute w-48 h-48 rounded-full border border-[#14213D]/10"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-[#14213D] mb-2.5 transition-transform group-hover:scale-110">
          <IconComponent className="w-7 h-7 text-[#09B6A2]" strokeWidth={1.8} />
        </div>
        <span className="text-xs font-semibold text-slate-800 line-clamp-1 max-w-[200px]">
          {product.name}
        </span>
        <span className="text-[11px] text-slate-500 font-mono mt-0.5">
          {product.sku}
        </span>
      </div>

      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-200/80 text-slate-600">
        Ilustración
      </div>
    </div>
  );
};

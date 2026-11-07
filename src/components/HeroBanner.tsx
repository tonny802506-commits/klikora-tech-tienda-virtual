import React from 'react';
import { ArrowRight, Truck, Laptop, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { STORE_CONFIG, formatCurrency } from '../config/storeConfig';

export const HeroBanner: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Encontrar el producto destacado solicitado en el prompt: KT005 (Soporte de laptop ajustable)
  const laptopStandProduct = PRODUCTS.find((p) => p.sku === 'KT005');

  const handleAddHeroProduct = () => {
    if (laptopStandProduct) {
      addToCart(laptopStandProduct);
      setIsCartOpen(true);
    }
  };

  return (
    <section id="inicio" className="relative bg-[#14213D] text-white overflow-hidden">
      {/* Patrón de fondo geométrico sutil */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#09B6A2] blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline / Subtítulo sobrio */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-[#09B6A2] text-xs font-semibold tracking-wide backdrop-blur-xs">
              <Sparkles className="w-4 h-4" />
              <span>{STORE_CONFIG.slogan}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Equipa tu espacio de <span className="text-[#09B6A2]">estudio y home office</span> en Perú.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Diseñado para universitarios, profesionales y personas que buscan confort, rendimiento y organización en su día a día. Catálogo de periféricos, audio y ergonomía con entrega en Lima Metropolitana.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#productos"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#09B6A2] hover:bg-[#078F7F] text-[#14213D] font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Explorar los 20 productos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {laptopStandProduct && (
                <button
                  type="button"
                  onClick={handleAddHeroProduct}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm sm:text-base transition-all active:scale-95"
                >
                  <Laptop className="w-4 h-4 text-[#09B6A2]" />
                  <span>Pedir soporte laptop ({formatCurrency(laptopStandProduct.price)})</span>
                </button>
              )}
            </div>

            {/* Micro-especificaciones / Puntos clave */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
              <div>
                <p className="text-xs text-slate-400">Envío en Lima</p>
                <p className="text-sm font-bold text-white tabular-nums">S/ 12.90 fijo</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Envío gratis</p>
                <p className="text-sm font-bold text-[#09B6A2] tabular-nums">Desde S/ 199</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Stock activo</p>
                <p className="text-sm font-bold text-white tabular-nums">4 categorías</p>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Fotografía / Ilustración del Soporte Ajustable de Laptop */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900/50 backdrop-blur-xs group">
              <img
                src="/src/assets/images/hero_laptop_stand_workspace_1794062553849.jpg"
                alt="Espacio de trabajo moderno con soporte ajustable para laptop y periféricos ergonómicos"
                className="w-full h-80 sm:h-96 object-cover object-center transform transition-transform duration-500 group-hover:scale-102"
                loading="eager"
              />
              
              {/* Tarjeta flotante informativa sobre el producto estrella */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#14213D]/90 backdrop-blur-md border border-white/20 flex items-center justify-between text-left">
                <div>
                  <div className="text-[11px] font-semibold text-[#09B6A2] uppercase tracking-wider">
                    Producto Destacado
                  </div>
                  <div className="text-sm font-bold text-white">
                    Soporte de laptop ajustable (KT005)
                  </div>
                  <div className="text-xs text-slate-300">
                    Mejora la postura cervical en tus jornadas
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <div className="text-base font-extrabold text-[#09B6A2] font-mono tabular-nums">
                    S/ 119.90
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    16 en stock
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

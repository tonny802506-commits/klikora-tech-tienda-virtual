import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/storeConfig';

export const Header: React.FC = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zona 1: Identidad de Marca (Logo y Wordmark en una sola línea) */}
          <a 
            href="#inicio" 
            className="flex items-center gap-2.5 text-slate-900 group whitespace-nowrap shrink-0"
            aria-label="Ir al inicio de KLIKORA TECH"
          >
            <div className="w-9 h-9 rounded-xl bg-[#14213D] flex items-center justify-center text-[#09B6A2] shadow-sm transition-transform group-hover:scale-105">
              <svg 
                className="w-5 h-5 fill-current" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#14213D] leading-none">
                KLIKORA <span className="text-[#09B6A2]">TECH</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                Perú · Lima
              </span>
            </div>
          </a>

          {/* Zona 2: Enlaces de navegación */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a 
              href="#inicio" 
              className="hover:text-[#14213D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#09B6A2]"
            >
              Inicio
            </a>
            <a 
              href="#productos" 
              className="hover:text-[#14213D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#09B6A2]"
            >
              Productos
            </a>
            <a 
              href="#beneficios" 
              className="hover:text-[#14213D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#09B6A2]"
            >
              Beneficios
            </a>
            <a 
              href="#contacto" 
              className="hover:text-[#14213D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#09B6A2]"
            >
              Contacto
            </a>
          </nav>

          {/* Zona 3: Acción Principal (Carrito de Compras con contador y disparador móvil) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Ver carrito de compras con ${totalItemsCount} productos`}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#14213D] hover:bg-[#1E2E54] active:scale-95 text-white text-sm font-semibold transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#09B6A2]"
            >
              <ShoppingCart className="w-4 h-4 text-[#09B6A2]" />
              <span className="hidden sm:inline">Carrito</span>
              <span className="flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold bg-[#09B6A2] text-[#14213D] rounded-full tabular-nums">
                {totalItemsCount}
              </span>
            </button>

            {/* Menú móvil desplegable */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#09B6A2]"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Drawer de navegación móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Inicio
            </a>
            <a
              href="#productos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Productos (20 disponibles)
            </a>
            <a
              href="#beneficios"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Beneficios
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Contacto
            </a>
          </div>
        )}
      </header>
    </>
  );
};

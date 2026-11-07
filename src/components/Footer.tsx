import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldAlert, 
  ExternalLink,
  Laptop
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-[#14213D] text-white border-t border-slate-800">
      
      {/* Zona principal del pie */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Columna 1: Marca y Propósito (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#09B6A2] flex items-center justify-center text-[#14213D] font-bold">
                <Laptop className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                KLIKORA <span className="text-[#09B6A2]">TECH</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              «{STORE_CONFIG.slogan}». Soluciones prácticas en periféricos, audio, ergonomía y carga para estudiantes universitarios y trabajadores remotos en Perú.
            </p>

            {/* Aviso de redes sociales temporales */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Redes Sociales (Configuración centralizada)
              </div>
              
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href={STORE_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de KLIKORA TECH (temporal)"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#09B6A2] hover:text-[#14213D] flex items-center justify-center text-slate-300 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href={STORE_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de KLIKORA TECH (temporal)"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#09B6A2] hover:text-[#14213D] flex items-center justify-center text-slate-300 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* TikTok (con SVG oficial para máxima nitidez) */}
                <a
                  href={STORE_CONFIG.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok de KLIKORA TECH (temporal)"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#09B6A2] hover:text-[#14213D] flex items-center justify-center text-slate-300 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>

              <p className="text-[11px] text-slate-400 mt-2 italic">
                {STORE_CONFIG.socialNote}
              </p>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#09B6A2]">
              Navegación
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Inicio & Banner principal
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-white transition-colors">
                  Catálogo completo (20 productos)
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-white transition-colors">
                  Beneficios y ergonomía
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">
                  Información de contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto & Demostración (Col 4) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#09B6A2]">
              Contacto & Despachos
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#09B6A2] shrink-0 mt-0.5" />
                <span>Lima Metropolitana y Callao, {STORE_CONFIG.country}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#09B6A2] shrink-0 mt-0.5" />
                <a href={`mailto:${STORE_CONFIG.contactEmail}`} className="hover:text-white transition-colors">
                  {STORE_CONFIG.contactEmail}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#09B6A2] shrink-0 mt-0.5" />
                <span>
                  WhatsApp comercial: <em className="text-slate-400">Pendiente de asignación oficial</em>
                </span>
              </div>
            </div>

            {/* Cuadro aclaratorio de demostración */}
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 leading-relaxed">
              <span className="font-semibold text-[#09B6A2] block mb-0.5">
                Proyecto Académico Demostrativo
              </span>
              Este sitio no tramita cobros con tarjetas ni ventas con valor fiscal. Todos los pedidos son simulaciones locales de preparación de orden.
            </div>
          </div>

        </div>

        {/* Separador inferior */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {STORE_CONFIG.brandName}. Todos los derechos reservados.
          </div>
          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            Desarrollo web para fines académicos · React + Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

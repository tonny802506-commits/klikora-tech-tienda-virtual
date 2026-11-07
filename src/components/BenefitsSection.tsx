import React from 'react';
import { Laptop, Zap, Truck, ShieldCheck, HeartHandshake, Headphones } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Laptop,
      title: 'Ergonomía para estudio y home office',
      description: 'Accesorios como nuestro soporte ajustable de laptop (KT005) y elevadores que cuidan tu postura cervical en jornadas intensivas de estudio o trabajo remoto.'
    },
    {
      icon: Headphones,
      title: 'Audio claro y videollamadas nítidas',
      description: 'Audífonos inalámbricos y micrófonos dedicados para participar en clases virtuales, reuniones de equipo o concentrarte con tu música preferida.'
    },
    {
      icon: Zap,
      title: 'Conexión y carga rápida asegurada',
      description: 'Hubs USB-C multifunción, cargadores rápidos de 30W y cables reforzados para mantener tus equipos siempre listos y conectados a monitores externos.'
    },
    {
      icon: Truck,
      title: 'Cobertura en Lima Metropolitana',
      description: `Tarifa referencial fija de S/ ${STORE_CONFIG.shippingFeeLima.toFixed(2)} para distritos de Lima y Callao, con envío gratuito garantizado en pedidos desde S/ ${STORE_CONFIG.freeShippingThreshold.toFixed(2)}.`
    },
    {
      icon: ShieldCheck,
      title: 'Catálogo curado y seleccionado',
      description: '20 productos estratégicos probados para resistir el uso diario universitario y profesional sin saturar tu mesa de trabajo.'
    },
    {
      icon: HeartHandshake,
      title: 'Atención personalizada y directa',
      description: 'Coordinación fluida del pedido con resumen itemizado claro, sin letras pequeñas ni sorpresas al momento de la entrega.'
    }
  ];

  return (
    <section id="beneficios" className="bg-slate-100/70 border-t border-slate-200/80 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#09B6A2] uppercase tracking-wider">
            ¿Por qué elegir KLIKORA TECH?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] mt-1.5">
            Tecnología pensada para tu día a día
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Sabemos lo exigente que es pasar horas estudiando o trabajando frente a la pantalla. Cada accesorio de nuestro catálogo responde a una necesidad real de comodidad, conectividad y durabilidad.
          </p>
        </div>

        {/* Grid de beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#09B6A2] mb-4">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

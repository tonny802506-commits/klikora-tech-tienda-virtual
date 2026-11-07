import React from 'react';
import { Info, CheckCircle2, ShieldX } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const AcademicDisclaimer: React.FC = () => {
  return (
    <div className="bg-slate-100/80 border-y border-slate-200 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Aviso de Demostración Académica
            </h2>
            <p className="mt-0.5 leading-relaxed text-slate-600">
              {STORE_CONFIG.academicNotice} Las existencias, precios y comprobantes generados son exclusivamente referenciales para evaluar la experiencia de usuario y arquitectura del software.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 font-medium text-slate-700">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#09B6A2]" />
            Catálogo 100% operativo
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldX className="w-4 h-4 text-slate-500" />
            Sin cobros ni pasarela
          </span>
        </div>
      </div>
    </div>
  );
};

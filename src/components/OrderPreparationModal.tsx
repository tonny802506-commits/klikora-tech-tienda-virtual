import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  MessageSquare, 
  AlertTriangle, 
  Truck, 
  FileText, 
  User, 
  MapPin, 
  Phone, 
  ArrowLeft 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG, formatCurrency } from '../config/storeConfig';

export const OrderPreparationModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    items, 
    subtotal, 
    shippingFee, 
    total, 
    hasFreeShipping,
    setIsCartOpen 
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [district, setDistrict] = useState(STORE_CONFIG.districts[0]);
  const [customDistrict, setCustomDistrict] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [hasGeneratedSummary, setHasGeneratedSummary] = useState(false);

  if (!isCheckoutOpen) return null;

  const effectiveDistrict = district === 'Otro distrito de Lima Metropolitana' 
    ? (customDistrict.trim() || 'Lima Metropolitana') 
    : district;

  // Formatear texto del resumen para portapapeles y WhatsApp
  const generateSummaryText = () => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('es-PE')} ${now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
    
    let text = `=================================\n`;
    text += `KLIKORA TECH · RESUMEN DE PEDIDO\n`;
    text += `«${STORE_CONFIG.slogan}»\n`;
    text += `(Demostración Académica - Sin Cobro Real)\n`;
    text += `=================================\n`;
    text += `Fecha: ${formattedDate}\n`;
    text += `Cliente: ${customerName.trim() || 'Cliente Demostración'}\n`;
    text += `Distrito: ${effectiveDistrict}, Lima, ${STORE_CONFIG.country}\n`;
    if (contactPhone.trim()) {
      text += `Teléfono de contacto: ${contactPhone.trim()}\n`;
    }
    if (notes.trim()) {
      text += `Referencia / Notas: ${notes.trim()}\n`;
    }
    text += `\nDETALLE DE PRODUCTOS:\n`;

    items.forEach(({ product, quantity }) => {
      const itemSubtotal = formatCurrency(product.price * quantity);
      text += `• [${product.sku}] ${product.name} (Cant: ${quantity}) - ${itemSubtotal}\n`;
    });

    text += `---------------------------------\n`;
    text += `Subtotal: ${formatCurrency(subtotal)}\n`;
    text += `Envío Lima Metropolitana: ${hasFreeShipping ? 'GRATIS (Supera S/ 199.00)' : formatCurrency(shippingFee)}\n`;
    text += `TOTAL A COORDINAR: ${formatCurrency(total)}\n`;
    text += `=================================\n`;
    text += `* AVISO IMPORTANTE: Este resumen corresponde a una demostración académica. No representa una transacción pagada ni formalizada como venta comercial real.`;

    return text;
  };

  const handleCopySummary = async () => {
    const text = generateSummaryText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setHasGeneratedSummary(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error('Error al copiar el texto', err);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!STORE_CONFIG.whatsappNumber) return;
    const text = generateSummaryText();
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isFormValid = customerName.trim().length >= 2;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-prep-title"
    >
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Encabezado del Modal */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsCartOpen(true);
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              aria-label="Volver al carrito"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 id="order-prep-title" className="text-lg font-bold text-slate-900">
                Preparación del Pedido
              </h2>
              <p className="text-xs text-slate-500">
                Ingresa tus datos para generar la cotización y coordinar la entrega.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Cerrar preparación del pedido"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del formulario y resumen */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Advertencia académica obligatoria */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Demostración Académica</strong>
              <span>
                Esta pantalla prepara un resumen para coordinación. No se realiza ningún cobro monetario, no se solicita tarjeta de crédito ni se confirma una venta comercial real.
              </span>
            </div>
          </div>

          {/* Formulario de Datos Locales del Cliente */}
          <div className="space-y-4 bg-slate-50/60 p-4 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-[#09B6A2]" />
              <span>Datos del destinatario (almacenamiento local)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nombre Completo */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nombre completo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#09B6A2] focus:ring-1 focus:ring-[#09B6A2] bg-white"
                />
              </div>

              {/* Teléfono opcional */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Teléfono de contacto (opcional)
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Ej. 987 654 321"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#09B6A2] focus:ring-1 focus:ring-[#09B6A2] bg-white"
                />
              </div>
            </div>

            {/* Distrito de Lima */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#09B6A2]" />
                <span>Distrito de entrega en Lima Metropolitana</span>
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#09B6A2] focus:ring-1 focus:ring-[#09B6A2] bg-white cursor-pointer"
              >
                {STORE_CONFIG.districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {district === 'Otro distrito de Lima Metropolitana' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Especifica tu distrito:
                </label>
                <input
                  type="text"
                  value={customDistrict}
                  onChange={(e) => setCustomDistrict(e.target.value)}
                  placeholder="Escribe el nombre de tu distrito"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#09B6A2] focus:ring-1 focus:ring-[#09B6A2] bg-white"
                />
              </div>
            )}

            {/* Referencia o Notas */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Referencia de domicilio o notas para la entrega
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Cerca a la estación del Metropolitano / Piso 4"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#09B6A2] focus:ring-1 focus:ring-[#09B6A2] bg-white"
              />
            </div>
          </div>

          {/* Resumen de Productos y Totales */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#09B6A2]" />
              <span>Resumen de artículos ({items.length} productos)</span>
            </h3>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto text-xs pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.sku} className="py-2 flex items-center justify-between">
                  <div className="flex-1 pr-2">
                    <span className="font-mono text-slate-400 mr-1.5">[{product.sku}]</span>
                    <span className="font-semibold text-slate-800">{product.name}</span>
                    <span className="text-slate-500 font-mono ml-1.5">x {quantity}</span>
                  </div>
                  <div className="font-mono font-bold text-slate-900 tabular-nums">
                    {formatCurrency(product.price * quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tarifa de envío ({effectiveDistrict}):</span>
                <span className={`font-mono font-bold tabular-nums ${hasFreeShipping ? 'text-[#078F7F]' : 'text-slate-900'}`}>
                  {hasFreeShipping ? 'GRATIS (Supera S/ 199.00)' : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-[#14213D]">
                <span>Total a coordinar:</span>
                <span className="font-mono tabular-nums text-base text-[#14213D]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Opciones de Envío / Copiado del Pedido */}
          <div className="space-y-3 pt-2">
            
            {/* Si no hay WhatsApp oficial configurado */}
            {!STORE_CONFIG.whatsappNumber ? (
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-800 block mb-0.5">WhatsApp comercial pendiente</strong>
                  <span>
                    El número de WhatsApp oficial está pendiente de asignación institucional. Puedes generar y copiar el resumen completo con un clic:
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  disabled={!isFormValid}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-98 ${
                    isFormValid
                      ? isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#14213D] hover:bg-[#1E2E54] text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>¡Resumen copiado al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#09B6A2]" />
                      <span>Copiar resumen al portapapeles</span>
                    </>
                  )}
                </button>

                {!isFormValid && (
                  <p className="text-[11px] text-amber-700 text-center">
                    Ingresa tu nombre arriba para habilitar la copia del resumen.
                  </p>
                )}
              </div>
            ) : (
              /* Si el WhatsApp estuviera configurado */
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  disabled={!isFormValid}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md active:scale-98 disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar pedido por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  disabled={!isFormValid}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isCopied ? '¡Copiado!' : 'Copiar texto del resumen'}</span>
                </button>
              </div>
            )}

            {hasGeneratedSummary && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  El resumen fue generado con éxito con los {items.length} productos y el total de {formatCurrency(total)}.
                </span>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

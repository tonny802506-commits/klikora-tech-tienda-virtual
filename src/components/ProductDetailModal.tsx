import React, { useState } from 'react';
import { X, ShoppingCart, Check, AlertCircle, Shield, Truck, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';
import { formatCurrency, STORE_CONFIG } from '../config/storeConfig';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductForDetail, 
    setSelectedProductForDetail, 
    addToCart, 
    items,
    setIsCartOpen 
  } = useCart();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const cartItem = items.find((i) => i.product.sku === product.sku);
  const currentInCart = cartItem ? cartItem.quantity : 0;
  const availableToAdd = Math.max(0, product.stock - currentInCart);

  const handleAdd = () => {
    if (availableToAdd <= 0) return;
    const qtyToAdd = Math.min(quantity, availableToAdd);
    addToCart(product, qtyToAdd);
    setSelectedProductForDetail(null);
    setIsCartOpen(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={() => setSelectedProductForDetail(null)}
          aria-label="Cerrar ventana de detalle de producto"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-slate-100 text-slate-600 transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Imagen / Ilustración grande */}
          <div className="bg-slate-100 relative min-h-[260px] md:min-h-full">
            <ProductImage product={product} aspect="1/1" className="h-full w-full" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#14213D] text-white">
                {product.category}
              </span>
              {product.isFeatured && (
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#09B6A2] text-[#14213D]">
                  Destacado
                </span>
              )}
            </div>
          </div>

          {/* Información y Compra */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-500 mb-1">
                SKU: <strong className="text-slate-700">{product.sku}</strong>
              </div>

              <h2 id="modal-product-title" className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h2>

              <div className="mt-3 text-2xl font-extrabold text-[#14213D] font-mono tabular-nums">
                {formatCurrency(product.price)}
              </div>

              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Atributos / Beneficios del producto */}
              <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#09B6A2]" />
                  <span>Existencia disponible: <strong className="text-slate-800 font-mono tabular-nums">{product.stock} unidades</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#09B6A2]" />
                  <span>Despacho referencial: S/ 12.90 en Lima (Gratis desde S/ 199.00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#09B6A2]" />
                  <span>Garantía de calidad y atención técnica KLIKORA TECH</span>
                </div>
              </div>
            </div>

            {/* Selector de cantidad y botón */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              {product.stock <= 0 ? (
                <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Producto actualmente agotado.
                </div>
              ) : availableToAdd <= 0 ? (
                <div className="p-3 bg-amber-50 text-amber-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Ya tienes en el carrito el stock máximo disponible ({product.stock} unidades).
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span className="font-medium">Seleccionar cantidad:</span>
                    <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-xs font-mono font-bold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(availableToAdd, q + 1))}
                        disabled={quantity >= availableToAdd}
                        className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#14213D] hover:bg-[#1E2E54] text-white font-semibold text-sm transition-all shadow-md active:scale-98"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#09B6A2]" />
                    <span>Añadir {quantity} al carrito · {formatCurrency(product.price * quantity)}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

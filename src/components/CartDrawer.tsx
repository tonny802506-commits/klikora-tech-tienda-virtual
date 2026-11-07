import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';
import { formatCurrency, STORE_CONFIG } from '../config/storeConfig';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    shippingFee, 
    total, 
    hasFreeShipping, 
    freeShippingRemaining,
    totalItemsCount,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / STORE_CONFIG.freeShippingThreshold) * 100)
  );

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
      >
        {/* Cabecera del Carrito */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#14213D] flex items-center justify-center text-[#09B6A2]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 id="cart-title" className="text-base font-bold text-slate-900 leading-tight">
                Tu Carrito de Compras
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                {totalItemsCount} {totalItemsCount === 1 ? 'artículo' : 'artículos'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito de compras"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de progreso de envío gratis */}
        <div className="p-4 bg-teal-50/50 border-b border-teal-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1.5">
            <span className="flex items-center gap-1.5 text-[#078F7F]">
              <Truck className="w-4 h-4" />
              {hasFreeShipping ? (
                <span>¡Envío gratis desbloqueado en Lima Metropolitana!</span>
              ) : (
                <span>Faltan {formatCurrency(freeShippingRemaining)} para envío gratis</span>
              )}
            </span>
            <span className="font-mono text-slate-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-[#09B6A2] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lista de productos en el carrito */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-800">El carrito está vacío</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                  Agrega accesorios de trabajo o estudio desde el catálogo para preparar tu pedido.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#14213D] text-white text-xs font-bold hover:bg-[#1E2E54] transition-colors"
              >
                Explorar productos
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => {
              const isMaxStock = quantity >= product.stock;

              return (
                <div key={product.sku} className="py-4 flex gap-3 group">
                  {/* Miniatura */}
                  <div className="w-18 h-18 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <ProductImage product={product} aspect="1/1" />
                  </div>

                  {/* Datos del producto */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono text-slate-400 block">
                            {product.sku} · {product.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {product.name}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.sku)}
                          aria-label={`Eliminar ${product.name} del carrito`}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-mono font-bold text-[#14213D] mt-1 tabular-nums">
                        {formatCurrency(product.price)} c/u
                      </div>
                    </div>

                    {/* Stepper de cantidad y stock */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.sku, quantity - 1)}
                          aria-label="Disminuir cantidad"
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-0.5 text-xs font-mono font-bold text-slate-800 tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.sku, quantity + 1)}
                          disabled={isMaxStock}
                          aria-label="Aumentar cantidad"
                          className={`px-2.5 py-1 text-slate-600 transition-colors ${
                            isMaxStock 
                              ? 'opacity-30 cursor-not-allowed bg-slate-100' 
                              : 'hover:bg-slate-100'
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Subtotal item</span>
                        <span className="text-xs font-extrabold text-slate-900 font-mono tabular-nums">
                          {formatCurrency(product.price * quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Alerta de stock máximo si aplica */}
                    {isMaxStock && (
                      <div className="mt-1 text-[11px] text-amber-700 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>Stock máximo alcanzado ({product.stock} unid.)</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Resumen inferior y Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal ({totalItemsCount} unid.):</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Envío referencial Lima:</span>
                <span className={`font-mono font-bold tabular-nums ${hasFreeShipping ? 'text-[#078F7F]' : 'text-slate-900'}`}>
                  {hasFreeShipping ? 'GRATIS' : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm">
                <span className="font-extrabold text-[#14213D]">Total a coordinar:</span>
                <span className="text-base font-extrabold text-[#14213D] font-mono tabular-nums">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Aviso breve de no cobro real */}
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-800 text-[11px] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>Demostración académica · No se realizará ningún cobro monetario.</span>
            </div>

            {/* Acciones */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#09B6A2] hover:bg-[#078F7F] text-[#14213D] font-bold text-sm transition-all shadow-md active:scale-98"
              >
                <span>Preparar pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="w-full py-1.5 text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
              >
                Vaciar todo el carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

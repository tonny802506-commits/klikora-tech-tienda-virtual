import React from 'react';
import { ShoppingCart, Check, AlertCircle, Eye } from 'lucide-react';
import { Product } from '../types/store';
import { ProductImage } from './ProductImage';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../config/storeConfig';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items, setSelectedProductForDetail } = useCart();

  const cartItem = items.find((i) => i.product.sku === product.sku);
  const currentQuantityInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isMaxStockReached = currentQuantityInCart >= product.stock;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock || isMaxStockReached) return;
    addToCart(product, 1);
  };

  return (
    <article
      onClick={() => setSelectedProductForDetail(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Zona de Imagen / Ilustración con badge sutil de destacado si aplica */}
      <div className="relative overflow-hidden bg-slate-100">
        <ProductImage product={product} aspect="4/3" />

        {/* Destacado (Texto limpio en esquina, no pill sandwich) */}
        {product.isFeatured && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[11px] font-bold bg-[#14213D] text-white tracking-wide shadow-xs">
            Destacado
          </div>
        )}

        {/* Vista previa rápida al hover */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-xs font-semibold text-slate-800 shadow-md">
            <Eye className="w-3.5 h-3.5 text-[#09B6A2]" />
            Ver detalles
          </span>
        </div>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata sin pills: Categoría · SKU */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[#09B6A2]">
              {product.category}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-mono text-slate-600">{product.sku}</span>
          </div>

          {/* Nombre del producto */}
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#09B6A2] transition-colors">
            {product.name}
          </h3>

          {/* Descripción concisa */}
          <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-100">
          {/* Disponibilidad y Stock */}
          <div className="flex items-center justify-between text-xs mb-3">
            <div className="flex items-center gap-1">
              {isOutOfStock ? (
                <span className="text-rose-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Agotado
                </span>
              ) : isMaxStockReached ? (
                <span className="text-amber-700 font-medium text-[11px] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Máximo en carrito ({currentQuantityInCart}/{product.stock})
                </span>
              ) : (
                <span className="text-slate-600 font-medium">
                  Stock: <strong className="text-slate-800 tabular-nums font-mono">{product.stock}</strong> unid.
                </span>
              )}
            </div>

            {currentQuantityInCart > 0 && !isMaxStockReached && (
              <span className="text-[11px] text-[#09B6A2] font-semibold">
                {currentQuantityInCart} en carrito
              </span>
            )}
          </div>

          {/* Precio y Botón de acción */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                Precio
              </span>
              <span className="text-lg font-extrabold text-[#14213D] font-mono tabular-nums">
                {formatCurrency(product.price)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isMaxStockReached}
              aria-label={
                isOutOfStock
                  ? `Producto ${product.name} agotado`
                  : isMaxStockReached
                  ? `Stock máximo alcanzado para ${product.name}`
                  : `Agregar ${product.name} al carrito`
              }
              className={`inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-95 ${
                isOutOfStock
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : isMaxStockReached
                  ? 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200'
                  : 'bg-[#14213D] hover:bg-[#1E2E54] text-white shadow-xs hover:shadow-md'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#09B6A2]" />
              <span>
                {isOutOfStock ? 'Agotado' : isMaxStockReached ? 'Límite' : 'Agregar'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

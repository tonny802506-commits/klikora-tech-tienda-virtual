import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Sparkles, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { CategoryType, SortOption } from '../types/store';
import { ProductCard } from './ProductCard';

export const CatalogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  // Filtrado reactivo por categoría y búsqueda textual (nombre o descripción)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Filtro de categoría
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;

      // Filtro de texto por nombre, descripción o SKU
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Ordenamiento
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case 'featured':
        // Destacados primero, luego por SKU
        return list.sort((a, b) => {
          if (a.isFeatured === b.isFeatured) {
            return a.sku.localeCompare(b.sku);
          }
          return a.isFeatured ? -1 : 1;
        });
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
      default:
        return list;
    }
  }, [filteredProducts, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('Todos');
    setSearchQuery('');
    setSortOption('featured');
  };

  return (
    <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Título de la sección */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#09B6A2] uppercase tracking-wider">
            Catálogo Oficial
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] mt-1">
            Nuestros 20 Productos
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Equipamiento para trabajo remoto y estudio. Selecciona y añade al carrito.
          </p>
        </div>

        {/* Resumen de catálogo */}
        <div className="text-xs text-slate-600 bg-white border border-slate-200/80 rounded-xl px-4 py-2 self-start md:self-auto shadow-2xs">
          <span>Mostrando </span>
          <strong className="text-slate-900 font-mono tabular-nums">{sortedProducts.length}</strong>
          <span> de </span>
          <strong className="text-slate-900 font-mono tabular-nums">{PRODUCTS.length}</strong>
          <span> artículos</span>
        </div>
      </div>

      {/* Barra de Filtros, Búsqueda y Ordenamiento */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        
        {/* Fila 1: Pestañas de categoría (Botones interactivos limpios) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'Todos'
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#14213D] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <span>{cat}</span>
                <span className={`ml-1.5 text-[11px] font-mono tabular-nums ${isSelected ? 'text-[#09B6A2]' : 'text-slate-500'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Fila 2: Buscador y Selector de Orden */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          
          {/* Campo de búsqueda */}
          <div className="md:col-span-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, descripción o SKU (ej. «laptop», «mouse», «KT005»)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#09B6A2] focus:bg-white focus:ring-1 focus:ring-[#09B6A2] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Selector de ordenamiento */}
          <div className="md:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              aria-label="Ordenar productos"
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#09B6A2] focus:bg-white focus:ring-1 focus:ring-[#09B6A2] transition-colors appearance-none cursor-pointer"
            >
              <option value="featured">Destacados primero</option>
              <option value="price-asc">Precio: Menor a mayor</option>
              <option value="price-desc">Precio: Mayor a menor</option>
              <option value="name-asc">Nombre: A - Z</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>

        </div>

        {/* Notificación de búsqueda activa */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between text-xs text-slate-600 bg-teal-50/60 border border-[#09B6A2]/20 rounded-lg px-3 py-1.5">
            <span>
              Filtrando resultados que contienen: <strong>«{searchQuery}»</strong>
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#09B6A2] hover:underline font-semibold ml-2"
            >
              Quitar filtro
            </button>
          </div>
        )}
      </div>

      {/* Grid de Productos */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      ) : (
        /* Estado vacío si no hay coincidencias */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No se encontraron productos coincidentes
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            No hay ningún producto que coincida con «{searchQuery}» en la categoría «{selectedCategory}».
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#14213D] hover:bg-[#1E2E54] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>Restablecer filtros y ver los 20 productos</span>
          </button>
        </div>
      )}

    </section>
  );
};

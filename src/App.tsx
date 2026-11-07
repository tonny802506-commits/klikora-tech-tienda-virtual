import React from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CatalogSection } from './components/CatalogSection';
import { BenefitsSection } from './components/BenefitsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderPreparationModal } from './components/OrderPreparationModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        {/* Encabezado fijo con navegación y carrito */}
        <Header />

        {/* Contenido Principal */}
        <main className="flex-1">
          {/* Banner principal con soporte para laptop y llamada a explorar */}
          <HeroBanner />

          {/* Catálogo con los 20 productos obligatorios, 4 categorías, buscador y orden */}
          <CatalogSection />

          {/* Sección de beneficios para teletrabajo y estudio universitario */}
          <BenefitsSection />
        </main>

        {/* Pie de página con redes configurables y contacto */}
        <Footer />

        {/* Componentes modales y cajón lateral */}
        <CartDrawer />
        <ProductDetailModal />
        <OrderPreparationModal />
        <Toast />
      </div>
    </CartProvider>
  );
}

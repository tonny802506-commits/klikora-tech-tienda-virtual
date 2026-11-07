import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/store';
import { STORE_CONFIG } from '../config/storeConfig';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => { success: boolean; message: string };
  updateQuantity: (sku: string, quantity: number) => void;
  removeFromCart: (sku: string) => void;
  clearCart: () => void;
  subtotal: number;
  shippingFee: number;
  total: number;
  hasFreeShipping: boolean;
  freeShippingRemaining: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'klikora_tech_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Guardar en localStorage ante cualquier cambio
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [items]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3200);
  };

  const addToCart = (product: Product, quantityToAdd = 1): { success: boolean; message: string } => {
    if (product.stock <= 0) {
      showToast(`El producto «${product.name}» está agotado.`);
      return { success: false, message: 'Producto agotado' };
    }

    const existingIndex = items.findIndex((item) => item.product.sku === product.sku);
    const currentQty = existingIndex > -1 ? items[existingIndex].quantity : 0;
    const targetQty = currentQty + quantityToAdd;

    if (targetQty > product.stock) {
      const allowedAdd = product.stock - currentQty;
      if (allowedAdd <= 0) {
        showToast(`Stock máximo alcanzado (${product.stock} unid.) para «${product.name}».`);
        return { success: false, message: `Límite de stock alcanzado (${product.stock} unidades).` };
      }
      // Ajustar al máximo disponible
      setItems((prev) =>
        prev.map((item) =>
          item.product.sku === product.sku ? { ...item, quantity: product.stock } : item
        )
      );
      showToast(`Se ajustó al stock máximo de ${product.stock} unidades para «${product.name}».`);
      return { success: true, message: `Stock máximo alcanzado (${product.stock} unidades).` };
    }

    if (existingIndex > -1) {
      setItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: targetQty } : item
        )
      );
    } else {
      setItems((prev) => [...prev, { product, quantity: targetQty }]);
    }

    showToast(`Se añadió «${product.name}» al carrito (${targetQty} unid.)`);
    return { success: true, message: 'Agregado al carrito' };
  };

  const updateQuantity = (sku: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(sku);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product.sku === sku) {
          if (newQuantity > item.product.stock) {
            showToast(`No se pueden añadir más de ${item.product.stock} unidades de este producto.`);
            return { ...item, quantity: item.product.stock };
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (sku: string) => {
    setItems((prev) => {
      const removed = prev.find((i) => i.product.sku === sku);
      if (removed) {
        showToast(`Se eliminó «${removed.product.name}» del carrito`);
      }
      return prev.filter((item) => item.product.sku !== sku);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  // Cálculos precisos con centavos para evitar errores de redondeo de punto flotante
  const subtotalCents = items.reduce(
    (sum, item) => sum + Math.round(item.product.price * 100) * item.quantity,
    0
  );
  const subtotal = Math.round(subtotalCents) / 100;

  const freeShippingThresholdCents = Math.round(STORE_CONFIG.freeShippingThreshold * 100);
  const hasFreeShipping = subtotalCents >= freeShippingThresholdCents;
  
  const freeShippingRemainingCents = Math.max(0, freeShippingThresholdCents - subtotalCents);
  const freeShippingRemaining = Math.round(freeShippingRemainingCents) / 100;

  const shippingFee = items.length === 0 
    ? 0 
    : hasFreeShipping 
      ? 0 
      : STORE_CONFIG.shippingFeeLima;

  const total = items.length === 0 ? 0 : Math.round((subtotal + shippingFee) * 100) / 100;

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        shippingFee,
        total,
        hasFreeShipping,
        freeShippingRemaining,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toastMessage,
        showToast,
        selectedProductForDetail,
        setSelectedProductForDetail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

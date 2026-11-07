# KLIKORA TECH · Comercio Electrónico

> **«Tecnología para tu día a día»**  
> Demostración académica de tienda web para estudiantes universitarios y trabajadores en remoto en Perú.

---

## 📌 Resumen del Proyecto

KLIKORA TECH es una aplicación web de comercio electrónico moderna, rápida y totalmente responsive construida con **React (Vite)**, **TypeScript** y **Tailwind CSS**. 

El sitio ha sido diseñado con la identidad corporativa requerida:
- **Color principal**: Azul marino (`#14213D`)
- **Color de acento**: Verde turquesa (`#09B6A2`)
- **Moneda oficial**: Soles peruanos (`S/` con 2 decimales)
- **Área de despacho referencial**: Lima Metropolitana y Callao
- **Tarifa de envío referencial**: S/ 12.90 (Envío **GRATIS** a partir de S/ 199.00)
- **Demostración académica**: Sin pasarela de cobro real ni almacenamiento sensible de tarjetas.

---

## 🗂️ Estructura de Archivos

```
/
├── public/
│   └── images/                  # Imágenes estáticas de respaldo
├── src/
│   ├── assets/
│   │   ├── images/              # Fotografías originales de alta resolución
│   │   └── productImages.ts     # MÓDULO DE IMÁGENES procesadas por Vite para producción
│   ├── components/
│   │   ├── BenefitsSection.tsx    # Sección de beneficios y valor ergonómico
│   │   ├── CartDrawer.tsx         # Carrito lateral deslizable con control de stock
│   │   ├── CatalogSection.tsx     # Catálogo con 4 categorías, buscador y orden
│   │   ├── Footer.tsx             # Pie con redes, contacto y aviso de compras coordinadas
│   │   ├── Header.tsx             # Encabezado (Top Bar) con logo, navegación y carrito
│   │   ├── HeroBanner.tsx         # Portada amplia con soporte de laptop
│   │   ├── OrderPreparationModal.tsx # Preparación del pedido y copia a portapapeles
│   │   ├── ProductCard.tsx        # Tarjeta de producto con fotografía y stock
│   │   ├── ProductDetailModal.tsx # Modal de vista detallada de producto
│   │   ├── ProductImage.tsx       # Componente de imagen con fallback visual
│   │   └── Toast.tsx              # Notificaciones de retroalimentación
│   ├── config/
│   │   └── storeConfig.ts         # CONFIGURACIÓN CENTRALIZADA (WhatsApp, redes, tarifas)
│   ├── context/
│   │   └── CartContext.tsx        # Estado global del carrito y persistencia localStorage
│   ├── data/
│   │   └── products.ts            # CATÁLOGO OFICIAL DE 20 PRODUCTOS
│   ├── types/
│   │   └── store.ts               # Tipos TypeScript
│   ├── App.tsx                    # Componente raíz
│   ├── index.css                  # Estilos Tailwind CSS v4 y variables de tema
│   ├── main.tsx                   # Punto de entrada de React
│   └── vite-env.d.ts              # Declaración de tipos para activos de imagen
├── index.html                     # HTML5 con fuentes Plus Jakarta Sans
├── package.json                   # Dependencias del proyecto
└── README.md                      # Esta documentación
```

---

## 🛠️ ¿Dónde y cómo editar el proyecto?

### 1. Editar productos, precios y existencias
Archivo: `src/data/products.ts`
- Cada producto contiene: `sku`, `category`, `name`, `price`, `stock`, `isFeatured`, `description` e `image`.
- Puedes ajustar los precios numéricos o el stock disponible directamente en este arreglo.

### 2. Modificar el número de WhatsApp comercial
Archivo: `src/config/storeConfig.ts`
- Busca la propiedad `whatsappNumber`.
- Por defecto está vacía (`''`), tal como se solicitó para esta etapa académica.
- Para activarlo en el futuro, ingresa el número con código de país sin espacios ni signos:
  ```typescript
  whatsappNumber: '51987654321', // Perú (+51)
  ```
- Al completarlo, el modal de checkout mostrará el botón automático que abre `https://wa.me/...` con el mensaje precargado. Si está vacío, permite copiar el resumen ordenado al portapapeles.

### 3. Modificar enlaces de Redes Sociales
Archivo: `src/config/storeConfig.ts`
- En el objeto `socialLinks`, cambia las URLs temporales por los perfiles definitivos de Instagram, Facebook y TikTok:
  ```typescript
  socialLinks: {
    instagram: 'https://instagram.com/tu_cuenta',
    facebook: 'https://facebook.com/tu_pagina',
    tiktok: 'https://tiktok.com/@tu_usuario',
  }
  ```

### 4. Modificar costos de envío o umbral de envío gratis
Archivo: `src/config/storeConfig.ts`
- `shippingFeeLima`: Costo de envío base en Lima (actualmente `12.90`).
- `freeShippingThreshold`: Subtotal mínimo para envío gratis (actualmente `199.00`).

---

## 🚀 Despliegue en Vercel y GitHub

### Pasos para exportar a GitHub:
1. Inicializa git y sube los cambios:
   ```bash
   git init
   git add .
   git commit -m "feat: KLIKORA TECH ecommerce web app"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/klikora-tech.git
   git push -u origin main
   ```

### Pasos para desplegar en Vercel:
1. Ingresa a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Selecciona **"Add New Project"** e importa el repositorio de KLIKORA TECH.
3. El Framework Preset detectará automáticamente **Vite**.
4. Haz clic en **Deploy**. ¡Tu tienda estará en línea en segundos!

---

## 🧪 Pruebas de Calidad Ejecutadas

- [x] **Catálogo exacto**: 20 productos divididos en 4 categorías (`Periféricos`, `Audio`, `Carga y conexión`, `Oficina y estudio`).
- [x] **Buscador interactivo**: Al buscar «laptop» muestra coincidencias en nombres y descripciones (`KT005`, `KT006`, `KT014`).
- [x] **Cálculo de envío estándar**:
  - Al agregar 1 unidad de `KT005` (S/ 119.90):
    - Subtotal: **S/ 119.90**
    - Envío Lima: **S/ 12.90**
    - Total: **S/ 132.80**
- [x] **Umbral de envío gratuito**:
  - Al agregar otra unidad de `KT005` (2 unidades a S/ 119.90 = S/ 239.80):
    - Subtotal: **S/ 239.80** (Supera S/ 199.00)
    - Envío Lima: **GRATIS (S/ 0.00)**
    - Total: **S/ 239.80**
- [x] **Límites de stock**: Se impide agregar o aumentar unidades más allá del stock asignado a cada producto.
- [x] **Persistencia**: El carrito se conserva en `localStorage` al recargar la página.
- [x] **Preparación del pedido**: Generación de cotización local con nombre y distrito, con botón funcional para copiar el resumen ordenado al portapapeles.

import { Product } from '../types/store';
import { getProductImageBySku } from '../assets/productImages';

/**
 * Catálogo Oficial KLIKORA TECH
 * Contiene EXCLUSIVAMENTE los 20 productos obligatorios con sus especificaciones exactas.
 * Todas las imágenes son importadas mediante el empaquetador de Vite para garantizar
 * su resolución en producción en Vercel.
 */
export const PRODUCTS: Product[] = [
  {
    sku: 'KT001',
    category: 'Periféricos',
    name: 'Mouse inalámbrico silencioso',
    price: 59.90,
    stock: 28,
    isFeatured: true,
    description: 'Mouse compacto y cómodo para estudiar y trabajar.',
    image: getProductImageBySku('KT001')
  },
  {
    sku: 'KT002',
    category: 'Periféricos',
    name: 'Teclado inalámbrico compacto',
    price: 89.90,
    stock: 18,
    isFeatured: true,
    description: 'Teclado liviano que libera espacio en el escritorio.',
    image: getProductImageBySku('KT002')
  },
  {
    sku: 'KT003',
    category: 'Periféricos',
    name: 'Combo teclado y mouse',
    price: 129.90,
    stock: 14,
    isFeatured: true,
    description: 'Kit práctico para equipar una zona de estudio.',
    image: getProductImageBySku('KT003')
  },
  {
    sku: 'KT004',
    category: 'Periféricos',
    name: 'Mouse pad XL antideslizante',
    price: 39.90,
    stock: 32,
    isFeatured: false,
    description: 'Superficie amplia para mouse y teclado.',
    image: getProductImageBySku('KT004')
  },
  {
    sku: 'KT005',
    category: 'Periféricos',
    name: 'Soporte de laptop ajustable',
    price: 119.90,
    stock: 16,
    isFeatured: true,
    description: 'Eleva la laptop para mejorar la postura de trabajo.',
    image: getProductImageBySku('KT005')
  },
  {
    sku: 'KT006',
    category: 'Periféricos',
    name: 'Hub USB-C de cuatro puertos',
    price: 79.90,
    stock: 22,
    isFeatured: false,
    description: 'Conecta accesorios adicionales a tu laptop.',
    image: getProductImageBySku('KT006')
  },
  {
    sku: 'KT007',
    category: 'Audio',
    name: 'Audífonos Bluetooth plegables',
    price: 139.90,
    stock: 14,
    isFeatured: true,
    description: 'Escucha clases, reuniones o música sin cables.',
    image: getProductImageBySku('KT007')
  },
  {
    sku: 'KT008',
    category: 'Audio',
    name: 'Audífonos TWS con estuche',
    price: 109.90,
    stock: 22,
    isFeatured: false,
    description: 'Audífonos pequeños para el uso diario.',
    image: getProductImageBySku('KT008')
  },
  {
    sku: 'KT009',
    category: 'Audio',
    name: 'Micrófono USB para videollamadas',
    price: 159.90,
    stock: 12,
    isFeatured: true,
    description: 'Mejora la captura de voz al estudiar o transmitir.',
    image: getProductImageBySku('KT009')
  },
  {
    sku: 'KT010',
    category: 'Audio',
    name: 'Parlante Bluetooth portátil',
    price: 119.90,
    stock: 16,
    isFeatured: false,
    description: 'Altavoz compacto para escritorio o salidas.',
    image: getProductImageBySku('KT010')
  },
  {
    sku: 'KT011',
    category: 'Carga y conexión',
    name: 'Cargador USB-C de 30 W',
    price: 69.90,
    stock: 36,
    isFeatured: true,
    description: 'Cargador de pared compacto para equipos compatibles.',
    image: getProductImageBySku('KT011')
  },
  {
    sku: 'KT012',
    category: 'Carga y conexión',
    name: 'Cable USB-C trenzado de 1.5 m',
    price: 24.90,
    stock: 45,
    isFeatured: false,
    description: 'Cable reforzado para carga y transferencia.',
    image: getProductImageBySku('KT012')
  },
  {
    sku: 'KT013',
    category: 'Carga y conexión',
    name: 'Batería externa de 10 000 mAh',
    price: 109.90,
    stock: 25,
    isFeatured: true,
    description: 'Recarga tus dispositivos durante el día.',
    image: getProductImageBySku('KT013')
  },
  {
    sku: 'KT014',
    category: 'Carga y conexión',
    name: 'Adaptador USB-C a HDMI',
    price: 79.90,
    stock: 19,
    isFeatured: false,
    description: 'Conecta una laptop compatible a monitor o televisor.',
    image: getProductImageBySku('KT014')
  },
  {
    sku: 'KT015',
    category: 'Carga y conexión',
    name: 'Base de carga inalámbrica 15 W',
    price: 99.90,
    stock: 21,
    isFeatured: false,
    description: 'Carga equipos compatibles sin conectar el cable al teléfono.',
    image: getProductImageBySku('KT015')
  },
  {
    sku: 'KT016',
    category: 'Oficina y estudio',
    name: 'Lámpara LED de escritorio',
    price: 89.90,
    stock: 24,
    isFeatured: true,
    description: 'Ilumina tu espacio de estudio con luz regulable.',
    image: getProductImageBySku('KT016')
  },
  {
    sku: 'KT017',
    category: 'Oficina y estudio',
    name: 'Organizadores de cable x6',
    price: 19.90,
    stock: 50,
    isFeatured: false,
    description: 'Evita enredos y ordena los cables del escritorio.',
    image: getProductImageBySku('KT017')
  },
  {
    sku: 'KT018',
    category: 'Oficina y estudio',
    name: 'Elevador para monitor',
    price: 99.90,
    stock: 12,
    isFeatured: false,
    description: 'Organiza la mesa y eleva la pantalla.',
    image: getProductImageBySku('KT018')
  },
  {
    sku: 'KT019',
    category: 'Oficina y estudio',
    name: 'Cámara web Full HD',
    price: 149.90,
    stock: 13,
    isFeatured: true,
    description: 'Cámara para clases y reuniones en línea.',
    image: getProductImageBySku('KT019')
  },
  {
    sku: 'KT020',
    category: 'Oficina y estudio',
    name: 'Soporte flexible para celular',
    price: 34.90,
    stock: 35,
    isFeatured: false,
    description: 'Sostén el móvil a la vista sin ocupar las manos.',
    image: getProductImageBySku('KT020')
  }
];

export const CATEGORIES = [
  'Todos',
  'Periféricos',
  'Audio',
  'Carga y conexión',
  'Oficina y estudio'
] as const;

export type CategoryType = 
  | 'Todos' 
  | 'Periféricos' 
  | 'Audio' 
  | 'Carga y conexión' 
  | 'Oficina y estudio';

export interface Product {
  sku: string;
  category: 'Periféricos' | 'Audio' | 'Carga y conexión' | 'Oficina y estudio';
  name: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  description: string;
  image?: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export interface CustomerOrderInfo {
  customerName: string;
  district: string;
  phone?: string;
  notes?: string;
}

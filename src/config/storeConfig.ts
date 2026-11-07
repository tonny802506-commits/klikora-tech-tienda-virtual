/**
 * KLIKORA TECH - Configuración centralizada de la tienda
 * Edita este archivo para modificar datos de la marca, enlaces de redes sociales,
 * número de WhatsApp comercial y tarifas de envío.
 */

export const STORE_CONFIG = {
  brandName: 'KLIKORA TECH',
  slogan: 'Tecnología para tu día a día',
  country: 'Perú',
  currencySymbol: 'S/',
  
  // Tarifas de envío referenciales para Lima Metropolitana
  shippingFeeLima: 12.90,
  freeShippingThreshold: 199.00,

  /**
   * Número de WhatsApp del vendedor en formato internacional sin signos ni espacios.
   * Ejemplo para Perú: "51987654321"
   * IMPORTANTE: Actualmente vacío porque está pendiente de validación oficial.
   * Si está vacío, la tienda permite copiar el resumen del pedido al portapapeles.
   */
  whatsappNumber: '',

  /**
   * Enlaces a redes sociales de la tienda.
   * Temporales y configurables en este único lugar.
   */
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
  },
  socialNote: 'Enlaces temporales a las plataformas oficiales en proceso de validación.',

  // Correo de contacto y atención académica
  contactEmail: 'contacto@klikoratech.pe',
  academicNotice: 'Proyecto demostrativo académico para fines de evaluación técnica y diseño UX/UI. No procesa pagos monetarios reales ni formaliza ventas comerciales.',

  // Lista representativa de distritos de Lima Metropolitana y Callao
  districts: [
    'Miraflores',
    'San Isidro',
    'Santiago de Surco',
    'San Borja',
    'La Molina',
    'Barranco',
    'Jesús María',
    'Magdalena del Mar',
    'Lince',
    'Pueblo Libre',
    'San Miguel',
    'Surquillo',
    'Cercado de Lima',
    'Breña',
    'Los Olivos',
    'San Martín de Porres',
    'Independencia',
    'Comas',
    'Carabayllo',
    'Ate',
    'San Juan de Lurigancho',
    'Santa Anita',
    'El Agustino',
    'San Juan de Miraflores',
    'Villa María del Triunfo',
    'Villa El Salvador',
    'Chorrillos',
    'Callao (Bellavista / La Perla / Carmen de la Legua)',
    'Otro distrito de Lima Metropolitana'
  ]
};

/**
 * Formateador oficial de moneda peruana (S/ con dos decimales)
 */
export function formatCurrency(amount: number): string {
  return `${STORE_CONFIG.currencySymbol} ${amount.toFixed(2)}`;
}

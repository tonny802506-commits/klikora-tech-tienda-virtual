/**
 * Módulo de imágenes para KLIKORA TECH
 * Importadas como módulos ES para que Vite las procese, optimice y empaquete
 * correctamente en dist/assets con hashes durante npm run build (evitando errores 404 en Vercel).
 */

import heroWorkspaceImg from './images/hero_laptop_stand_workspace_1794062553849.jpg';
import laptopStandImg from './images/product_laptop_stand_1794062555573.jpg';
import wirelessComboImg from './images/product_wireless_combo_1794062555483.jpg';
import audioHeadsetImg from './images/product_audio_headset_1794062557085.jpg';
import powerChargerImg from './images/product_power_charger_1794071735322.jpg';
import webcamLampImg from './images/product_webcam_lamp_1794071736019.jpg';
import deskMatImg from './images/product_desk_mat_1794071736886.jpg';
import usbMicImg from './images/product_usb_mic_1794071736430.jpg';

export const ASSET_IMAGES = {
  heroWorkspace: heroWorkspaceImg,
  laptopStand: laptopStandImg,
  wirelessCombo: wirelessComboImg,
  audioHeadset: audioHeadsetImg,
  powerCharger: powerChargerImg,
  webcamLamp: webcamLampImg,
  deskMat: deskMatImg,
  usbMic: usbMicImg,
};

/**
 * Obtiene la imagen empaquetada por Vite correspondiente a cada SKU
 */
export function getProductImageBySku(sku: string): string {
  switch (sku) {
    case 'KT001': // Mouse inalámbrico silencioso
    case 'KT002': // Teclado inalámbrico compacto
    case 'KT003': // Combo teclado y mouse
      return wirelessComboImg;
    case 'KT004': // Mouse pad XL antideslizante
      return deskMatImg;
    case 'KT005': // Soporte de laptop ajustable
    case 'KT018': // Elevador para monitor
      return laptopStandImg;
    case 'KT006': // Hub USB-C de cuatro puertos
    case 'KT011': // Cargador USB-C de 30 W
    case 'KT012': // Cable USB-C trenzado de 1.5 m
    case 'KT013': // Batería externa de 10 000 mAh
    case 'KT014': // Adaptador USB-C a HDMI
    case 'KT015': // Base de carga inalámbrica 15 W
      return powerChargerImg;
    case 'KT007': // Audífonos Bluetooth plegables
    case 'KT008': // Audífonos TWS con estuche
    case 'KT010': // Parlante Bluetooth portátil
      return audioHeadsetImg;
    case 'KT009': // Micrófono USB para videollamadas
      return usbMicImg;
    case 'KT016': // Lámpara LED de escritorio
    case 'KT017': // Organizadores de cable x6
    case 'KT019': // Cámara web Full HD
    case 'KT020': // Soporte flexible para celular
      return webcamLampImg;
    default:
      return laptopStandImg;
  }
}

/** Datos de contacto de la marca. Cuando haya dominio propio se suma el email. */
export const marca = {
  nombre: 'Austral Store',
  /** Número en formato internacional para wa.me (54 + 9 + código de área + número). */
  whatsapp: '5492665011054',
  whatsappMensaje: '¡Hola! Vengo de la web de Austral Store.',
  instagram: 'australstore.ar',
  email: null as string | null,
}

export const linkWhatsApp = (mensaje = marca.whatsappMensaje) =>
  `https://wa.me/${marca.whatsapp}?text=${encodeURIComponent(mensaje)}`

export const linkInstagram = () => `https://instagram.com/${marca.instagram}`

/** Navegación principal. Las páginas llegan con #7, #8 y #9. */
export const navegacion = {
  tienda: [
    { texto: 'Accesorios', href: '/accesorios' },
    { texto: 'Guía de piedras', href: '/accesorios/piedras' },
    { texto: 'Deportes', href: '/deportes' },
  ],
  ayuda: [
    { texto: 'Envíos', href: '/ayuda/envios' },
    { texto: 'Cambios y devoluciones', href: '/ayuda/cambios' },
    { texto: 'Botón de arrepentimiento', href: '/arrepentimiento' },
  ],
}

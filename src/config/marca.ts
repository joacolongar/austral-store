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

/**
 * Secciones activas de la tienda. Deportes queda en "Próximamente" hasta que se lance
 * (decisión de joaco, 2026-11-28): no se muestran sus productos y /deportes avisa que viene pronto.
 */
export const secciones = {
  accesorios: true,
  deportes: false,
}

/** Fotos de campaña por defecto (las mandó joaco). Si en el panel se carga una foto en Inicio, se usa esa. */
export const campanaAccesorios = [
  {
    url: '/campana/collar-puesto.webp',
    alt: 'Collar de piedras naturales con dije de estrella, puesto',
  },
  {
    url: '/campana/collar-fluorita.webp',
    alt: 'Collar de chips de fluorita y amatista sobre tela azul',
  },
  { url: '/campana/pulsera-luck.webp', alt: 'Pulsera de ágata negra con dije "Luck"' },
]

/** Cuidados que se muestran en la ficha de cada accesorio. */
export const cuidadosAccesorios = 'Evitar agua, perfumes y cremas. Guardar en un lugar seco.'

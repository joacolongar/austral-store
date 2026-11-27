import type { CollectionConfig } from 'payload'

import { logueado } from '../access'
import { comprimirFoto } from './comprimirFoto'

/** `images` es el binding de Cloudflare Images (ver wrangler.jsonc). */
export const crearMedia = (images?: ImagesBinding): CollectionConfig => ({
  slug: 'media',
  labels: { singular: 'Foto', plural: 'Fotos' },
  admin: { group: 'Ajustes' },
  hooks: { beforeOperation: [comprimirFoto(images)] },
  access: {
    read: () => true,
    create: logueado,
    update: logueado,
    delete: logueado,
  },
  fields: [
    {
      name: 'alt',
      label: 'Descripción de la foto',
      type: 'text',
      required: true,
      admin: {
        description: 'Qué se ve en la foto. Ayuda a Google y a quien usa lector de pantalla.',
      },
    },
  ],
  upload: {
    // En Workers no hay sharp: no se recorta ni redimensiona en el servidor.
    crop: false,
    focalPoint: false,
    mimeTypes: ['image/*'],
  },
})

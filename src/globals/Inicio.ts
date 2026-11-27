import type { GlobalConfig } from 'payload'

import { logueado } from '../access'

/** Sección "Inicio" del panel: lo que se ve en todas las páginas y en la home. */
export const Inicio: GlobalConfig = {
  slug: 'inicio',
  label: 'Inicio',
  admin: { group: 'Inicio' },
  access: {
    read: () => true,
    update: logueado,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'fotoAccesorios',
          label: 'Foto de campaña · Accesorios',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Foto del bloque amarillo de la home.' },
        },
        {
          name: 'fotoDeportes',
          label: 'Foto de campaña · Deportes',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Foto del bloque verde de la home.' },
        },
      ],
    },
    {
      name: 'anuncios',
      label: 'Cinta de anuncios',
      labels: { singular: 'Anuncio', plural: 'Anuncios' },
      type: 'array',
      maxRows: 6,
      admin: {
        description:
          'Frases cortas de la franja verde de arriba de todo. En el celular se ve una a la vez. Si no hay ninguna, la franja no aparece.',
      },
      fields: [
        {
          name: 'texto',
          type: 'text',
          required: true,
          maxLength: 40,
          admin: { placeholder: 'Envíos a todo el país' },
        },
      ],
    },
  ],
}

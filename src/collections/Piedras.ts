import type { CollectionConfig } from 'payload'

import { logueado } from '../access'
import { campoSlug } from './slug'

export const Piedras: CollectionConfig = {
  slug: 'piedras',
  labels: { singular: 'Piedra', plural: 'Piedras' },
  admin: {
    useAsTitle: 'nombre',
    group: 'Accesorios',
    defaultColumns: ['nombre', 'color', 'updatedAt'],
    description: 'La guía de piedras. Lo que cargues acá se ve en la web y en cada pieza.',
  },
  access: {
    read: () => true,
    create: logueado,
    update: logueado,
    delete: logueado,
  },
  fields: [
    { name: 'nombre', type: 'text', required: true },
    campoSlug(),
    {
      name: 'color',
      type: 'text',
      required: true,
      defaultValue: '#9b6fc4',
      admin: {
        description: 'Color del puntito que la representa, en formato #RRGGBB (ej. #9b6fc4).',
      },
      validate: (valor: string | null | undefined) =>
        /^#[0-9a-fA-F]{6}$/.test(valor ?? '') || 'Tiene que ser un color tipo #9b6fc4',
    },
    {
      name: 'significado',
      type: 'textarea',
      required: true,
      admin: { description: 'Qué significa o para qué se usa. Es el texto principal de la guía.' },
    },
    {
      name: 'propiedades',
      type: 'textarea',
      admin: { description: 'Opcional: chakra, signos, origen, dureza, cuidados…' },
    },
    { name: 'foto', type: 'upload', relationTo: 'media' },
  ],
}

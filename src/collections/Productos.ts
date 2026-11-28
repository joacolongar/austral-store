import type { CollectionConfig } from 'payload'

import { logueado, publicadoOLogueado } from '../access'
import { campoSlug } from './slug'

export const tiposBijouterie = [
  { label: 'Collar', value: 'collar' },
  { label: 'Pulsera', value: 'pulsera' },
  { label: 'Aros', value: 'aros' },
  { label: 'Tobillera', value: 'tobillera' },
  { label: 'Anillo', value: 'anillo' },
]

export const tiposDeportes = [
  { label: 'Indumentaria', value: 'indumentaria' },
  { label: 'Calzado', value: 'calzado' },
  { label: 'Accesorio deportivo', value: 'accesorio-deportivo' },
]

const porcentaje = (valor: number | null | undefined) =>
  (typeof valor === 'number' && valor >= 0 && valor <= 100) || 'Entre 0 y 100'

export const Productos: CollectionConfig = {
  slug: 'productos',
  labels: { singular: 'Producto', plural: 'Productos' },
  admin: {
    useAsTitle: 'nombre',
    group: 'Productos',
    defaultColumns: ['nombre', 'mundo', 'tipo', 'precio', 'estado', 'destacado'],
    listSearchableFields: ['nombre'],
  },
  access: {
    read: publicadoOLogueado,
    create: logueado,
    update: logueado,
    delete: logueado,
  },
  hooks: {
    beforeChange: [
      // Pieza sin stock = vendida (si estaba publicada).
      ({ data }) => {
        if (data.estado === 'disponible' && typeof data.stock === 'number' && data.stock <= 0) {
          return { ...data, estado: 'vendida' }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'nombre', type: 'text', required: true },
    campoSlug(),
    {
      type: 'row',
      fields: [
        {
          name: 'mundo',
          label: 'Sección',
          type: 'select',
          required: true,
          defaultValue: 'bijouterie',
          options: [
            { label: 'Accesorios', value: 'bijouterie' },
            { label: 'Deportes', value: 'deportes' },
          ],
        },
        {
          name: 'tipo',
          type: 'select',
          required: true,
          options: [...tiposBijouterie, ...tiposDeportes],
          filterOptions: ({ siblingData, options }) => {
            const mundo = (siblingData as { mundo?: string } | undefined)?.mundo
            const permitidos = (mundo === 'deportes' ? tiposDeportes : tiposBijouterie).map(
              (t) => t.value,
            )
            return options.filter((o) => permitidos.includes(typeof o === 'string' ? o : o.value))
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'precio',
          type: 'number',
          required: true,
          min: 0,
          admin: { description: 'En pesos, sin puntos.' },
        },
        {
          name: 'stock',
          type: 'number',
          required: true,
          defaultValue: 1,
          min: 0,
          admin: { description: 'En accesorios suele ser 1: cada pieza es única.' },
        },
      ],
    },
    {
      name: 'estado',
      type: 'select',
      required: true,
      defaultValue: 'borrador',
      options: [
        { label: 'Borrador (no se ve en la web)', value: 'borrador' },
        { label: 'Disponible', value: 'disponible' },
        { label: 'Vendida', value: 'vendida' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'destacado',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Aparece primero en las novedades de la home.' },
    },
    {
      name: 'fotos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      minRows: 1,
      required: true,
      admin: { description: 'La primera es la principal.' },
    },
    { name: 'descripcion', label: 'Descripción', type: 'textarea' },
    {
      type: 'row',
      fields: [
        {
          name: 'materiales',
          type: 'text',
          admin: { description: 'Ej.: hilo encerado, acero quirúrgico.' },
        },
        { name: 'medidas', type: 'text', admin: { description: 'Ej.: 45 cm, regulable.' } },
      ],
    },
    {
      // Editor visual (#11): tocar la foto para marcar cada piedra. Escribe en `piedras`.
      name: 'marcarPiedras',
      type: 'ui',
      admin: {
        condition: (data) => data?.mundo === 'bijouterie',
        components: { Field: '@/components/admin/MarcarPiedras#MarcarPiedras' },
      },
    },
    {
      name: 'piedras',
      label: 'Piedras en la foto (en números)',
      type: 'array',
      admin: {
        condition: (data) => data?.mundo === 'bijouterie',
        description:
          'Se completa solo al marcar la foto de arriba. Acá podés ajustar la posición fina (en % desde arriba a la izquierda).',
        initCollapsed: true,
      },
      fields: [
        { name: 'piedra', type: 'relationship', relationTo: 'piedras', required: true },
        {
          type: 'row',
          fields: [
            {
              name: 'x',
              label: 'Posición horizontal (%)',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
              validate: porcentaje,
            },
            {
              name: 'y',
              label: 'Posición vertical (%)',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
              validate: porcentaje,
            },
          ],
        },
      ],
    },
  ],
}

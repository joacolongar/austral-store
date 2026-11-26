import type { CollectionConfig } from 'payload'

import { adminOSiMismo, soloAdmin, soloAdminCampo } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  admin: {
    useAsTitle: 'email',
    group: 'Ajustes',
    defaultColumns: ['email', 'nombre', 'rol'],
  },
  auth: true,
  access: {
    // El primer usuario se crea desde /admin/create-first-user (Payload lo permite sin login).
    create: soloAdmin,
    read: adminOSiMismo,
    update: adminOSiMismo,
    delete: soloAdmin,
    admin: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      // El primer usuario de la base siempre es admin.
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
        if (totalDocs === 0) return { ...data, rol: 'admin' }
        return data
      },
    ],
  },
  fields: [
    { name: 'nombre', type: 'text' },
    {
      name: 'rol',
      type: 'select',
      required: true,
      defaultValue: 'editora',
      saveToJWT: true,
      options: [
        { label: 'Admin (todo)', value: 'admin' },
        { label: 'Editora (productos, piedras y pedidos)', value: 'editora' },
      ],
      access: { create: soloAdminCampo, update: soloAdminCampo },
      admin: { position: 'sidebar' },
    },
  ],
}

import type { FieldHook, TextField } from 'payload'

export const aSlug = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const completarSlug =
  (desde: string): FieldHook =>
  ({ value, data }) => {
    if (typeof value === 'string' && value.length > 0) return aSlug(value)
    const origen = data?.[desde]
    return typeof origen === 'string' ? aSlug(origen) : value
  }

/** Campo slug que se completa solo a partir de otro campo (por defecto, `nombre`). */
export const campoSlug = (desde = 'nombre'): TextField => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Parte final del link. Se completa sola con el nombre.',
  },
  hooks: { beforeValidate: [completarSlug(desde)] },
})

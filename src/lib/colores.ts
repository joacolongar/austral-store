/**
 * Familias de color para el filtro del catálogo de accesorios.
 * No hay un campo "color" en la pieza: se deduce del color de sus piedras (#RRGGBB),
 * así la editora no tiene que cargar nada extra.
 */
export const familiasColor = [
  { id: 'violeta', nombre: 'Violetas' },
  { id: 'rosa', nombre: 'Rosas' },
  { id: 'rojo', nombre: 'Rojos' },
  { id: 'naranja', nombre: 'Naranjas' },
  { id: 'marron', nombre: 'Marrones y dorados' },
  { id: 'amarillo', nombre: 'Amarillos' },
  { id: 'verde', nombre: 'Verdes' },
  { id: 'azul', nombre: 'Azules' },
  { id: 'blanco', nombre: 'Blancos y claros' },
  { id: 'negro', nombre: 'Negros y grises' },
] as const

export type FamiliaColor = (typeof familiasColor)[number]['id']

function aHsl(hex: string): { h: number; s: number; l: number } | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return null
  const n = parseInt(m[1], 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  if (d === 0) return { h: 0, s: 0, l }
  const s = d / (1 - Math.abs(2 * l - 1))
  let h: number
  if (max === r) h = ((g - b) / d) % 6
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  h = (h * 60 + 360) % 360
  return { h, s, l }
}

/** A qué familia pertenece un color #RRGGBB. Devuelve null si el formato no es válido. */
export function familiaDeColor(hex: string): FamiliaColor | null {
  const hsl = aHsl(hex)
  if (!hsl) return null
  const { h, s, l } = hsl
  if (l >= 0.86) return 'blanco'
  if (s < 0.15) return l >= 0.7 ? 'blanco' : 'negro'
  if (l < 0.12) return 'negro'
  if (h < 15 || h >= 335) return l >= 0.62 ? 'rosa' : 'rojo'
  if (h < 50) return l < 0.45 ? 'marron' : 'naranja'
  if (h < 70) return 'amarillo'
  if (h < 185) return 'verde'
  if (h < 255) return 'azul'
  if (h < 295) return 'violeta'
  return 'rosa'
}

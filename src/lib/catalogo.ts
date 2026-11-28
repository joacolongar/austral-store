import type { Media, Piedra, Producto } from '@/payload-types'

import { familiaDeColor, type FamiliaColor } from './colores'

export const aFoto = (media: number | Media | null | undefined) =>
  media && typeof media === 'object' && media.url ? { url: media.url, alt: media.alt } : null

/** Piedra tal como la usa la web pública (filtros, guía, chips). */
export type PiedraPublica = {
  id: number
  slug: string
  nombre: string
  color: string
  significado: string
}

export const aPiedraPublica = (p: Piedra): PiedraPublica => ({
  id: p.id,
  slug: p.slug ?? String(p.id),
  nombre: p.nombre,
  color: p.color,
  significado: p.significado,
})

/** Pieza del catálogo de accesorios, lista para la grilla y sus filtros. */
export type PiezaCatalogo = {
  id: number
  nombre: string
  precio: number
  href: string
  tipo: string
  foto?: { url: string; alt: string }
  vendida: boolean
  /** Slugs de las piedras que lleva. */
  piedras: string[]
  /** Familias de color, deducidas de sus piedras. */
  colores: FamiliaColor[]
}

export function aPiezaCatalogo(p: Producto): PiezaCatalogo {
  const piedras = (p.piedras ?? [])
    .map((x) => x.piedra)
    .filter((x): x is Piedra => typeof x === 'object' && x !== null)
  const colores = new Set<FamiliaColor>()
  for (const piedra of piedras) {
    const familia = familiaDeColor(piedra.color)
    if (familia) colores.add(familia)
  }
  return {
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    href: `/accesorios/${p.slug ?? p.id}`,
    tipo: p.tipo,
    foto: aFoto(p.fotos?.[0]) ?? undefined,
    vendida: p.estado === 'vendida',
    piedras: [...new Set(piedras.map((x) => x.slug ?? String(x.id)))],
    colores: [...colores],
  }
}

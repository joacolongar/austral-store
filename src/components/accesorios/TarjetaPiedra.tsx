import Link from 'next/link'
import React from 'react'

import { cn } from '@/components/ui'
import type { PiedraPublica } from '@/lib/catalogo'

/** Círculo con el color de la piedra (lo carga la editora en el panel). */
export function PuntoPiedra({ color, className }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('inline-block shrink-0 rounded-full border border-texto/25', className)}
      style={{ backgroundColor: color }}
    />
  )
}

/** Card de la guía de piedras del Figma: punto de color, nombre y significado. */
export function TarjetaPiedra({ piedra }: { piedra: PiedraPublica }) {
  return (
    <Link
      className="flex h-full flex-col gap-2.5 rounded-[18px] bg-superficie p-4 text-texto transition-colors hover:bg-detalle/30 sm:p-[18px]"
      href={`/accesorios/piedras/${piedra.slug}`}
    >
      <PuntoPiedra className="size-7 sm:size-8" color={piedra.color} />
      <h3 className="text-[15px] font-semibold sm:text-base">{piedra.nombre}</h3>
      <p className="line-clamp-4 text-[13px] leading-snug opacity-80 sm:text-sm">
        {piedra.significado}
      </p>
    </Link>
  )
}

/** Grilla de la guía: 2 columnas en celular, 5 en escritorio como en el Figma. */
export function GrillaPiedras({ piedras }: { piedras: PiedraPublica[] }) {
  if (piedras.length === 0) {
    return (
      <p className="py-8 text-center opacity-70">Muy pronto vas a ver acá la guía de piedras.</p>
    )
  }
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {piedras.map((p) => (
        <li key={p.id}>
          <TarjetaPiedra piedra={p} />
        </li>
      ))}
    </ul>
  )
}

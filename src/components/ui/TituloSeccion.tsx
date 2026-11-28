import React from 'react'

import { cn } from './cn'

/** Título numerado del Figma: "03 / NOVEDADES" chico arriba y el título grande abajo. */
export function TituloSeccion({
  numero,
  etiqueta,
  titulo,
  accion,
  className,
}: {
  numero: string
  etiqueta: string
  titulo: string
  accion?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-end justify-between gap-4 text-texto', className)}>
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] font-medium tracking-etiqueta uppercase opacity-70 sm:text-xs">
          {numero} / {etiqueta}
        </p>
        <h2 className="font-display text-[28px] leading-none uppercase sm:text-5xl">{titulo}</h2>
      </div>
      {accion}
    </div>
  )
}

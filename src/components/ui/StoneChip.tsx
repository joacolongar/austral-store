import React from 'react'

import { cn } from './cn'

type StoneChipProps = {
  nombre: string
  /** Color de la piedra, lo carga la editora en el panel. */
  color: string
  activa?: boolean
  /** Borde sandía, como la piedra elegida en la ficha del Figma. */
  resaltada?: boolean
  onClick?: () => void
  className?: string
}

/** Chip de piedra del Figma: círculo con el color de la piedra + nombre. */
export function StoneChip({
  nombre,
  color,
  activa = false,
  resaltada = false,
  onClick,
  className,
}: StoneChipProps) {
  const contenido = (
    <>
      <span
        aria-hidden
        className="size-[18px] shrink-0 rounded-full border border-texto/20"
        style={{ backgroundColor: color }}
      />
      {nombre}
    </>
  )
  const clases = cn(
    'inline-flex items-center gap-2 rounded-full py-2 pr-4 pl-2.5 text-sm leading-none font-medium text-texto',
    resaltada ? 'border-2 border-acento' : 'border border-texto',
    activa ? 'bg-detalle' : 'bg-superficie',
    onClick && 'transition-colors hover:bg-detalle/40',
    className,
  )

  if (onClick) {
    return (
      <button aria-pressed={activa || resaltada} className={clases} onClick={onClick} type="button">
        {contenido}
      </button>
    )
  }
  return <span className={clases}>{contenido}</span>
}

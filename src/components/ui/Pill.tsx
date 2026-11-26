import React from 'react'

import { cn } from './cn'

type PillProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { activa?: boolean }

/** Filtro tipo pill ("Pill / Activa" e "Inactiva" del Figma). La activa va rellena. */
export function Pill({
  activa = false,
  className,
  children,
  type = 'button',
  ...resto
}: PillProps) {
  return (
    <button
      aria-pressed={activa}
      className={cn(
        'inline-flex items-center rounded-full border px-[22px] py-2.5 text-[13px] leading-none font-medium tracking-pill uppercase transition-colors',
        activa
          ? 'border-primario bg-primario text-sobre-primario'
          : 'border-texto text-texto hover:bg-superficie',
        className,
      )}
      type={type}
      {...resto}
    >
      {children}
    </button>
  )
}

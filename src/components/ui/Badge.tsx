import React from 'react'

import { cn } from './cn'

/** Etiqueta chica sobre la foto ("Pieza única", "Nuevo"). */
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-acento px-2.5 py-[5px] text-xs leading-none font-semibold text-sobre-acento',
        className,
      )}
    >
      {children}
    </span>
  )
}

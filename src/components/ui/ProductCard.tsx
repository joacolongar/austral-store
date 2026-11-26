import Link from 'next/link'
import React from 'react'

import { Badge } from './Badge'
import { cn } from './cn'

type ProductCardProps = {
  nombre: string
  /** Precio en pesos, sin formato. */
  precio: number
  href: string
  foto?: { url: string; alt: string }
  badge?: string
  vendida?: boolean
  className?: string
}

const formatoNumero = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 })

/** "$18.500", como en el Figma (sin espacio después del signo). */
export const formatoPrecio = (precio: number) => `$${formatoNumero.format(precio)}`

/** Card de producto del Figma: foto cuadrada con badge, nombre y precio. */
export function ProductCard({
  nombre,
  precio,
  href,
  foto,
  badge,
  vendida,
  className,
}: ProductCardProps) {
  return (
    <Link
      className={cn(
        'group flex flex-col gap-2.5 rounded-card bg-superficie px-3 pt-3 pb-[18px] text-texto',
        className,
      )}
      href={href}
    >
      <div className="relative aspect-square overflow-hidden rounded-foto bg-fondo">
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={foto.alt}
            className={cn(
              'size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]',
              vendida && 'opacity-60 grayscale',
            )}
            loading="lazy"
            src={foto.url}
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-xs font-medium tracking-etiqueta opacity-35">
            FOTO
          </span>
        )}
        {(badge || vendida) && (
          <Badge className="absolute top-3 left-3">{vendida ? 'Vendida' : badge}</Badge>
        )}
      </div>
      <p className="text-base font-medium">{nombre}</p>
      <p className="text-base font-semibold">{formatoPrecio(precio)}</p>
    </Link>
  )
}

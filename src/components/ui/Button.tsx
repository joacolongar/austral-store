import Link from 'next/link'
import React from 'react'

import { cn } from './cn'

type Variante = 'primario' | 'secundario'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] leading-none font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const variantes: Record<Variante, string> = {
  primario: 'bg-primario text-sobre-primario hover:bg-primario/90',
  secundario: 'border-[1.5px] border-texto text-texto hover:bg-superficie',
}

type Comunes = { variante?: Variante; className?: string; children: React.ReactNode }

type ComoBoton = Comunes & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ComoLink = Comunes & { href: string; target?: string; rel?: string }

const esLink = (props: ComoBoton | ComoLink): props is ComoLink => typeof props.href === 'string'

/** Botón redondeado del Figma ("Botón / Primario" y "Botón / Secundario"). Con `href` se renderiza como link. */
export function Button(props: ComoBoton | ComoLink) {
  const clases = cn(base, variantes[props.variante ?? 'primario'], props.className)

  if (esLink(props)) {
    return (
      <Link className={clases} href={props.href} rel={props.rel} target={props.target}>
        {props.children}
      </Link>
    )
  }

  const { variante: _variante, className: _className, children, type = 'button', ...resto } = props
  return (
    <button className={clases} type={type} {...resto}>
      {children}
    </button>
  )
}

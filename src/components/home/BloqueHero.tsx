import React from 'react'

import { Button, cn } from '@/components/ui'

type Foto = { url: string; alt: string } | null

/** Bloque grande de la home que lleva a una sección (Accesorios en amarillo, Deportes en verde). */
export function BloqueHero({
  etiqueta,
  titulo,
  bajada,
  boton,
  href,
  foto,
  tono,
}: {
  etiqueta: string
  titulo: [string, string]
  bajada: string
  boton: string
  href: string
  foto: Foto
  tono: 'detalle' | 'primario'
}) {
  const enVerde = tono === 'primario'
  return (
    <section
      className={cn(
        'flex flex-col gap-3.5 overflow-hidden rounded-[24px] px-6 pt-7 pb-6 sm:gap-[18px] sm:rounded-[28px] sm:p-12 lg:h-[600px]',
        enVerde ? 'bg-primario text-sobre-primario' : 'bg-detalle text-texto',
      )}
    >
      <p className="text-[11px] font-medium tracking-[0.14em] uppercase sm:text-xs">{etiqueta}</p>
      <h2 className="font-display text-[28px] leading-[0.95] uppercase sm:text-5xl lg:text-[40px] xl:text-[52px] 2xl:text-[60px]">
        <span className="block whitespace-nowrap">{titulo[0]}</span>
        <span className="block whitespace-nowrap">{titulo[1]}</span>
      </h2>
      <p className="hidden max-w-[460px] text-lg opacity-85 sm:block">{bajada}</p>
      <Button
        className="self-start px-[22px] py-[13px] text-sm sm:px-7 sm:py-4 sm:text-[15px]"
        href={href}
        variante={enVerde ? 'detalle' : 'primario'}
      >
        {boton}
      </Button>
      <div className="relative h-[180px] w-full overflow-hidden rounded-[16px] bg-fondo sm:h-[260px] sm:rounded-card lg:h-auto lg:flex-1">
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={foto.alt} className="size-full object-cover" src={foto.url} />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-[11px] font-medium tracking-etiqueta text-texto uppercase opacity-50 sm:text-xs">
            Foto de campaña
          </span>
        )}
      </div>
    </section>
  )
}

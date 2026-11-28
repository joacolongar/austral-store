import React from 'react'

import { Button, cn } from '@/components/ui'

type Foto = { url: string; alt: string }

/**
 * Bloque grande de la home que lleva a una sección (Accesorios en amarillo, Deportes en verde).
 * Con `proximamente` no lleva botón: muestra el aviso en lugar de la foto.
 */
export function BloqueHero({
  etiqueta,
  titulo,
  bajada,
  boton,
  href,
  fotos,
  tono,
  proximamente = false,
}: {
  etiqueta: string
  titulo: [string, string]
  bajada: string
  boton: string
  href: string
  fotos: Foto[]
  tono: 'detalle' | 'primario'
  proximamente?: boolean
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
      {!proximamente && (
        <Button
          className="self-start px-[22px] py-[13px] text-sm sm:px-7 sm:py-4 sm:text-[15px]"
          href={href}
          variante={enVerde ? 'detalle' : 'primario'}
        >
          {boton}
        </Button>
      )}
      {proximamente ? (
        <div
          className={cn(
            'grid h-[120px] w-full place-items-center rounded-[16px] border-[1.5px] border-dashed sm:h-[200px] sm:rounded-card lg:h-auto lg:flex-1',
            enVerde ? 'border-sobre-primario/40' : 'border-texto/40',
          )}
        >
          <p className="font-display text-2xl uppercase sm:text-4xl">Próximamente</p>
        </div>
      ) : (
        <Fotos fotos={fotos} />
      )}
    </section>
  )
}

function Fotos({ fotos }: { fotos: Foto[] }) {
  const caja =
    'relative h-[180px] w-full overflow-hidden rounded-[16px] bg-fondo sm:h-[260px] sm:rounded-card lg:h-auto lg:flex-1'
  if (fotos.length === 0) {
    return (
      <div className={caja}>
        <span className="absolute inset-0 grid place-items-center text-[11px] font-medium tracking-etiqueta text-texto uppercase opacity-50 sm:text-xs">
          Foto de campaña
        </span>
      </div>
    )
  }
  // Una foto ocupa todo; varias se reparten: la primera grande y el resto al costado.
  return (
    <div
      className={cn(
        caja,
        'grid gap-2 bg-transparent',
        fotos.length > 1 && 'grid-cols-[2fr_1fr] grid-rows-2',
      )}
    >
      {fotos.slice(0, 3).map((f, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={f.alt}
          className={cn(
            'size-full min-h-0 rounded-[12px] object-cover sm:rounded-foto',
            fotos.length > 1 && i === 0 && 'row-span-2',
            fotos.length === 2 && i === 1 && 'row-span-2',
          )}
          fetchPriority={i === 0 ? 'high' : undefined}
          key={f.url}
          src={f.url}
        />
      ))}
    </div>
  )
}

'use client'

import Link from 'next/link'
import React, { useRef, useState } from 'react'

import { StoneChip, cn } from '@/components/ui'
import type { PiedraPublica } from '@/lib/catalogo'

import { PuntoPiedra } from './TarjetaPiedra'

export type PuntoFoto = { slug: string; x: number; y: number }
type Foto = { url: string; alt: string }

/**
 * Ficha de una pieza (issue #10): galería con puntos que laten sobre las piedras de la foto
 * principal, tarjeta de la piedra elegida y tira con todas sus piedras.
 * `encabezado` y `detalles` vienen armados del servidor (título, precio, botones).
 */
export function FichaInteractiva({
  nombre,
  tipoTexto,
  fotos,
  puntos,
  piedras,
  encabezado,
  detalles,
}: {
  nombre: string
  tipoTexto: string
  fotos: Foto[]
  puntos: PuntoFoto[]
  /** Piedras de la pieza, sin repetir, en el orden en que se cargaron. */
  piedras: PiedraPublica[]
  encabezado: React.ReactNode
  detalles: React.ReactNode
}) {
  const [elegida, setElegida] = useState<string | null>(piedras[0]?.slug ?? null)
  const [foto, setFoto] = useState(0)
  const carrusel = useRef<HTMLDivElement>(null)
  const tarjetaMovil = useRef<HTMLDivElement>(null)
  const piedra = piedras.find((p) => p.slug === elegida) ?? null

  const irAFoto = (i: number) => {
    const el = carrusel.current
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
    setFoto(i)
  }
  const elegir = (slug: string, desdeTira = false) => {
    setElegida(slug)
    if (foto !== 0) irAFoto(0)
    // En celular la tarjeta queda arriba de la tira: se lleva a la vista para que se lea.
    if (desdeTira && window.matchMedia('(width < 64rem)').matches) {
      tarjetaMovil.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-14">
      <div className="flex min-w-0 flex-col gap-2.5 lg:gap-3">
        <div className="relative">
          <div
            aria-label={`Fotos de ${nombre}`}
            className="flex snap-x snap-mandatory overflow-x-auto rounded-[22px] bg-superficie [scrollbar-width:none] sm:rounded-[28px] [&::-webkit-scrollbar]:hidden"
            onScroll={(e) => {
              const el = e.currentTarget
              const i = Math.round(el.scrollLeft / el.clientWidth)
              if (i !== foto) setFoto(i)
            }}
            ref={carrusel}
            role="region"
          >
            {fotos.length === 0 && (
              <div className="grid aspect-square w-full shrink-0 place-items-center text-xs font-medium tracking-etiqueta opacity-35">
                FOTO
              </div>
            )}
            {fotos.map((f, i) => (
              <div className="relative aspect-square w-full shrink-0 snap-center" key={f.url + i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={f.alt || nombre}
                  className="size-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  src={f.url}
                />
                {i === 0 &&
                  puntos.map((p, j) => {
                    const pi = piedras.find((x) => x.slug === p.slug)
                    if (!pi) return null
                    const activa = p.slug === elegida
                    return (
                      <button
                        aria-label={`Ver ${pi.nombre}`}
                        aria-pressed={activa}
                        className="group absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
                        data-punto={p.slug}
                        key={j}
                        onClick={() => elegir(p.slug)}
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        type="button"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'absolute size-7 rounded-full bg-fondo/70 motion-safe:animate-ping',
                            activa && 'bg-acento/50',
                          )}
                        />
                        <span
                          aria-hidden
                          className={cn(
                            'relative size-5 rounded-full border-2 border-fondo shadow-md transition-transform group-hover:scale-110',
                            activa && 'scale-125 ring-2 ring-acento',
                          )}
                          style={{ backgroundColor: pi.color }}
                        />
                      </button>
                    )
                  })}
              </div>
            ))}
          </div>

          {puntos.length > 0 && foto === 0 && (
            <p className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-fondo px-3 py-1.5 text-[11px] font-medium sm:bottom-4 sm:left-4 sm:text-xs">
              Tocá una piedra para ver su significado
            </p>
          )}
        </div>

        {fotos.length > 1 && (
          <>
            {/* Celular: puntitos. Escritorio: miniaturas. */}
            <div className="flex justify-center gap-1.5 sm:hidden">
              {fotos.map((_, i) => (
                <button
                  aria-label={`Foto ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === foto ? 'w-[18px] bg-primario' : 'w-1.5 bg-texto/25',
                  )}
                  key={i}
                  onClick={() => irAFoto(i)}
                  type="button"
                />
              ))}
            </div>
            <div className="hidden gap-3 sm:flex">
              {fotos.map((f, i) => (
                <button
                  aria-label={`Foto ${i + 1}`}
                  className={cn(
                    'size-[88px] overflow-hidden rounded-foto border-2 bg-superficie lg:size-[110px]',
                    i === foto ? 'border-primario' : 'border-transparent',
                  )}
                  key={f.url + i}
                  onClick={() => irAFoto(i)}
                  type="button"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="size-full object-cover" loading="lazy" src={f.url} />
                </button>
              ))}
            </div>
          </>
        )}

        {piedra && (
          <TarjetaElegida
            className="scroll-mt-28 lg:hidden"
            piedra={piedra}
            ref={tarjetaMovil}
            tipoTexto={tipoTexto}
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-4 lg:gap-5">
        {encabezado}
        {piedras.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold tracking-etiqueta uppercase">
              Este{tipoTexto === 'aros' ? 's' : ''} {tipoTexto} lleva
            </p>
            <ul className="flex flex-wrap gap-2" data-tira-piedras>
              {piedras.map((p) => (
                <li key={p.slug}>
                  <StoneChip
                    color={p.color}
                    nombre={p.nombre}
                    onClick={() => elegir(p.slug, true)}
                    resaltada={p.slug === elegida}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {piedra && (
          <TarjetaElegida className="hidden lg:flex" piedra={piedra} tipoTexto={tipoTexto} />
        )}
        {detalles}
      </div>
    </div>
  )
}

function TarjetaElegida({
  piedra,
  tipoTexto,
  className,
  ref,
}: {
  piedra: PiedraPublica
  tipoTexto: string
  className?: string
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={ref}
      aria-live="polite"
      className={cn(
        'flex flex-col gap-2 rounded-[18px] border-2 border-acento bg-superficie px-[18px] py-4 text-texto lg:gap-2.5 lg:p-5',
        className,
      )}
      data-tarjeta-piedra
    >
      <div className="flex items-center gap-2.5">
        <PuntoPiedra className="size-5 lg:size-6" color={piedra.color} />
        <h2 className="font-display text-lg leading-none uppercase lg:text-xl">{piedra.nombre}</h2>
      </div>
      <p className="text-sm leading-snug lg:text-[15px]">{piedra.significado}</p>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-0.5">
        <p className="text-xs font-medium opacity-65">
          Tocá otra piedra {tipoTexto === 'aros' ? 'de los' : 'del'} {tipoTexto} para ver la suya
        </p>
        <Link
          className="text-xs font-semibold underline decoration-acento decoration-2 underline-offset-2"
          href={`/accesorios/piedras/${piedra.slug}`}
        >
          Más piezas con {piedra.nombre.toLowerCase()} →
        </Link>
      </div>
    </div>
  )
}

'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { Pill, ProductCard, StoneChip, cn } from '@/components/ui'
import type { PiedraPublica, PiezaCatalogo } from '@/lib/catalogo'
import { familiasColor, familiaDeColor, type FamiliaColor } from '@/lib/colores'

import { PuntoPiedra } from './TarjetaPiedra'

const tipos = [
  { valor: 'collar', texto: 'Collares' },
  { valor: 'pulsera', texto: 'Pulseras' },
  { valor: 'aros', texto: 'Aros' },
  { valor: 'tobillera', texto: 'Tobilleras' },
  { valor: 'anillo', texto: 'Anillos' },
]

export type FiltrosCatalogo = {
  tipo: string | null
  piedra: string | null
  color: FamiliaColor | null
}

type Panel = 'piedra' | 'color' | null

/** Grilla de accesorios con filtros por tipo (pills), piedra y color. Los filtros quedan en la URL. */
export function CatalogoAccesorios({
  piezas,
  piedras,
  inicial,
}: {
  piezas: PiezaCatalogo[]
  piedras: PiedraPublica[]
  inicial: FiltrosCatalogo
}) {
  const [filtros, setFiltros] = useState<FiltrosCatalogo>(inicial)
  const [panel, setPanel] = useState<Panel>(null)

  // Solo se ofrecen opciones que tienen alguna pieza, para no mostrar filtros vacíos.
  const tiposConPiezas = tipos.filter((t) => piezas.some((p) => p.tipo === t.valor))
  const piedrasConPiezas = piedras.filter((pi) => piezas.some((p) => p.piedras.includes(pi.slug)))
  const coloresConPiezas = familiasColor
    .filter((c) => piezas.some((p) => p.colores.includes(c.id)))
    .map((c) => ({
      ...c,
      muestras: piedras.filter((pi) => familiaDeColor(pi.color) === c.id).slice(0, 3),
    }))

  const visibles = useMemo(
    () =>
      piezas.filter(
        (p) =>
          (!filtros.tipo || p.tipo === filtros.tipo) &&
          (!filtros.piedra || p.piedras.includes(filtros.piedra)) &&
          (!filtros.color || p.colores.includes(filtros.color)),
      ),
    [piezas, filtros],
  )

  useEffect(() => {
    const url = new URL(window.location.href)
    for (const clave of ['tipo', 'piedra', 'color'] as const) {
      const valor = filtros[clave]
      if (valor) url.searchParams.set(clave, valor)
      else url.searchParams.delete(clave)
    }
    window.history.replaceState(null, '', url)
  }, [filtros])

  const cambiar = (cambio: Partial<FiltrosCatalogo>) => {
    setFiltros((f) => ({ ...f, ...cambio }))
    setPanel(null)
  }
  const piedraActiva = piedras.find((p) => p.slug === filtros.piedra)
  const colorActivo = familiasColor.find((c) => c.id === filtros.color)
  const hayFiltros = Boolean(filtros.tipo || filtros.piedra || filtros.color)

  return (
    <section aria-label="Catálogo" className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-2.5 sm:px-0 sm:pb-0">
          <Pill activa={!filtros.tipo} className="shrink-0" onClick={() => cambiar({ tipo: null })}>
            Todo
          </Pill>
          {tiposConPiezas.map((t) => (
            <Pill
              activa={filtros.tipo === t.valor}
              className="shrink-0"
              key={t.valor}
              onClick={() => cambiar({ tipo: t.valor })}
            >
              {t.texto}
            </Pill>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-2.5">
          {piedrasConPiezas.length > 0 && (
            <BotonPanel
              abierto={panel === 'piedra'}
              activo={Boolean(piedraActiva)}
              onClick={() => setPanel(panel === 'piedra' ? null : 'piedra')}
            >
              {piedraActiva ? piedraActiva.nombre : 'Filtrar por piedra'}
            </BotonPanel>
          )}
          {coloresConPiezas.length > 0 && (
            <BotonPanel
              abierto={panel === 'color'}
              activo={Boolean(colorActivo)}
              onClick={() => setPanel(panel === 'color' ? null : 'color')}
            >
              {colorActivo ? colorActivo.nombre : 'Color'}
            </BotonPanel>
          )}
        </div>
      </div>

      {panel === 'piedra' && (
        <div
          className="flex flex-wrap gap-2 rounded-card bg-superficie p-3 sm:p-4"
          id="panel-piedra"
        >
          <StoneChipTodas activa={!filtros.piedra} onClick={() => cambiar({ piedra: null })} />
          {piedrasConPiezas.map((p) => (
            <StoneChip
              activa={filtros.piedra === p.slug}
              className="bg-fondo"
              color={p.color}
              key={p.id}
              nombre={p.nombre}
              onClick={() => cambiar({ piedra: p.slug })}
            />
          ))}
        </div>
      )}
      {panel === 'color' && (
        <div
          className="flex flex-wrap gap-2 rounded-card bg-superficie p-3 sm:p-4"
          id="panel-color"
        >
          <StoneChipTodas activa={!filtros.color} onClick={() => cambiar({ color: null })} />
          {coloresConPiezas.map((c) => (
            <button
              aria-pressed={filtros.color === c.id}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-texto py-2 pr-4 pl-2.5 text-sm leading-none font-medium text-texto transition-colors',
                filtros.color === c.id ? 'bg-detalle' : 'bg-fondo hover:bg-detalle/40',
              )}
              key={c.id}
              onClick={() => cambiar({ color: c.id })}
              type="button"
            >
              <span aria-hidden className="flex -space-x-1.5">
                {c.muestras.map((m) => (
                  <PuntoPiedra className="size-[18px]" color={m.color} key={m.id} />
                ))}
              </span>
              {c.nombre}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <p aria-live="polite" className="opacity-70">
          {visibles.length === 1 ? '1 pieza' : `${visibles.length} piezas`}
        </p>
        {hayFiltros && (
          <button
            className="font-semibold underline"
            onClick={() => cambiar({ tipo: null, piedra: null, color: null })}
            type="button"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {visibles.length === 0 ? (
        <p className="py-10 text-center opacity-70">
          {piezas.length === 0
            ? 'Muy pronto vas a ver acá las piezas.'
            : 'No hay piezas con esos filtros. Probá con otros.'}
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {visibles.map((p) => (
            <li key={p.id}>
              <ProductCard
                badge="Pieza única"
                className="h-full"
                foto={p.foto}
                href={p.href}
                nombre={p.nombre}
                precio={p.precio}
                vendida={p.vendida}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function BotonPanel({
  abierto,
  activo,
  onClick,
  children,
}: {
  abierto: boolean
  activo: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      aria-expanded={abierto}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-full border border-texto px-[18px] py-2.5 text-[13px] leading-none font-semibold tracking-pill text-texto uppercase transition-colors',
        activo ? 'bg-detalle' : 'hover:bg-superficie',
      )}
      onClick={onClick}
      type="button"
    >
      {children}
      <span aria-hidden className={cn('text-[10px] transition-transform', abierto && 'rotate-180')}>
        ▾
      </span>
    </button>
  )
}

function StoneChipTodas({ activa, onClick }: { activa: boolean; onClick: () => void }) {
  return (
    <button
      aria-pressed={activa}
      className={cn(
        'inline-flex items-center rounded-full border border-texto px-4 py-2 text-sm leading-none font-medium text-texto transition-colors',
        activa ? 'bg-detalle' : 'bg-fondo hover:bg-detalle/40',
      )}
      onClick={onClick}
      type="button"
    >
      Todas
    </button>
  )
}

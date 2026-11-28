import Link from 'next/link'
import React from 'react'

import {
  CatalogoAccesorios,
  type FiltrosCatalogo,
} from '@/components/accesorios/CatalogoAccesorios'
import { GrillaPiedras } from '@/components/accesorios/TarjetaPiedra'
import { familiasColor, type FamiliaColor } from '@/lib/colores'
import { buscarPiedras, buscarPiezas } from '@/lib/consultas'

export const metadata = {
  title: 'Accesorios · Austral Store',
  description:
    'Piezas únicas hechas a mano, con piedras naturales e hilo encerado: collares, pulseras, aros y tobilleras.',
}

type Params = Promise<Record<string, string | string[] | undefined>>

const uno = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || null

export default async function AccesoriosPage({ searchParams }: { searchParams: Params }) {
  const sp = await searchParams
  const color = uno(sp.color)
  const inicial: FiltrosCatalogo = {
    tipo: uno(sp.tipo),
    piedra: uno(sp.piedra),
    color: familiasColor.some((c) => c.id === color) ? (color as FamiliaColor) : null,
  }
  const [piezas, piedras] = await Promise.all([buscarPiezas(), buscarPiedras()])

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col px-4 pt-1 sm:px-10 sm:pt-1">
      <section className="flex flex-col gap-5 rounded-[24px] bg-detalle px-6 py-8 text-texto sm:rounded-[28px] sm:px-12 sm:py-11 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2.5">
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase sm:text-xs">
            Âustral accesorios
          </p>
          <h1 className="font-display text-[40px] leading-none uppercase sm:text-7xl">
            Accesorios
          </h1>
          <p className="max-w-[560px] text-base opacity-85 sm:text-lg">
            Piezas únicas hechas a mano, con piedras naturales e hilo encerado.
          </p>
        </div>
        <a
          className="self-start text-[13px] font-semibold tracking-[0.1em] uppercase underline lg:self-auto"
          href="#guia"
        >
          Guía de piedras ↓
        </a>
      </section>

      <div className="pt-6 pb-6 sm:pt-8">
        <CatalogoAccesorios inicial={inicial} piedras={piedras} piezas={piezas} />
      </div>

      <section
        aria-labelledby="guia-titulo"
        className="flex scroll-mt-28 flex-col gap-4 py-12 sm:gap-5 sm:py-20"
        id="guia"
      >
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold tracking-etiqueta uppercase opacity-70 sm:text-xs">
              Accesorios / Guía de piedras
            </p>
            <h2
              className="font-display text-[28px] leading-none uppercase sm:text-[40px]"
              id="guia-titulo"
            >
              Cada piedra tiene su historia
            </h2>
          </div>
          <Link
            className="text-[13px] font-semibold tracking-[0.08em] uppercase underline"
            href="/accesorios/piedras"
          >
            Ver la guía
          </Link>
        </div>
        <GrillaPiedras piedras={piedras} />
      </section>
    </main>
  )
}

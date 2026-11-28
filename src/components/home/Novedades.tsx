'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { Pill, ProductCard, TituloSeccion } from '@/components/ui'

export type ProductoNovedad = {
  id: number
  nombre: string
  precio: number
  href: string
  mundo: 'bijouterie' | 'deportes'
  tipo: string
  foto?: { url: string; alt: string }
  badge?: string
  vendida: boolean
}

type Filtro = { texto: string; campo: 'mundo' | 'tipo' | null; valor: string | null }

const porSeccion: Filtro[] = [
  { texto: 'Todo', campo: null, valor: null },
  { texto: 'Accesorios', campo: 'mundo', valor: 'bijouterie' },
  { texto: 'Deportes', campo: 'mundo', valor: 'deportes' },
]

/** Con Deportes en "Próximamente" se filtra por tipo de pieza. */
const porTipo: Filtro[] = [
  { texto: 'Todo', campo: null, valor: null },
  { texto: 'Collares', campo: 'tipo', valor: 'collar' },
  { texto: 'Pulseras', campo: 'tipo', valor: 'pulsera' },
  { texto: 'Aros', campo: 'tipo', valor: 'aros' },
  { texto: 'Tobilleras', campo: 'tipo', valor: 'tobillera' },
]

const MAXIMO = 8

/** "03 / Novedades": últimas piezas cargadas (las destacadas primero), con filtro por sección. */
export function Novedades({
  productos,
  soloAccesorios = false,
}: {
  productos: ProductoNovedad[]
  soloAccesorios?: boolean
}) {
  const filtros = soloAccesorios
    ? // Solo los tipos que tienen alguna pieza, para no mostrar filtros vacíos.
      porTipo.filter((f) => !f.valor || productos.some((p) => p.tipo === f.valor))
    : porSeccion
  const [filtro, setFiltro] = useState<Filtro>(filtros[0])
  const visibles = productos
    .filter((p) => !filtro.campo || p[filtro.campo] === filtro.valor)
    .slice(0, MAXIMO)
  const verTodo = filtro.valor === 'deportes' ? '/deportes' : '/accesorios'

  return (
    <section className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 pt-10 pb-6 sm:gap-6 sm:px-10 sm:pt-16">
      <TituloSeccion
        accion={
          <Link
            className="hidden text-[13px] font-semibold tracking-[0.08em] uppercase underline sm:inline"
            href={verTodo}
          >
            Ver todo
          </Link>
        }
        etiqueta="Novedades"
        numero="03"
        titulo="Novedades"
      />
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-2.5 sm:px-0">
        {filtros.map((f) => (
          <Pill
            activa={filtro.texto === f.texto}
            className="shrink-0"
            key={f.texto}
            onClick={() => setFiltro(f)}
          >
            {f.texto}
          </Pill>
        ))}
      </div>
      {visibles.length === 0 ? (
        <p className="py-10 text-center opacity-70">Muy pronto vas a ver acá las últimas piezas.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {visibles.map((p) => (
            <li key={p.id}>
              <ProductCard
                badge={p.badge}
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
      <Link
        className="self-center text-[13px] font-semibold tracking-[0.08em] uppercase underline sm:hidden"
        href={verTodo}
      >
        Ver todo
      </Link>
    </section>
  )
}

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
  foto?: { url: string; alt: string }
  badge?: string
  vendida: boolean
}

const filtros = [
  { texto: 'Todo', valor: null as null },
  { texto: 'Accesorios', valor: 'bijouterie' },
  { texto: 'Deportes', valor: 'deportes' },
] as const

const MAXIMO = 8

/** "03 / Novedades": últimas piezas cargadas (las destacadas primero), con filtro por sección. */
export function Novedades({ productos }: { productos: ProductoNovedad[] }) {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]['valor']>(null)
  const visibles = productos.filter((p) => !filtro || p.mundo === filtro).slice(0, MAXIMO)
  const verTodo = filtro === 'deportes' ? '/deportes' : '/accesorios'

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
            activa={filtro === f.valor}
            className="shrink-0"
            key={f.texto}
            onClick={() => setFiltro(f.valor)}
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

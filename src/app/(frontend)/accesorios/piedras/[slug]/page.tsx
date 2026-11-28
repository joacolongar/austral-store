import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { PuntoPiedra } from '@/components/accesorios/TarjetaPiedra'
import { Button, ProductCard, StoneChip } from '@/components/ui'
import { linkWhatsApp } from '@/config/marca'
import { aFoto } from '@/lib/catalogo'
import { buscarPiedra, buscarPiedras, buscarPiezas } from '@/lib/consultas'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const piedra = await buscarPiedra((await params).slug)
  if (!piedra) return { title: 'Piedra no encontrada · Austral Store' }
  return {
    title: `${piedra.nombre} · Guía de piedras · Austral Store`,
    description: piedra.significado.slice(0, 160),
  }
}

export default async function PiedraPage({ params }: Props) {
  const piedra = await buscarPiedra((await params).slug)
  if (!piedra) notFound()

  const [piezas, todas] = await Promise.all([
    buscarPiezas({ 'piedras.piedra': { equals: piedra.id } }),
    buscarPiedras(),
  ])
  const foto = aFoto(piedra.foto)
  const otras = todas.filter((p) => p.id !== piedra.id)

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 pt-4 pb-12 sm:gap-16 sm:px-10 sm:pt-10 sm:pb-20">
      <article className="flex flex-col gap-4 sm:gap-5">
        <nav
          aria-label="Ruta"
          className="text-[11px] font-semibold tracking-etiqueta uppercase opacity-70 sm:text-xs"
        >
          <Link className="hover:underline" href="/accesorios">
            Accesorios
          </Link>{' '}
          /{' '}
          <Link className="hover:underline" href="/accesorios/piedras">
            Guía de piedras
          </Link>
        </nav>
        <div className="grid gap-5 rounded-[24px] bg-superficie p-5 sm:rounded-[28px] sm:p-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-12">
          <div className="flex flex-col gap-4">
            <PuntoPiedra className="size-12 sm:size-14" color={piedra.color} />
            <h1 className="font-display text-[36px] leading-none uppercase sm:text-6xl">
              {piedra.nombre}
            </h1>
            <p className="max-w-[640px] text-lg leading-snug sm:text-xl">{piedra.significado}</p>
            {piedra.propiedades && (
              <div className="flex max-w-[640px] flex-col gap-1.5 pt-2">
                <h2 className="text-xs font-semibold tracking-etiqueta uppercase opacity-70">
                  Propiedades
                </h2>
                <p className="text-base whitespace-pre-line opacity-85">{piedra.propiedades}</p>
              </div>
            )}
          </div>
          {foto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={foto.alt || piedra.nombre}
              className="aspect-square w-full rounded-foto object-cover"
              src={foto.url}
            />
          )}
        </div>
      </article>

      <section aria-labelledby="piezas-titulo" className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-medium tracking-etiqueta uppercase opacity-70 sm:text-xs">
            Piezas con {piedra.nombre.toLowerCase()}
          </p>
          <h2
            className="font-display text-[28px] leading-none uppercase sm:text-5xl"
            id="piezas-titulo"
          >
            Llevala puesta
          </h2>
        </div>
        {piezas.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-card bg-superficie p-5 sm:p-8">
            <p className="text-base">
              Ahora no hay piezas con {piedra.nombre.toLowerCase()}. Si querés una, escribinos y te
              contamos.
            </p>
            <Button
              href={linkWhatsApp(`¡Hola! Me interesa una pieza con ${piedra.nombre}.`)}
              rel="noopener"
              target="_blank"
            >
              Consultar por WhatsApp
            </Button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {piezas.map((p) => (
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

      {otras.length > 0 && (
        <section aria-labelledby="otras-titulo" className="flex flex-col gap-4">
          <h2
            className="text-xs font-semibold tracking-etiqueta uppercase opacity-70"
            id="otras-titulo"
          >
            Otras piedras
          </h2>
          <ul className="flex flex-wrap gap-2">
            {otras.map((p) => (
              <li key={p.id}>
                <Link href={`/accesorios/piedras/${p.slug}`}>
                  <StoneChip className="hover:bg-detalle/40" color={p.color} nombre={p.nombre} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

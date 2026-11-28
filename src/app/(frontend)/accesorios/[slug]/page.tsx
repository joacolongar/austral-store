import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { FichaInteractiva, type PuntoFoto } from '@/components/accesorios/FichaInteractiva'
import { GrillaPiedras } from '@/components/accesorios/TarjetaPiedra'
import { Badge, Button, formatoPrecio } from '@/components/ui'
import { cuidadosAccesorios, linkWhatsApp } from '@/config/marca'
import { aFoto, aPiedraPublica, type PiedraPublica } from '@/lib/catalogo'
import { buscarPiedras, buscarPieza } from '@/lib/consultas'
import type { Piedra } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

const tipos: Record<string, { singular: string; plural: string }> = {
  collar: { singular: 'collar', plural: 'Collares' },
  pulsera: { singular: 'pulsera', plural: 'Pulseras' },
  aros: { singular: 'aros', plural: 'Aros' },
  tobillera: { singular: 'tobillera', plural: 'Tobilleras' },
  anillo: { singular: 'anillo', plural: 'Anillos' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pieza = await buscarPieza((await params).slug)
  if (!pieza) return { title: 'Pieza no encontrada · Austral Store' }
  const foto = aFoto(pieza.fotos?.[0])
  return {
    title: `${pieza.nombre} · Accesorios · Austral Store`,
    description:
      pieza.descripcion?.slice(0, 160) ||
      `${pieza.nombre}: pieza única hecha a mano con piedras naturales.`,
    openGraph: foto ? { images: [{ url: foto.url, alt: foto.alt }] } : undefined,
  }
}

async function urlActual(slug: string) {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const proto = h.get('x-forwarded-proto') ?? 'https'
  return host ? `${proto}://${host}/accesorios/${slug}` : ''
}

export default async function PiezaPage({ params }: Props) {
  const { slug } = await params
  const [pieza, guia] = await Promise.all([buscarPieza(slug), buscarPiedras()])
  if (!pieza) notFound()

  const tipo = tipos[pieza.tipo] ?? { singular: 'pieza', plural: 'Accesorios' }
  const vendida = pieza.estado === 'vendida'
  const fotos = (pieza.fotos ?? []).map(aFoto).filter((f) => f !== null)

  // Piedras sin repetir (una piedra puede estar marcada varias veces sobre la foto).
  const filas = (pieza.piedras ?? []).filter(
    (f): f is typeof f & { piedra: Piedra } => typeof f.piedra === 'object' && f.piedra !== null,
  )
  const piedras: PiedraPublica[] = []
  for (const f of filas) {
    const p = aPiedraPublica(f.piedra)
    if (!piedras.some((x) => x.slug === p.slug)) piedras.push(p)
  }
  const puntos: PuntoFoto[] = filas.map((f) => ({
    slug: f.piedra.slug ?? String(f.piedra.id),
    x: f.x,
    y: f.y,
  }))

  const url = await urlActual(slug)
  const precio = formatoPrecio(pieza.precio)
  const comprar = linkWhatsApp(
    `¡Hola! Quiero comprar "${pieza.nombre}" (${precio}).${url ? ` ${url}` : ''}`,
  )
  const consultar = linkWhatsApp(
    vendida
      ? `¡Hola! Vi que "${pieza.nombre}" ya se vendió. ¿Tienen algo parecido?${url ? ` ${url}` : ''}`
      : `¡Hola! Tengo una consulta sobre "${pieza.nombre}".${url ? ` ${url}` : ''}`,
  )

  const encabezado = (
    <div className="flex flex-col gap-3 lg:gap-4">
      <Badge className="self-start">{vendida ? 'Vendida' : 'Pieza única · hecha a mano'}</Badge>
      <h1 className="font-display text-[28px] leading-none uppercase sm:text-[40px] lg:text-[44px]">
        {pieza.nombre}
      </h1>
      <p
        className={
          vendida ? 'text-2xl font-semibold line-through opacity-60' : 'text-2xl font-semibold'
        }
      >
        {precio}
      </p>
      {pieza.descripcion && (
        <p className="text-base whitespace-pre-line opacity-85">{pieza.descripcion}</p>
      )}
    </div>
  )

  const datos = [
    ['Materiales', pieza.materiales],
    ['Medidas', pieza.medidas],
    ['Cuidados', cuidadosAccesorios],
  ].filter((d): d is [string, string] => Boolean(d[1]))

  const detalles = (
    <div className="flex flex-col gap-5 pt-1">
      <dl className="grid gap-2 text-[13px] sm:grid-cols-[120px_1fr] sm:gap-x-6 sm:text-sm">
        {datos.map(([titulo, texto]) => (
          <div className="contents" key={titulo}>
            <dt className="font-semibold">{titulo}</dt>
            <dd className="-mt-1.5 opacity-85 sm:mt-0">{texto}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-3 sm:flex-row">
        {!vendida && (
          <div className="hidden lg:block">
            <Button href={comprar} rel="noopener" target="_blank">
              Comprar por WhatsApp
            </Button>
          </div>
        )}
        <Button href={consultar} rel="noopener" target="_blank" variante="secundario">
          {vendida ? 'Pedir una parecida por WhatsApp' : 'Hacer una consulta'}
        </Button>
      </div>
    </div>
  )

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col px-4 pt-1 pb-6 text-texto sm:px-10 sm:pt-2">
      <nav aria-label="Ruta" className="hidden pb-4 text-xs opacity-75 sm:block">
        <Link className="hover:underline" href="/accesorios">
          Accesorios
        </Link>
        {'  /  '}
        <Link className="hover:underline" href={`/accesorios?tipo=${pieza.tipo}`}>
          {tipo.plural}
        </Link>
        {'  /  '}
        <span>{pieza.nombre}</span>
      </nav>

      <FichaInteractiva
        detalles={detalles}
        encabezado={encabezado}
        fotos={fotos}
        nombre={pieza.nombre}
        piedras={piedras}
        puntos={puntos}
        tipoTexto={tipo.singular}
      />

      <section
        aria-labelledby="guia-titulo"
        className="flex flex-col gap-4 py-12 sm:gap-5 sm:py-20"
      >
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-semibold tracking-etiqueta uppercase opacity-70 sm:text-xs">
            Guía de piedras
          </p>
          <h2
            className="font-display text-[28px] leading-none uppercase sm:text-[40px]"
            id="guia-titulo"
          >
            Las piedras que usamos
          </h2>
        </div>
        <GrillaPiedras piedras={guia} />
      </section>

      {/* Barra fija de compra en celular (Figma "Barra fija de compra"). */}
      {!vendida && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 bg-fondo px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_0_color-mix(in_srgb,var(--texto)_12%,transparent)] lg:hidden"
          data-barra-compra
        >
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold">{precio}</span>
            <span className="text-xs opacity-70">Pieza única</span>
          </div>
          <Button className="flex-1" href={comprar} rel="noopener" target="_blank">
            Comprar por WhatsApp
          </Button>
        </div>
      )}
    </main>
  )
}

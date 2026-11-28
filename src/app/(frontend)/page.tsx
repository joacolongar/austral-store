import { getPayload } from 'payload'
import React from 'react'

import { BloqueHero } from '@/components/home/BloqueHero'
import { Novedades, type ProductoNovedad } from '@/components/home/Novedades'
import { campanaAccesorios, secciones } from '@/config/marca'
import config from '@/payload.config'
import { aFoto } from '@/lib/catalogo'
import type { Producto } from '@/payload-types'

export const metadata = {
  title: 'Austral Store · Accesorios hechos a mano y deportes',
  description:
    'Collares y pulseras únicos con piedras naturales e hilo encerado, y ropa para entrenar al aire libre.',
}

const DIAS_NUEVO = 30

function aNovedad(p: Producto): ProductoNovedad {
  const dias = (Date.now() - new Date(p.createdAt).getTime()) / 86_400_000
  const seccion = p.mundo === 'deportes' ? 'deportes' : 'accesorios'
  return {
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    href: `/${seccion}/${p.slug ?? p.id}`,
    mundo: p.mundo,
    tipo: p.tipo,
    foto: aFoto(p.fotos?.[0]) ?? undefined,
    badge: p.mundo === 'bijouterie' ? 'Pieza única' : dias <= DIAS_NUEVO ? 'Nuevo' : undefined,
    vendida: p.estado === 'vendida',
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config: await config })
  const [inicio, productos] = await Promise.all([
    payload.findGlobal({ slug: 'inicio', depth: 1 }),
    payload.find({
      collection: 'productos',
      where: {
        estado: { not_equals: 'borrador' },
        // Deportes está en "Próximamente": sus productos no se muestran.
        ...(secciones.deportes ? {} : { mundo: { equals: 'bijouterie' } }),
      },
      sort: ['-destacado', '-createdAt'],
      limit: 24,
      depth: 1,
      overrideAccess: false,
    }),
  ])

  return (
    <main>
      <h1 className="sr-only">Austral Store: accesorios hechos a mano y deportes</h1>
      <div className="mx-auto grid max-w-[1440px] gap-3 px-4 pt-1 pb-6 sm:px-10 sm:pt-2 lg:grid-cols-2 lg:gap-5">
        <BloqueHero
          boton="Ver accesorios"
          bajada="Collares y pulseras únicos, con piedras naturales e hilo encerado. Cada piedra cuenta algo."
          etiqueta="01 · Hecho a mano"
          fotos={((f) => (f ? [f] : campanaAccesorios))(aFoto(inicio.fotoAccesorios))}
          href="/accesorios"
          titulo={['Accesorios', 'con significado']}
          tono="detalle"
        />
        <BloqueHero
          boton="Ver deportes"
          bajada="Ropa y accesorios para entrenar, correr y moverte al aire libre."
          etiqueta="02 · Austral Sport"
          fotos={((f) => (f ? [f] : []))(aFoto(inicio.fotoDeportes))}
          href="/deportes"
          proximamente={!secciones.deportes}
          titulo={['Deportes', 'para el verano']}
          tono="primario"
        />
      </div>
      <Novedades productos={productos.docs.map(aNovedad)} soloAccesorios={!secciones.deportes} />
    </main>
  )
}

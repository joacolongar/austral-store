import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'

import { CintaAnuncios } from './CintaAnuncios'
import { Footer } from './Footer'
import { Header } from './Header'
import { WhatsAppFlotante } from './WhatsAppFlotante'

async function leerAnuncios(): Promise<string[]> {
  try {
    const payload = await getPayload({ config: await config })
    const inicio = await payload.findGlobal({ slug: 'inicio', depth: 0 })
    return (inicio.anuncios ?? []).map((a) => a.texto).filter(Boolean)
  } catch (error) {
    // Si la base no responde, la página igual se muestra (sin cinta).
    console.error('No se pudo leer la cinta de anuncios', error)
    return []
  }
}

/** Marco común de todas las páginas públicas: cinta, header, contenido, footer y WhatsApp. */
export async function MarcoSitio({ children }: { children: React.ReactNode }) {
  const anuncios = await leerAnuncios()

  return (
    <div className="flex min-h-dvh flex-col">
      <CintaAnuncios anuncios={anuncios} />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <WhatsAppFlotante />
    </div>
  )
}

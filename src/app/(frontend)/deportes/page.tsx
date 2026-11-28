import React from 'react'

import { Button } from '@/components/ui'
import { linkWhatsApp } from '@/config/marca'

export const metadata = {
  title: 'Deportes · Próximamente · Austral Store',
  description: 'La sección de deportes de Austral Store llega pronto.',
}

// Deportes está en "Próximamente" (decisión de joaco, 2026-11-28). El catálogo llega con #8.
export default function DeportesPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 pt-1 pb-10 sm:px-10 sm:pt-2">
      <section className="flex flex-col items-start gap-4 rounded-[24px] bg-primario px-6 py-10 text-sobre-primario sm:gap-6 sm:rounded-[28px] sm:p-16">
        <p className="text-[11px] font-medium tracking-[0.14em] uppercase sm:text-xs">
          02 · Austral Sport
        </p>
        <h1 className="font-display text-[32px] leading-[0.95] uppercase sm:text-7xl">
          Deportes
          <br />
          Próximamente
        </h1>
        <p className="max-w-[520px] text-base opacity-85 sm:text-lg">
          Estamos preparando ropa y accesorios para entrenar, correr y moverte al aire libre.
          Mientras tanto, mirá los accesorios hechos a mano.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/accesorios" variante="detalle">
            Ver accesorios
          </Button>
          <Button
            href={linkWhatsApp('¡Hola! Quiero saber cuándo llega la sección de deportes.')}
            target="_blank"
            rel="noopener"
            variante="secundarioClaro"
          >
            Avisame por WhatsApp
          </Button>
        </div>
      </section>
    </main>
  )
}

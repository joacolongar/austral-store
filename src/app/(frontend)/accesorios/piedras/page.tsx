import Link from 'next/link'
import React from 'react'

import { GrillaPiedras } from '@/components/accesorios/TarjetaPiedra'
import { buscarPiedras } from '@/lib/consultas'

export const metadata = {
  title: 'Guía de piedras · Accesorios · Austral Store',
  description:
    'Qué significa cada piedra natural que usamos en nuestros collares, pulseras y aros hechos a mano.',
}

export default async function GuiaPiedrasPage() {
  const piedras = await buscarPiedras()

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 pt-4 pb-12 sm:gap-5 sm:px-10 sm:pt-10 sm:pb-20">
      <nav
        aria-label="Ruta"
        className="text-[11px] font-semibold tracking-etiqueta uppercase opacity-70 sm:text-xs"
      >
        <Link className="hover:underline" href="/accesorios">
          Accesorios
        </Link>{' '}
        / Guía de piedras
      </nav>
      <h1 className="font-display text-[32px] leading-none text-texto uppercase sm:text-[40px]">
        Las piedras que usamos
      </h1>
      <p className="max-w-[620px] text-base opacity-85">
        Cada pieza lleva piedras naturales elegidas por lo que transmiten. Tocá una para ver qué
        significa y en qué piezas está.
      </p>
      <div className="pt-2">
        <GrillaPiedras piedras={piedras} />
      </div>
    </main>
  )
}

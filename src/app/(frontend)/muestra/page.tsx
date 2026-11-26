import React from 'react'

import { Demo } from './Demo'

export const metadata = {
  title: 'Muestra de componentes · Austral Store',
  robots: { index: false },
}

// Página interna para revisar tokens y componentes base (#4). No se enlaza desde el menú.
export default function MuestraPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <p className="text-xs font-semibold tracking-etiqueta text-acento uppercase">Interno</p>
      <h1 className="mt-2 font-display text-4xl uppercase sm:text-5xl">Muestra</h1>
      <p className="mt-3 max-w-prose">
        Tokens y componentes base del Figma, para revisarlos en celular y compu.
      </p>
      <Demo />
    </main>
  )
}

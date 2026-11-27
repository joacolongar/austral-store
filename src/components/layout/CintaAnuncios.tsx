'use client'

import React, { useEffect, useState } from 'react'

/** Franja de anuncios: en compu se ven todos; en celular, uno a la vez. */
export function CintaAnuncios({ anuncios }: { anuncios: string[] }) {
  const [actual, setActual] = useState(0)

  useEffect(() => {
    if (anuncios.length < 2) return
    const id = setInterval(() => setActual((i) => (i + 1) % anuncios.length), 4000)
    return () => clearInterval(id)
  }, [anuncios.length])

  if (anuncios.length === 0) return null

  return (
    <div
      aria-label="Anuncios"
      className="bg-primario text-sobre-primario text-[11px] leading-none font-medium tracking-cinta uppercase sm:text-xs"
      role="region"
    >
      <p aria-live="polite" className="px-4 py-[10.5px] text-center sm:hidden">
        {anuncios[actual]}
      </p>
      <ul className="hidden justify-center gap-12 px-10 py-[13px] sm:flex">
        {anuncios.map((a) => (
          <li className="whitespace-nowrap" key={a}>
            {a}
          </li>
        ))}
      </ul>
    </div>
  )
}

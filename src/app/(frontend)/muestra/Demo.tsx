'use client'

import React, { useState } from 'react'

import { Button, Pill, ProductCard, StoneChip } from '@/components/ui'

const filtros = ['Todo', 'Collares', 'Pulseras', 'Aros', 'Tobilleras']

// Colores de ejemplo: los reales los carga la editora en cada piedra.
const piedras = [
  { nombre: 'Amatista', color: '#9b6fc4' },
  { nombre: 'Cuarzo rosa', color: '#f3c4cf' },
  { nombre: 'Ojo de tigre', color: '#b5812f' },
  { nombre: 'Turquesa', color: '#3fb8af' },
]

const colores = [
  { token: 'fondo', clase: 'bg-fondo' },
  { token: 'superficie', clase: 'bg-superficie' },
  { token: 'primario / texto', clase: 'bg-primario' },
  { token: 'detalle', clase: 'bg-detalle' },
  { token: 'acento', clase: 'bg-acento' },
]

function Seccion({
  numero,
  titulo,
  children,
}: {
  numero: string
  titulo: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-5 border-t border-texto/15 py-10">
      <h2 className="text-xs font-medium tracking-etiqueta uppercase">
        {numero} / {titulo}
      </h2>
      {children}
    </section>
  )
}

export function Demo() {
  const [filtro, setFiltro] = useState('Todo')
  const [piedra, setPiedra] = useState<string | null>('Amatista')

  return (
    <>
      <Seccion numero="01" titulo="Colores">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {colores.map((c) => (
            <li className="flex flex-col gap-2" key={c.token}>
              <span className={`h-16 rounded-foto border border-texto/15 ${c.clase}`} />
              <span className="text-sm">{c.token}</span>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion numero="02" titulo="Tipografías">
        <p className="font-display text-4xl leading-none uppercase sm:text-6xl">Austral Store</p>
        <p className="max-w-prose text-base">
          DM Sans para menú, botones y textos. Archivo Black para títulos, con el peso del logo.
        </p>
      </Seccion>

      <Seccion numero="03" titulo="Botones">
        <div className="flex flex-wrap gap-3">
          <Button>Agregar a la bolsa</Button>
          <Button variante="secundario">Consultar por WhatsApp</Button>
          <Button disabled>Sin stock</Button>
        </div>
      </Seccion>

      <Seccion numero="04" titulo="Filtros">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {filtros.map((f) => (
            <Pill activa={filtro === f} key={f} onClick={() => setFiltro(f)}>
              {f}
            </Pill>
          ))}
        </div>
      </Seccion>

      <Seccion numero="05" titulo="Piedras">
        <div className="flex flex-wrap gap-2">
          {piedras.map((p) => (
            <StoneChip
              activa={piedra === p.nombre}
              color={p.color}
              key={p.nombre}
              nombre={p.nombre}
              onClick={() => setPiedra(piedra === p.nombre ? null : p.nombre)}
            />
          ))}
        </div>
      </Seccion>

      <Seccion numero="06" titulo="Cards de producto">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <ProductCard
            badge="Pieza única"
            href="#"
            nombre="Collar Amatista y cuarzo"
            precio={18500}
          />
          <ProductCard badge="Nuevo" href="#" nombre="Pulsera Ojo de tigre" precio={12900} />
          <ProductCard href="#" nombre="Aros Turquesa" precio={9800} vendida />
        </div>
      </Seccion>

      <div data-seccion="deportes">
        <Seccion numero="07" titulo="Tema Deportes">
          <p className="text-sm">
            Los componentes dentro de <code>data-seccion=&quot;deportes&quot;</code> toman el tema
            de esa sección.
          </p>
          <div className="flex flex-wrap gap-3">
            <Pill activa>Running</Pill>
            <Pill>Fútbol</Pill>
            <Button>Comprar</Button>
          </div>
        </Seccion>
      </div>
    </>
  )
}

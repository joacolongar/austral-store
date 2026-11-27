import type { AdminViewServerProps } from 'payload'

import { Gutter } from '@payloadcms/ui'
import React from 'react'

import './selector-seccion.css'

type Destino = { texto: string; href: string; cantidad?: number }
type Seccion = { titulo: string; bajada: string; destinos: Destino[]; proximamente?: boolean }

const listaProductos = (mundo: string) =>
  `/admin/collections/productos?where%5Bmundo%5D%5Bequals%5D=${mundo}`

/** Pantalla de entrada del panel: primero se elige qué sección de la web se va a editar. */
export async function SelectorSeccion({ initPageResult }: AdminViewServerProps) {
  const { payload, user } = initPageResult.req
  const contar = async (mundo: string) =>
    (await payload.count({ collection: 'productos', where: { mundo: { equals: mundo } }, user }))
      .totalDocs

  const [accesorios, deportes, piedras] = await Promise.all([
    contar('bijouterie'),
    contar('deportes'),
    payload.count({ collection: 'piedras', user }).then((r) => r.totalDocs),
  ])

  const secciones: Seccion[] = [
    {
      titulo: 'Accesorios',
      bajada: 'Piezas artesanales y guía de piedras',
      destinos: [
        { texto: 'Piezas', href: listaProductos('bijouterie'), cantidad: accesorios },
        { texto: 'Piedras', href: '/admin/collections/piedras', cantidad: piedras },
        { texto: 'Nueva pieza', href: '/admin/collections/productos/create' },
      ],
    },
    {
      titulo: 'Deportes',
      bajada: 'Productos de la sección deportes',
      destinos: [
        { texto: 'Productos', href: listaProductos('deportes'), cantidad: deportes },
        { texto: 'Nuevo producto', href: '/admin/collections/productos/create' },
      ],
    },
    {
      titulo: 'Inicio',
      bajada: 'Cinta de anuncios y destacados de la home',
      destinos: [{ texto: 'Editar inicio', href: '/admin/globals/inicio' }],
    },
    { titulo: 'Pedidos', bajada: 'Compras y consultas', destinos: [], proximamente: true },
  ]

  const nombre = (user as { nombre?: string | null } | null)?.nombre

  return (
    <Gutter className="selector-seccion">
      <p className="selector-seccion__hola">Hola{nombre ? `, ${nombre}` : ''}</p>
      <h1 className="selector-seccion__titulo">¿Qué querés editar?</h1>
      <ul className="selector-seccion__grilla">
        {secciones.map((s) => (
          <li
            className="selector-seccion__card"
            data-proximamente={s.proximamente || undefined}
            key={s.titulo}
          >
            <h2>{s.titulo}</h2>
            <p>{s.bajada}</p>
            {s.proximamente ? (
              <span className="selector-seccion__pronto">Próximamente</span>
            ) : (
              <div className="selector-seccion__links">
                {s.destinos.map((d) => (
                  <a href={d.href} key={d.texto}>
                    {d.texto}
                    {typeof d.cantidad === 'number' && <span>{d.cantidad}</span>}
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </Gutter>
  )
}

'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import { navegacion } from '@/config/marca'
import { Logo } from '@/components/ui'

const itemMenu = 'text-[13px] leading-none font-semibold tracking-menu uppercase hover:opacity-70'

/** Header flotante redondeado del Figma: menú a la izquierda, logo al centro, acciones a la derecha. */
export function Header() {
  const [abierto, setAbierto] = useState(false)
  const [tiendaAbierta, setTiendaAbierta] = useState(false)
  const tiendaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tiendaAbierta) return
    const cerrar = (e: MouseEvent) => {
      if (!tiendaRef.current?.contains(e.target as Node)) setTiendaAbierta(false)
    }
    document.addEventListener('click', cerrar)
    return () => document.removeEventListener('click', cerrar)
  }, [tiendaAbierta])

  // Al tocar un link se cierran los menús.
  const cerrarAlNavegar = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) {
      setAbierto(false)
      setTiendaAbierta(false)
    }
  }

  return (
    <header
      className="sticky top-0 z-40 px-4 py-3 sm:px-10 sm:py-5"
      onClickCapture={cerrarAlNavegar}
    >
      <div className="relative rounded-header-movil bg-superficie text-texto sm:rounded-header">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-[18px] py-2.5 sm:px-8 sm:py-3.5">
          {/* Izquierda */}
          <div className="flex items-center">
            <button
              aria-controls="menu-movil"
              aria-expanded={abierto}
              className={`${itemMenu} text-xs sm:hidden`}
              onClick={() => setAbierto((v) => !v)}
              type="button"
            >
              {abierto ? 'Cerrar' : 'Menú'}
            </button>
            <nav aria-label="Principal" className="hidden items-center gap-7 sm:flex">
              <div className="relative" ref={tiendaRef}>
                <button
                  aria-expanded={tiendaAbierta}
                  aria-haspopup="true"
                  className={itemMenu}
                  onClick={() => setTiendaAbierta((v) => !v)}
                  type="button"
                >
                  Tienda{' '}
                  <span aria-hidden="true" className="ml-1 text-[9px]">
                    ▾
                  </span>
                </button>
                {tiendaAbierta && (
                  <ul className="absolute top-full left-0 mt-4 flex min-w-48 flex-col gap-1 rounded-card bg-superficie p-3 shadow-lg">
                    {navegacion.tienda.map((l) => (
                      <li key={l.href}>
                        <Link
                          className="block rounded-foto px-3 py-2 text-sm hover:bg-fondo"
                          href={l.href}
                        >
                          {l.texto}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Link className={itemMenu} href="/accesorios">
                Accesorios
              </Link>
              <Link className={itemMenu} href="/deportes">
                Deportes
              </Link>
            </nav>
          </div>

          {/* Centro */}
          <Link aria-label="Austral Store, ir al inicio" href="/">
            <Logo className="w-[104px] sm:w-[150px]" />
          </Link>

          {/* Derecha */}
          <div className="flex items-center justify-end gap-7">
            <Link className={`${itemMenu} hidden sm:inline`} href="/buscar">
              Buscar
            </Link>
            <Link className={`${itemMenu} hidden sm:inline`} href="/cuenta">
              Cuenta
            </Link>
            <Link className={`${itemMenu} text-xs sm:text-[13px]`} href="/bolsa">
              Bolsa (0)
            </Link>
          </div>
        </div>

        {/* Menú del celular */}
        {abierto && (
          <nav
            aria-label="Menú"
            className="border-t border-texto/15 px-[18px] pt-2 pb-4 sm:hidden"
            id="menu-movil"
          >
            <ul className="flex flex-col">
              {[
                ...navegacion.tienda,
                { texto: 'Buscar', href: '/buscar' },
                { texto: 'Cuenta', href: '/cuenta' },
              ].map((l) => (
                <li key={l.href}>
                  <Link className="block py-2.5 text-base font-semibold" href={l.href}>
                    {l.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

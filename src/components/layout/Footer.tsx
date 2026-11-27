import Link from 'next/link'
import React from 'react'

import { linkInstagram, linkWhatsApp, marca, navegacion } from '@/config/marca'
import { Logo } from '@/components/ui'

function Columna({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-xs font-semibold tracking-cinta uppercase">{titulo}</h2>
      <ul className="text-sm leading-[1.7] opacity-80">{children}</ul>
    </div>
  )
}

const enlace = 'hover:underline'

export function Footer() {
  const contacto = [
    { texto: 'WhatsApp', href: linkWhatsApp() },
    { texto: 'Instagram', href: linkInstagram() },
    ...(marca.email ? [{ texto: marca.email, href: `mailto:${marca.email}` }] : []),
  ]

  return (
    <footer className="bg-superficie text-texto">
      {/* Celular */}
      <div className="flex flex-col gap-4 px-4 pt-8 pb-10 sm:hidden">
        <Logo className="w-[150px]" titulo={marca.nombre} />
        <div className="text-sm leading-[1.6] opacity-80">
          <p>
            <Link className={enlace} href="/accesorios">
              Tienda
            </Link>
            {'  ·  '}
            <Link className={enlace} href="/ayuda/envios">
              Ayuda
            </Link>
            {'  ·  '}
            <a className={enlace} href={linkWhatsApp()} rel="noopener" target="_blank">
              Contacto
            </a>
          </p>
          <a className={enlace} href={linkInstagram()} rel="noopener" target="_blank">
            @{marca.instagram}
          </a>
        </div>
      </div>

      {/* Compu */}
      <div className="mx-auto hidden max-w-[1440px] items-start justify-between px-10 py-12 sm:flex">
        <div className="flex flex-col gap-3">
          <Logo className="w-[200px]" titulo={marca.nombre} />
          <div className="text-sm opacity-80">
            <p>Accesorios hechos a mano y deportes.</p>
            <a className={enlace} href={linkInstagram()} rel="noopener" target="_blank">
              @{marca.instagram}
            </a>
          </div>
        </div>
        <Columna titulo="Tienda">
          <li>
            <Link className={enlace} href="/accesorios">
              Accesorios
            </Link>
          </li>
          <li>
            <Link className={enlace} href="/deportes">
              Deportes
            </Link>
          </li>
        </Columna>
        <Columna titulo="Ayuda">
          {navegacion.ayuda.map((l) => (
            <li key={l.href}>
              <Link className={enlace} href={l.href}>
                {l.texto}
              </Link>
            </li>
          ))}
        </Columna>
        <Columna titulo="Contacto">
          {contacto.map((l) => (
            <li key={l.texto}>
              <a className={enlace} href={l.href} rel="noopener" target="_blank">
                {l.texto}
              </a>
            </li>
          ))}
        </Columna>
      </div>
    </footer>
  )
}

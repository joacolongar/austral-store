import { Archivo_Black, DM_Sans } from 'next/font/google'
import React from 'react'

import { MarcoSitio } from '@/components/layout/MarcoSitio'

import './styles.css'

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// La cinta de anuncios se lee de la base en cada pedido (la edita la editora desde el panel).
export const dynamic = 'force-dynamic'

export const metadata = {
  description: 'Deportes y accesorios artesanales.',
  title: 'Austral Store',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es" className={`${archivoBlack.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <MarcoSitio>{children}</MarcoSitio>
      </body>
    </html>
  )
}

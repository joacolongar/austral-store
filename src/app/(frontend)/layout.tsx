import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Deportes y accesorios artesanales.',
  title: 'Austral Store',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

// Prototipo del issue #2: prueba que lo que se sube desde /admin (D1 + R2) se ve en una página pública.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config: await config })
  const media = await payload.find({ collection: 'media', limit: 12, sort: '-createdAt' })

  return (
    <main className="home">
      <header className="hero">
        <p className="eyebrow">Prototipo</p>
        <h1>Austral Store</h1>
        <p>Las fotos que se suben desde el panel aparecen acá.</p>
        <Link className="button" href="/admin">
          Ir al panel
        </Link>
      </header>

      <section className="grid" aria-label="Últimas fotos">
        {media.docs.length === 0 && <p>Todavía no hay fotos. Subí una desde el panel.</p>}
        {media.docs.map((doc) =>
          doc.url ? (
            <figure className="card" key={doc.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={doc.alt} src={doc.url} />
              <figcaption>{doc.alt}</figcaption>
            </figure>
          ) : null,
        )}
      </section>
    </main>
  )
}

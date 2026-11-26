import { getPayload } from 'payload'
import React from 'react'

import { Button, Logo } from '@/components/ui'
import config from '@/payload.config'

// Home provisoria (la real llega en #7): muestra las fotos que se suben desde /admin.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config: await config })
  const media = await payload.find({ collection: 'media', limit: 12, sort: '-createdAt' })

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
      <header>
        <p className="text-xs font-semibold tracking-etiqueta text-acento uppercase">Prototipo</p>
        <h1 className="mt-3">
          <Logo className="w-64 sm:w-96" />
        </h1>
        <p className="mt-3">Las fotos que se suben desde el panel aparecen acá.</p>
        <Button className="mt-5" href="/admin">
          Ir al panel
        </Button>
      </header>

      <section
        aria-label="Últimas fotos"
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {media.docs.length === 0 && <p>Todavía no hay fotos. Subí una desde el panel.</p>}
        {media.docs.map((doc) =>
          doc.url ? (
            <figure className="overflow-hidden rounded-card bg-superficie p-3" key={doc.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={doc.alt}
                className="aspect-square w-full rounded-foto object-cover"
                src={doc.url}
              />
              <figcaption className="pt-2.5 text-sm">{doc.alt}</figcaption>
            </figure>
          ) : null,
        )}
      </section>
    </main>
  )
}

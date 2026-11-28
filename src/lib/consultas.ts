import { getPayload, type Where } from 'payload'

import config from '@/payload.config'

import { aPiedraPublica, aPiezaCatalogo } from './catalogo'

const piezasPublicas: Where = {
  mundo: { equals: 'bijouterie' },
  estado: { not_equals: 'borrador' },
}

/** Piezas de accesorios visibles en la web: primero las disponibles, después las destacadas y las nuevas. */
export async function buscarPiezas(where: Where = {}) {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'productos',
    where: { and: [piezasPublicas, where] },
    sort: ['estado', '-destacado', '-createdAt'],
    limit: 200,
    depth: 2,
    overrideAccess: false,
  })
  return docs.map(aPiezaCatalogo)
}

/** Todas las piedras de la guía, en orden alfabético. */
export async function buscarPiedras() {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'piedras',
    sort: 'nombre',
    limit: 200,
    depth: 0,
    overrideAccess: false,
  })
  return docs.map(aPiedraPublica)
}

export async function buscarPiedra(slug: string) {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'piedras',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })
  return docs[0] ?? null
}

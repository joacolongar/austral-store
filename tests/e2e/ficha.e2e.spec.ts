import { devices, expect, test } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload, type Payload } from 'payload'

import config from '../../src/payload.config.js'

// Issue #10: la ficha de una pieza en el celular, con los puntos de las piedras sobre la foto.
test.use({ ...devices['iPhone 13'], defaultBrowserType: 'chromium' })

const sufijo = Date.now().toString(36)
const nombre = `Collar prueba ${sufijo}`
let payload: Payload
const creados: { piedras: number[]; media?: number; producto?: number } = { piedras: [] }

test.beforeAll(async () => {
  payload = await getPayload({ config })
  const [amatista, cuarzo] = await Promise.all(
    [
      {
        nombre: `Amatista ${sufijo}`,
        color: '#9b6fc4',
        significado: 'Calma, intuición y descanso.',
      },
      { nombre: `Cuarzo ${sufijo}`, color: '#f4b6c2', significado: 'Amor propio y ternura.' },
    ].map((data) => payload.create({ collection: 'piedras', data })),
  )
  creados.piedras.push(amatista.id, cuarzo.id)
  const archivo = path.resolve('public/campana/collar-fluorita.webp')
  const foto = await payload.create({
    collection: 'media',
    data: { alt: 'Collar de prueba' },
    file: {
      data: fs.readFileSync(archivo),
      mimetype: 'image/webp',
      name: `prueba-${sufijo}.webp`,
      size: fs.statSync(archivo).size,
    },
  })
  creados.media = foto.id
  const producto = await payload.create({
    collection: 'productos',
    data: {
      nombre,
      mundo: 'bijouterie',
      tipo: 'collar',
      precio: 18500,
      estado: 'disponible',
      stock: 1,
      fotos: [foto.id],
      piedras: [
        { piedra: amatista.id, x: 30, y: 60 },
        { piedra: cuarzo.id, x: 70, y: 40 },
      ],
    },
  })
  creados.producto = producto.id
})

test.afterAll(async () => {
  if (creados.producto) await payload.delete({ collection: 'productos', id: creados.producto })
  if (creados.media) await payload.delete({ collection: 'media', id: creados.media })
  for (const id of creados.piedras) await payload.delete({ collection: 'piedras', id })
})

test('al tocar un punto se abre la tarjeta de su piedra', async ({ page }) => {
  const producto = await payload.findByID({ collection: 'productos', id: creados.producto! })
  await page.goto(`http://localhost:3000/accesorios/${producto.slug}`)

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(nombre)
  await expect(page.locator('[data-punto]')).toHaveCount(2)
  await expect(page.locator('[data-tira-piedras] li')).toHaveCount(2)

  const tarjeta = page.locator('[data-tarjeta-piedra]:visible')
  await expect(tarjeta.getByRole('heading')).toHaveText(`Amatista ${sufijo}`)

  await page.getByRole('button', { name: `Ver Cuarzo ${sufijo}` }).click()
  await expect(tarjeta.getByRole('heading')).toHaveText(`Cuarzo ${sufijo}`)
  await expect(tarjeta).toContainText('Amor propio y ternura.')

  await tarjeta.getByRole('link').click()
  await expect(page).toHaveURL(/\/accesorios\/piedras\/cuarzo-/)
  await expect(page.getByText(nombre)).toBeVisible()
})

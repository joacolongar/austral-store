import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-d1-sqlite'

// Frases genéricas para la cinta de anuncios (pedido de joaco, 2026-11-27).
// Solo se cargan si la cinta está vacía; después se editan desde el panel (Inicio).
const FRASES = [
  'Piezas únicas hechas a mano',
  'Accesorios artesanales y deportes',
  'Consultanos por WhatsApp',
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const inicio = await payload.findGlobal({ slug: 'inicio', depth: 0, req })
  if ((inicio.anuncios ?? []).length > 0) return
  await payload.updateGlobal({
    slug: 'inicio',
    data: { anuncios: FRASES.map((texto) => ({ texto })) },
    req,
  })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  const inicio = await payload.findGlobal({ slug: 'inicio', depth: 0, req })
  const restantes = (inicio.anuncios ?? []).filter((a) => !FRASES.includes(a.texto))
  await payload.updateGlobal({ slug: 'inicio', data: { anuncios: restantes }, req })
}

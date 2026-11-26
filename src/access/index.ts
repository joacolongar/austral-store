import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export const esAdmin = (user: unknown): boolean => (user as User | null)?.rol === 'admin'

/** Cualquier usuario logueado (admin o editora). */
export const logueado: Access = ({ req }) => Boolean(req.user)

export const soloAdmin: Access = ({ req }) => esAdmin(req.user)

export const soloAdminCampo: FieldAccess = ({ req }) => esAdmin(req.user)

/** Admin ve y edita a todos; cada usuario solo a sí mismo. */
export const adminOSiMismo: Access = ({ req }) => {
  if (!req.user) return false
  if (esAdmin(req.user)) return true
  return { id: { equals: req.user.id } }
}

/** Público: solo lo publicado. Logueado: todo, incluidos borradores. */
export const publicadoOLogueado: Access = ({ req }) => {
  if (req.user) return true
  return { estado: { not_equals: 'borrador' } }
}

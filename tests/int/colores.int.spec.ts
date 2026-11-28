import { describe, expect, it } from 'vitest'

import { familiaDeColor } from '@/lib/colores'

// Colores de las piedras del Figma ("Guía de piedras").
describe('familiaDeColor', () => {
  it.each([
    ['#9b6fc4', 'violeta'], // amatista
    ['#f4b6c2', 'rosa'], // cuarzo rosa
    ['#e48a9c', 'rosa'], // rodocrosita
    ['#8b1e2e', 'rojo'], // granate
    ['#e0592a', 'naranja'], // cornalina
    ['#b07a2a', 'marron'], // ojo de tigre
    ['#5ec4b0', 'verde'], // amazonita
    ['#6db38a', 'verde'], // cuarzo verde
    ['#7fa8dc', 'azul'], // cuarzo azul
    ['#2f4f9f', 'azul'], // sodalita
    ['#f6f7f2', 'blanco'], // cuarzo cristal
    ['#efe8d8', 'blanco'], // jaspe dálmata
    ['#222222', 'negro'],
  ])('%s → %s', (hex, familia) => {
    expect(familiaDeColor(hex)).toBe(familia)
  })

  it('devuelve null si el color no es #RRGGBB', () => {
    expect(familiaDeColor('violeta')).toBeNull()
  })
})

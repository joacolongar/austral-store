'use client'

import { useForm, useFormFields } from '@payloadcms/ui'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import './marcar-piedras.css'

type PiedraLista = { id: number; nombre: string; color: string }
type Punto = { piedra: number | null; x: number; y: number }

const RUTA = 'piedras'
const redondear = (n: number) => Math.round(Math.min(100, Math.max(0, n)) * 10) / 10

/** Id de la primera foto, venga como número o como documento poblado. */
const idFoto = (valor: unknown): number | string | null => {
  const primera = Array.isArray(valor) ? valor[0] : null
  if (primera && typeof primera === 'object' && 'id' in primera)
    return (primera as { id: number }).id
  return typeof primera === 'number' || typeof primera === 'string' ? primera : null
}

const idPiedra = (valor: unknown): number | null => {
  if (valor && typeof valor === 'object' && 'id' in valor) return (valor as { id: number }).id
  return typeof valor === 'number' ? valor : null
}

/**
 * Editor del issue #11: la editora toca la foto principal para marcar cada piedra, elige cuál es
 * de la lista y puede arrastrar o borrar los puntos. Escribe en el array `piedras` (x/y en %),
 * que sigue abajo por si hace falta ajustar a mano.
 */
export function MarcarPiedras() {
  const { addFieldRow, dispatchFields, removeFieldRow, setModified } = useForm()
  const fotoId = useFormFields(([f]) => idFoto(f.fotos?.value))
  const puntos = useFormFields(([f]): Punto[] => {
    const filas = f[RUTA]?.rows ?? []
    return filas.map((_, i) => ({
      piedra: idPiedra(f[`${RUTA}.${i}.piedra`]?.value),
      x: Number(f[`${RUTA}.${i}.x`]?.value ?? 50),
      y: Number(f[`${RUTA}.${i}.y`]?.value ?? 50),
    }))
  })

  const [piedras, setPiedras] = useState<PiedraLista[]>([])
  const [fotoCargada, setFoto] = useState<{ id: number | string; url: string; alt: string } | null>(
    null,
  )
  const [elegido, setElegido] = useState<number | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const marco = useRef<HTMLDivElement>(null)
  const arrastre = useRef<{ i: number; x0: number; y0: number; movio: boolean } | null>(null)

  useEffect(() => {
    fetch('/api/piedras?limit=200&sort=nombre&depth=0', { credentials: 'include' })
      .then((r) => r.json())
      .then((r: { docs?: PiedraLista[] }) =>
        setPiedras((r.docs ?? []).map(({ id, nombre, color }) => ({ id, nombre, color }))),
      )
      .catch(() => setPiedras([]))
  }, [])

  useEffect(() => {
    if (fotoId === null) return
    fetch(`/api/media/${fotoId}?depth=0`, { credentials: 'include' })
      .then((r) => r.json())
      .then((m: { url?: string; alt?: string }) =>
        setFoto(m.url ? { id: fotoId, url: m.url, alt: m.alt ?? '' } : null),
      )
      .catch(() => setFoto(null))
  }, [fotoId])
  const foto = fotoCargada && fotoCargada.id === fotoId ? fotoCargada : null

  const porId = useMemo(() => new Map(piedras.map((p) => [p.id, p])), [piedras])
  const actual = elegido !== null && elegido < puntos.length ? puntos[elegido] : null

  const posicion = (e: { clientX: number; clientY: number }) => {
    const r = marco.current!.getBoundingClientRect()
    return {
      x: redondear(((e.clientX - r.left) / r.width) * 100),
      y: redondear(((e.clientY - r.top) / r.height) * 100),
    }
  }

  const actualizar = (path: string, value: unknown) => {
    dispatchFields({ type: 'UPDATE', path, value, valid: true })
    setModified(true)
  }

  const agregar = (e: React.MouseEvent) => {
    const { x, y } = posicion(e)
    const campo = (value: number) => ({
      initialValue: value,
      value,
      valid: true,
      passesCondition: true,
    })
    addFieldRow({
      path: RUTA,
      schemaPath: RUTA,
      subFieldState: { x: campo(x), y: campo(y) },
    })
    setElegido(puntos.length)
    setBusqueda('')
  }

  const borrar = (i: number) => {
    removeFieldRow({ path: RUTA, rowIndex: i })
    setElegido(null)
  }

  const visibles = piedras.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()),
  )

  return (
    <div className="marcar-piedras field-type">
      <p className="marcar-piedras__titulo">Marcá las piedras en la foto</p>

      {!foto ? (
        <p className="marcar-piedras__vacio">
          Primero subí la foto principal (la primera de “Fotos”) y vas a poder marcar las piedras
          acá.
        </p>
      ) : (
        <div className="marcar-piedras__marco" onClick={agregar} ref={marco}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={foto.alt} draggable={false} src={foto.url} />
          {puntos.map((p, i) => {
            const piedra = p.piedra !== null ? porId.get(p.piedra) : undefined
            return (
              <button
                aria-label={`Punto ${i + 1}${piedra ? `: ${piedra.nombre}` : ''}`}
                className="marcar-piedras__punto"
                data-elegido={elegido === i || undefined}
                data-sin-piedra={!piedra || undefined}
                key={i}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId)
                  arrastre.current = { i, x0: e.clientX, y0: e.clientY, movio: false }
                }}
                onPointerMove={(e) => {
                  const a = arrastre.current
                  if (!a || a.i !== i) return
                  if (!a.movio && Math.hypot(e.clientX - a.x0, e.clientY - a.y0) < 6) return
                  a.movio = true
                  const { x, y } = posicion(e)
                  actualizar(`${RUTA}.${i}.x`, x)
                  actualizar(`${RUTA}.${i}.y`, y)
                }}
                onPointerUp={() => {
                  const a = arrastre.current
                  arrastre.current = null
                  // Tocar o terminar de arrastrar deja ese punto elegido.
                  if (a) setElegido(i)
                }}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                type="button"
              >
                {i + 1}
              </button>
            )
          })}
          <span className="marcar-piedras__ayuda">
            {puntos.length === 0
              ? 'Tocá sobre la foto donde está cada piedra'
              : 'Tocá para sumar otra · arrastrá un número para moverlo'}
          </span>
        </div>
      )}

      {puntos.length > 0 && (
        <ul className="marcar-piedras__lista">
          {puntos.map((p, i) => {
            const piedra = p.piedra !== null ? porId.get(p.piedra) : undefined
            return (
              <li key={i}>
                <button
                  className="marcar-piedras__chip"
                  data-elegido={elegido === i || undefined}
                  onClick={() => setElegido(i)}
                  type="button"
                >
                  <b>{i + 1}</b>
                  {piedra ? (
                    <>
                      <span
                        className="marcar-piedras__color"
                        style={{ background: piedra.color }}
                      />
                      {piedra.nombre}
                    </>
                  ) : (
                    <span className="marcar-piedras__falta">Falta elegir</span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {actual && elegido !== null && (
        <div className="marcar-piedras__tarjeta">
          <div className="marcar-piedras__tarjeta-cabeza">
            <p>Punto {elegido + 1}: ¿qué piedra es?</p>
            <button
              className="marcar-piedras__borrar"
              onClick={() => borrar(elegido)}
              type="button"
            >
              Borrar punto
            </button>
          </div>
          {piedras.length > 8 && (
            <input
              aria-label="Buscar piedra"
              className="marcar-piedras__buscar"
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar…"
              type="search"
              value={busqueda}
            />
          )}
          {piedras.length === 0 ? (
            <p className="marcar-piedras__vacio">
              Todavía no hay piedras cargadas. Sumalas en Accesorios → Piedras.
            </p>
          ) : (
            <div className="marcar-piedras__opciones">
              {visibles.map((p) => (
                <button
                  aria-pressed={actual.piedra === p.id}
                  className="marcar-piedras__chip"
                  data-elegido={actual.piedra === p.id || undefined}
                  key={p.id}
                  onClick={() => actualizar(`${RUTA}.${elegido}.piedra`, p.id)}
                  type="button"
                >
                  <span className="marcar-piedras__color" style={{ background: p.color }} />
                  {p.nombre}
                </button>
              ))}
            </div>
          )}
          <button className="marcar-piedras__listo" onClick={() => setElegido(null)} type="button">
            Listo
          </button>
        </div>
      )}
    </div>
  )
}

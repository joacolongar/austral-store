# Decisiones técnicas

> Una entrada por decisión, la más nueva arriba. Formato: contexto, decisión, alternativas descartadas, consecuencias. Si una decisión se reemplaza, marcala como "Reemplazada por DEC-n" en vez de borrarla.

## DEC-004 · Vender por WhatsApp al lanzar (2026-11-26)
- **Contexto:** queremos lanzar rápido y validar precios.
- **Decisión:** fase 1 con botón "Lo quiero" que abre WhatsApp con el producto. Mercado Pago en fase 2.
- **Consecuencias:** no hace falta carrito ni checkout para lanzar.

## DEC-003 · Paleta Tropical (2026-11-26)
- **Decisión:** fondo `#FFFDF6`, superficie `#E3F4EE`, primario petróleo `#0F3D3E`, detalle amarillo mango `#FFB627` (avivado), acento sandía `#F25F5C`.
- **Descartadas:** Original, Mar austral, Atardecer, Terracota, Noche de verano (siguen en Figma).
- **Consecuencias:** las referencias visuales de joaco aplican solo a estética y componentes, no a colores.

## DEC-002 · Memoria del proyecto en el repo (2026-11-26)
- **Decisión:** `CLAUDE.md` (reglas), `docs/BITACORA.md` (estado y sesiones), `docs/DECISIONES.md` (este archivo), issues y milestones de GitHub (tareas). Comandos `/retomar` y `/cerrar`.
- **Por qué:** cualquier sesión de Claude Code retoma sin perder contexto.

## DEC-001 · Stack (2026-11-26)
- **Decisión:** Next.js (App Router) + TypeScript + Tailwind + Payload CMS sobre Cloudflare (Workers vía OpenNext, D1, R2).
- **Alternativas:** Vercel + Neon (plan B), Astro + admin propio, Sanity, Tiendanube.
- **Consecuencias:** hay que validar Payload en Workers + D1 en el issue 0.2 antes de construir producto. Si falla, se pasa al plan B y se registra como DEC nueva.

# Decisiones técnicas

> Una entrada por decisión, la más nueva arriba. Formato: contexto, decisión, alternativas descartadas, consecuencias. Si una decisión se reemplaza, marcala como "Reemplazada por DEC-n" en vez de borrarla.

## DEC-006 · Stack validado: Payload sobre Cloudflare Workers + D1 + R2 (2026-11-26)
- **Contexto:** DEC-001 pedía validar el stack antes de construir producto (#2).
- **Resultado:** con la plantilla oficial `with-cloudflare-d1` de Payload 3.94, el Worker compilado con OpenNext corre en workerd local: `/admin` carga, una foto se sube a R2, queda registrada en D1 y se ve en la home pública. Falta solo el deploy real con la cuenta de Cloudflare.
- **Ajustes necesarios:** `@opennextjs/cloudflare` 1.20.19 (la 1.20.1 de la plantilla da error 500 con Next 16.4), wrangler ^4.148, ESLint con la config plana nativa de Next 16, y `CF_LOCAL_BINDINGS=true` para buildear sin credenciales (CI).
- **Limitación conocida:** sin `sharp` en Workers, Payload no redimensiona imágenes. Se resuelve en otro issue (Cloudflare Images o redimensionado al subir).
- **Consecuencias:** seguimos con Cloudflare; el plan B (Vercel + Neon) queda descartado salvo que el deploy real falle.

## DEC-005 · Paleta final del Figma (2026-11-26) — reemplaza a DEC-003
- **Decisión:** verde `#02462E` (texto, logo, botón principal), amarillo `#FEC700` (pico y ola, detalles), fondo `#FFFDF6`, superficie `#E6EFE9`, acento sandía `#F25F5C`. Tipografías Archivo Black + DM Sans.
- **Por qué:** es la versión aprobada por joaco en el Figma de diseños (ZCQFJ02LtKpIJFmmNNre3I).

## DEC-004 · Vender por WhatsApp al lanzar (2026-11-26)
- **Contexto:** queremos lanzar rápido y validar precios.
- **Decisión:** fase 1 con botón "Lo quiero" que abre WhatsApp con el producto. Mercado Pago en fase 2.
- **Consecuencias:** no hace falta carrito ni checkout para lanzar.

## DEC-003 · Paleta Tropical (2026-11-26) — Reemplazada por DEC-005
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

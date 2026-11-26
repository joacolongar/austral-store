# Bitácora de Austral Store

> Claude: leé siempre "Estado actual" y "Próximos pasos". Al cerrar sesión, reescribilos y agregá una entrada nueva arriba de "Sesiones" (la más nueva primero).

## Estado actual
- **Fase:** 0 · Base
- **Trabajando en:** #2, prototipo del stack. Validado localmente (Worker en workerd con D1 y R2 locales); falta el deploy real.
- **Bloqueos:** el deploy necesita la cuenta de Cloudflare de joaco (API token + crear D1 y R2).
- **Supuestos vigentes:** venta en Argentina (Mercado Pago, envíos locales). Lanzamiento con compra por WhatsApp.

## Próximos pasos
1. #2: con la cuenta de Cloudflare, crear D1 `austral-store` y R2 `austral-store-media`, poner el `database_id` en `wrangler.jsonc` y correr `pnpm deploy`.
2. #3: CI en GitHub Actions (lint, typecheck, test:int, build con `CF_LOCAL_BINDINGS=true`) + deploy al mergear.
3. #4: tokens de diseño con la paleta de DEC-005 y las variables "Austral / Color" del Figma.

## Pendientes de joaco
- Dominio elegido (australstore.com.ar / austral.store / otro).
- Ciudad desde donde envían.
- Lista inicial de piedras con su significado (la arma la editora).
- Archivo original del logo, si existe.

## Sesiones

### 2026-11-26 · #2 Prototipo del stack
- Proyecto generado desde la plantilla oficial `with-cloudflare-d1` de Payload 3.94.1 (Next 16.4, React 19.2).
- Probado: `pnpm dev`, login en `/admin`, subida de foto a R2 local, home pública que lista las fotos. También el Worker compilado con OpenNext corriendo en workerd (`wrangler dev --local`), incluida una subida.
- Arreglos sobre la plantilla: OpenNext 1.20.19 y wrangler ^4.148 (con 1.20.1 la home daba 500 por `preview-props.json`), ESLint con config plana nativa, test de integración en entorno node (jsdom rompía esbuild), switch `CF_LOCAL_BINDINGS`.
- Paleta actualizada a la del Figma aprobado (DEC-005). El panel arranca con selector de sección y la guía de piedras vive en Accesorios (issues #5 y #9).
- Pendiente: deploy real (necesita la cuenta de Cloudflare).

### 2026-11-26 · Planificación
- Se armó el plan de la web y el plan de desarrollo con Claude Code (ver `docs/PLAN.md`).
- Se eligió la paleta Tropical y se diseñaron en Figma la home y la ficha del collar.
- Se creó este kit: `CLAUDE.md`, bitácora, decisiones y comandos `/retomar` y `/cerrar`.
- Se creó el repo `joacolongar/austral-store`, los milestones Fase 0 a 3, las etiquetas y los issues #1 a #12 (fases 0 y 1).

# Bitácora de Austral Store

> Claude: leé siempre "Estado actual" y "Próximos pasos". Al cerrar sesión, reescribilos y agregá una entrada nueva arriba de "Sesiones" (la más nueva primero).

## Estado actual
- **Fase:** 0 · Base
- **Trabajando en:** #2 (PR #14, validado en local) y #3 (CI + deploy por GitHub Actions). Falta el primer deploy real.
- **Bloqueos:** el deploy necesita que joaco cree D1 `austral-store` y R2 `austral-store-media`, pase el Database ID y cargue en GitHub Secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` y `PAYLOAD_SECRET`.
- **Supuestos vigentes:** venta en Argentina (Mercado Pago, envíos locales). Lanzamiento con compra por WhatsApp.

## Próximos pasos
1. Poner el Database ID real en `wrangler.jsonc` y mergear: el workflow `.github/workflows/ci.yml` migra D1 y deploya al hacer push a `main`.
2. Preview por PR (`wrangler versions upload --preview-alias`), pendiente dentro de #3.
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
- #3: workflow de CI (lint, typecheck, test:int, build del Worker sin credenciales) y deploy a Cloudflare en push a `main`, que se saltea con un aviso si faltan los secretos. El deploy no se pudo probar desde la sesión porque el contenedor no llega a la API de Cloudflare.

### 2026-11-26 · Planificación
- Se armó el plan de la web y el plan de desarrollo con Claude Code (ver `docs/PLAN.md`).
- Se eligió la paleta Tropical y se diseñaron en Figma la home y la ficha del collar.
- Se creó este kit: `CLAUDE.md`, bitácora, decisiones y comandos `/retomar` y `/cerrar`.
- Se creó el repo `joacolongar/austral-store`, los milestones Fase 0 a 3, las etiquetas y los issues #1 a #12 (fases 0 y 1).

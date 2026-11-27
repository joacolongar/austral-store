# Bitácora de Austral Store

> Claude: leé siempre "Estado actual" y "Próximos pasos". Al cerrar sesión, reescribilos y agregá una entrada nueva arriba de "Sesiones" (la más nueva primero).

## Estado actual
- **Fase:** 1 · Producto
- **Trabajando en:** #5 modelo de datos y panel por sección (rama `feat/5-modelo-datos`, PR abierto).
- **Bloqueos:** ninguno.
- **Supuestos vigentes:** venta en Argentina (Mercado Pago, envíos locales). Lanzamiento con compra por WhatsApp.

## Próximos pasos
1. joaco: mergear el PR de #5. El deploy corre la migración en D1 y su usuario queda como admin.
2. Compresión de fotos al subir (criterio de #5 que quedó pendiente): comprimir en el navegador antes de subir o Cloudflare Images.
3. Crear el usuario de la editora desde el panel (Ajustes → Usuarios) y que cargue las 15 piedras.
3. Siguiente issue del plan (#6).
4. Preview por PR (`wrangler versions upload --preview-alias`), pendiente dentro de #3.

## Pendientes de joaco
- Dominio elegido (australstore.com.ar / austral.store / otro).
- Ciudad desde donde envían.
- Lista inicial de piedras con su significado (la arma la editora).

## Sesiones

### 2026-11-26 · #5 Modelo de datos y panel por sección
- Colecciones `piedras` (nombre, slug, color #hex, significado, propiedades, foto) y `productos` (sección, tipo según sección, precio, stock 1 por defecto, estado borrador/disponible/vendida, fotos, materiales, medidas, piedras con x/y en %). DEC-010.
- Si una pieza disponible queda con stock 0 pasa sola a "vendida". Los borradores no se ven sin login.
- Roles en usuarios: `admin` y `editora`. El primer usuario es admin; la migración deja como admin a los que ya existían. La editora no ve a otros usuarios ni puede cambiarse el rol (probado).
- `/admin` abre en "¿Qué querés editar?": Accesorios (piezas, piedras), Deportes, Inicio y Pedidos (estos dos, próximamente). Panel en español.
- Migración `20261126_234854_modelo_datos` probada sobre una D1 local vacía.
- Fotos comprimidas al subir con el binding de Cloudflare Images (`IMAGES`): lado máximo 2000 px y WebP calidad 80. Si falla, se guarda la original. Probado en local: JPG de 3,9 MB → WebP de 0,9 MB (DEC-011).
- Pendiente: "Nuevo producto" desde Deportes abre con sección Accesorios por defecto (hay que cambiarla a mano).

### 2026-11-26 · #4 Tokens de diseño
- Tailwind v4 (`@tailwindcss/postcss`). Colores como variables CSS en `:root` y tokens `@theme inline` (`bg-primario`, `text-texto`, etc.), así cada sección puede pisar las variables con `data-seccion="deportes|accesorios"` (DEC-009).
- Fuentes con `next/font/google`: Archivo Black (`font-display`) y DM Sans (`font-sans`).
- Componentes en `src/components/ui/`: Button, Pill, Badge, StoneChip, ProductCard (precio con formato es-AR, "$18.500").
- Página interna `/muestra` (noindex) para revisar todo en celular y compu. Home provisoria pasada a Tailwind.
- Supuesto: el tema Deportes usa por ahora la misma paleta; se ajusta cuando se diseñe esa sección.
- Logo: joaco pasó el SVG del Figma. Está en `public/logo.svg` y como componente `<Logo>`, que toma los colores de los tokens (texto y detalle).

### 2026-11-26 · Primer deploy y fix de registro
- Primer deploy OK por GitHub Actions: https://austral-store.joaquinortizlongar.workers.dev
- Crear el primer usuario daba 500 (`InvalidConfiguration`): Payload usa 600.000 iteraciones de PBKDF2 y Cloudflare Workers acepta como máximo 100.000. En local (workerd) no falla, por eso no se vio antes. Fix: `auth.passwordHashIterations: 100000` (DEC-008).
- Un deploy falló en el build con `SQLITE_BUSY`: los 3 workers de Next abrían la misma D1 local a la vez. Con `CF_LOCAL_BINDINGS=true` el build usa 1 solo worker (`next.config.ts`).
- Logs en vivo: Cloudflare → Workers & Pages → austral-store → Observability → Live.

### 2026-11-26 · #2 Prototipo del stack
- Proyecto generado desde la plantilla oficial `with-cloudflare-d1` de Payload 3.94.1 (Next 16.4, React 19.2).
- Probado: `pnpm dev`, login en `/admin`, subida de foto a R2 local, home pública que lista las fotos. También el Worker compilado con OpenNext corriendo en workerd (`wrangler dev --local`), incluida una subida.
- Arreglos sobre la plantilla: OpenNext 1.20.19 y wrangler ^4.148 (con 1.20.1 la home daba 500 por `preview-props.json`), ESLint con config plana nativa, test de integración en entorno node (jsdom rompía esbuild), switch `CF_LOCAL_BINDINGS`.
- Paleta actualizada a la del Figma aprobado (DEC-005). El panel arranca con selector de sección y la guía de piedras vive en Accesorios (issues #5 y #9).
- Pendiente: deploy real (necesita la cuenta de Cloudflare).
- Decisión: Workers Paid (USD 5/mes), porque el Worker pesa 3,7 MB gzip y el plan gratis permite 3 MB; Vercel Hobby no permite uso comercial (ver DEC-007).
- #3: workflow de CI (lint, typecheck, test:int, build del Worker sin credenciales) y deploy a Cloudflare en push a `main`, que se saltea con un aviso si faltan los secretos. El deploy no se pudo probar desde la sesión porque el contenedor no llega a la API de Cloudflare.

### 2026-11-26 · Planificación
- Se armó el plan de la web y el plan de desarrollo con Claude Code (ver `docs/PLAN.md`).
- Se eligió la paleta Tropical y se diseñaron en Figma la home y la ficha del collar.
- Se creó este kit: `CLAUDE.md`, bitácora, decisiones y comandos `/retomar` y `/cerrar`.
- Se creó el repo `joacolongar/austral-store`, los milestones Fase 0 a 3, las etiquetas y los issues #1 a #12 (fases 0 y 1).

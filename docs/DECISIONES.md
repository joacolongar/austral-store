# Decisiones técnicas

> Una entrada por decisión, la más nueva arriba. Formato: contexto, decisión, alternativas descartadas, consecuencias. Si una decisión se reemplaza, marcala como "Reemplazada por DEC-n" en vez de borrarla.

## DEC-013 · Filtro por color deducido de las piedras (2026-11-28)
- **Contexto:** el #9 pide filtrar el catálogo por color, pero la pieza no tiene campo de color.
- **Decisión:** el color de una pieza son las familias de color de sus piedras (violetas, rosas, verdes, azules, blancos…), calculadas a partir del `#RRGGBB` de cada piedra en `src/lib/colores.ts`. La editora no carga nada extra.
- **Alternativas:** un campo "color" en Producto (más carga para la editora y se puede contradecir con las piedras).
- **Consecuencias:** si una pieza no tiene piedras marcadas, no aparece en el filtro de color ni de piedra (sí en "Todo" y por tipo). Los filtros quedan en la URL (`?tipo=…&piedra=…&color=…`), así la página de cada piedra puede enlazar al catálogo filtrado.

## DEC-012 · Deportes en "Próximamente", foco en Accesorios (2026-11-28)
- **Decisión (joaco):** por ahora solo se lanza la sección Accesorios. Deportes se muestra como "Próximamente": bloque de la home sin botón, página `/deportes` con aviso y sin productos de deportes en Novedades. Se controla con `secciones` en `src/config/marca.ts`.
- **Consecuencias:** el #8 (catálogo y ficha de Deportes) pasa a Fase 3. Las novedades filtran por tipo de pieza (collares, pulseras, aros, tobilleras). Las fotos de campaña de accesorios que mandó joaco quedan como default en `public/campana/` hasta que se cargue una en el panel.

## DEC-011 · Compresión de fotos con Cloudflare Images (2026-11-27)
- **Decisión:** hook `beforeOperation` en `media` que pasa cada foto por el binding `IMAGES` de Cloudflare Images: máximo 2000 px de lado, WebP calidad 80. Se guarda solo la versión comprimida en R2.
- **Alternativas:** comprimir en el navegador (frágil con el uploader de Payload), WASM en el Worker (pesa y suma CPU), sharp (no corre en Workers).
- **Consecuencias:** el plan gratis de Images incluye 5.000 transformaciones por mes, de sobra para la carga de productos. Si el binding falla, la subida no se corta: queda la original. Los tamaños por pantalla (miniaturas) se pueden sumar después con transformaciones por URL.

## DEC-010 · Piedras en producto como lista dentro del producto (2026-11-26)
- **Decisión:** "Piedra en producto" es un campo lista (`piedras`: piedra + x/y en %) dentro de Producto, no una colección aparte. Panel en español, roles `admin`/`editora` en el usuario (el primero siempre es admin) y pantalla de entrada propia (`SelectorSeccion`) en lugar del dashboard de Payload.
- **Por qué:** la editora marca las piedras en la misma pantalla de la pieza, sin saltar entre colecciones; los datos quedan igual de consultables.
- **Consecuencias:** si algún día una piedra necesita datos propios por pieza (tamaño, cantidad), se agregan como campos de la fila. Compresión de fotos: ver DEC-011.

## DEC-009 · Tokens con Tailwind v4 y variables CSS por sección (2026-11-26)
- **Decisión:** Tailwind v4 con `@theme inline` apuntando a variables CSS (`--fondo`, `--primario`, …). Los temas de sección (`data-seccion`) solo redefinen esas variables. Componentes base propios en `src/components/ui/` con nombres de props en español.
- **Por qué:** cero hex en componentes, un solo lugar para cambiar la paleta y temas por sección sin duplicar clases.
- **Consecuencias:** shadcn/ui se suma solo cuando haga falta un componente complejo (dialog, sheet), adaptado a estos tokens.

## DEC-008 · PBKDF2 con 100.000 iteraciones (2026-11-26)
- **Contexto:** en Cloudflare Workers, crear usuarios fallaba con `InvalidConfiguration` porque Workers no soporta las 600.000 iteraciones que usa Payload por defecto.
- **Decisión:** `auth.passwordHashIterations: 100000` en `payload.config.ts`, el valor que Payload ofrece para este caso.
- **Consecuencias:** no hay usuarios previos, así que no hace falta migrar contraseñas.

## DEC-007 · Cloudflare Workers Paid (2026-11-26)
- **Contexto:** el Worker compilado pesa 3,7 MB con gzip y el plan gratis de Workers permite 3 MB.
- **Decisión:** joaco activó Workers Paid (USD 5/mes, límite 10 MB).
- **Descartadas:** Vercel + Neon, porque Vercel Hobby no permite uso comercial y Pro cuesta USD 20/mes.

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

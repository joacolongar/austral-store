# Bitácora de Austral Store

> Claude: leé siempre "Estado actual" y "Próximos pasos". Al cerrar sesión, reescribilos y agregá una entrada nueva arriba de "Sesiones" (la más nueva primero).

## Estado actual
- **Fase:** 1 · Catálogo
- **Trabajando en:** #11 Editor de puntos en el panel (rama `feat/11-editor-puntos`, PR abierto). #10 mergeado.
- **Bloqueos:** ninguno.
- **Supuestos vigentes:** venta en Argentina (Mercado Pago, envíos locales). Lanzamiento con compra por WhatsApp (5492665011054).

## Próximos pasos
1. joaco: revisar y mergear el PR del #11.
2. #12 Lanzamiento. #8 (Deportes) en Fase 3 (DEC-012).
3. Crear el usuario de la editora (Ajustes → Usuarios) y que cargue piezas y las 15 piedras.
4. Preview por PR, pendiente dentro de #3.

## Pendientes de joaco
- Dominio elegido (australstore.com.ar / austral.store / otro). Con el dominio se suma el email de contacto al footer.
- Ciudad desde donde envían.
- Lista inicial de piedras con su significado (la arma la editora).

## Sesiones

### 2026-11-28 · #11 Editor de puntos en el panel
- Campo `ui` `marcarPiedras` en Productos (solo accesorios), antes del array `piedras`: muestra la foto principal, tocar suma un punto, se elige la piedra con chips (con buscador si hay más de 8), los números se arrastran y "Borrar punto" lo saca. Escribe en el array `piedras` (x/y en %, 1 decimal), que queda abajo como "Piedras en la foto (en números)" para ajuste fino.
- La foto del editor usa el mismo recorte cuadrado que la ficha de la web, así los % coinciden con lo que ve el cliente.
- Probado en celular (iPhone 13) con usuario editora: sumar 3 puntos, elegir piedras, arrastrar, borrar, guardar y recargar. La ficha pública muestra los puntos en el mismo lugar.

### 2026-11-28 · #10 Ficha interactiva de la pieza
- `/accesorios/<slug>` según "Ficha collar" del Figma: galería (deslizable en celular con puntitos, miniaturas en compu), puntos que laten sobre la foto principal en las posiciones x/y cargadas, tarjeta de la piedra elegida (con link "Más piezas con…"), tira "Este collar lleva", materiales, medidas y cuidados, y la guía de piedras abajo.
- Supuesto: todavía no hay bolsa ni Mercado Pago, así que el botón principal es "Comprar por WhatsApp" (mensaje con nombre, precio y link). En celular va en una barra fija abajo y el botón flotante de WhatsApp sube para no taparla. Sin "3 cuotas" porque las promesas comerciales no están definidas.
- Vendida: badge "Vendida", precio tachado, sin barra de compra y botón "Pedir una parecida por WhatsApp". Borradores dan 404.
- Test de Playwright en celular (`tests/e2e/ficha.e2e.spec.ts`), crea y borra sus propios datos. Corre con `pnpm test:e2e` sobre una base local nueva.

### 2026-11-28 · #9 Catálogo de accesorios y Guía de piedras
- `/accesorios`: banner amarillo del Figma, grilla 2/3/4 columnas, filtros por tipo (pills), por piedra y por color (paneles que se abren abajo). Solo se ofrecen opciones que tienen piezas. Primero las disponibles, las vendidas al final con badge "Vendida"; el resto "Pieza única". Abajo, "Cada piedra tiene su historia" con todas las piedras.
- `/accesorios/piedras`: guía completa. `/accesorios/piedras/<slug>`: color, significado, propiedades, foto si hay, piezas que la llevan (o botón de WhatsApp si no hay) y chips a otras piedras.
- Color de la pieza deducido de sus piedras (DEC-013). Test en `tests/int/colores.int.spec.ts`.
- Consultas públicas en `src/lib/consultas.ts` (siempre `overrideAccess: false`, sin borradores).

### 2026-11-28 · Deportes "Próximamente" y foco en Accesorios
- Pedido de joaco: solo se mueve Accesorios por ahora (DEC-012). #8 pasado a Fase 3 con comentario.
- Home: bloque Deportes con "Próximamente" y sin botón; Novedades solo de accesorios, con filtros por tipo (solo los tipos que tienen piezas). Página `/deportes` con aviso, link a accesorios y botón de WhatsApp.
- Fotos de campaña de joaco en `public/campana/` (WebP, 1200 px, sin EXIF): collar puesto, collar de fluorita y pulsera "Luck". Se ven en el bloque de Accesorios (una grande y dos chicas) mientras no haya foto cargada en Inicio.
- Variantes nuevas de `Button`: `detalle` ya estaba; se suma `secundarioClaro` para fondo verde.
- Ojo: la cinta tiene la frase genérica "Accesorios artesanales y deportes"; se puede cambiar desde Inicio.

### 2026-11-27 · #7 Home de marca
- Hero con dos bloques (Accesorios amarillo, Deportes verde) según el Figma, con foto de campaña editable en Inicio (`fotoAccesorios`, `fotoDeportes`). Sin foto muestra el placeholder.
- "03 / Novedades": hasta 8 productos publicados, primero los `destacado` (checkbox nuevo en Productos) y después los más nuevos, con filtros Todo / Accesorios / Deportes. Badge: "Pieza única" en accesorios, "Nuevo" en deportes de menos de 30 días, "Vendida" si corresponde. Los borradores no aparecen.
- Componente `TituloSeccion` para los títulos numerados y variante `detalle` (amarilla) en `Button`.
- Frases genéricas de la cinta (pedido de joaco): migración `20261127_183000_frases_cinta`, solo si la cinta está vacía. Las promesas comerciales (envío gratis, cuotas) se definen más adelante.
- Los links de las cards apuntan a `/accesorios/<slug>` y `/deportes/<slug>` (llegan con #8 y #9).

### 2026-11-27 · #6 Layout común
- Cinta de anuncios editable desde el panel: global `inicio` (sección Inicio del selector) con hasta 6 frases. En compu se ven todas; en celular rotan cada 4 s. Sin frases no se muestra.
- Header flotante sticky (Tienda ▾ con Accesorios, Guía de piedras y Deportes; Buscar, Cuenta, Bolsa) y menú desplegable en celular. Footer en 4 columnas (compu) y compacto (celular). Botón flotante de WhatsApp (wa.me/5492665011054 con mensaje inicial).
- Datos de contacto y navegación en `src/config/marca.ts`. El layout público es dinámico (`force-dynamic`) porque lee la cinta de la base.
- Los links del menú y del footer apuntan a páginas que llegan con #7–#12 (hoy dan 404). El email del footer se oculta hasta tener dominio.
- Migración `20261127_181034_cinta_anuncios`.
- Cierre de #5 (sesión anterior): PRs #20 y #21 mergeados y deployados. Fotos comprimidas con Cloudflare Images (DEC-011).

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

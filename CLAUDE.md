# Austral Store — guía para Claude Code

Web de Austral Store. **Austral Store es la marca general**; adentro tiene secciones: **Deportes** (simple, moderno) y **Accesorios / bijouterie artesanal** (piezas únicas con piedras e hilo encerado, hechas a mano). La Guía de piedras pertenece a la sección de accesorios, no a la marca general. Incluye un panel `/admin` que al entrar deja elegir qué sección se va a editar y lleva a sus colecciones; la editora lo usa desde el celular.

## Idioma y forma de trabajar
- Hablá en español rioplatense. Código, nombres de variables y commits técnicos pueden ir en inglés; textos de la web en español.
- Al terminar cada respuesta, decí claramente qué sigue y qué necesitás de joaco.
- **Al empezar una sesión:** corré `/retomar`. **Al terminar:** corré `/cerrar`. Nunca cierres una sesión sin actualizar `docs/BITACORA.md`.
- Una tarea = un issue = una rama = un PR. No pushear a `main`.
- Si decidís algo de fondo (librería, estructura, modelo de datos), anotalo en `docs/DECISIONES.md` en el momento.
- Si algo no está claro, elegí la opción más razonable, seguí y anotalo como supuesto en la bitácora.

## Memoria del proyecto
- `docs/BITACORA.md` — estado actual, próximos pasos y una entrada por sesión. Leé siempre el bloque de arriba.
- `docs/DECISIONES.md` — decisiones técnicas (ADR). No reabras una decisión sin motivo nuevo.
- `docs/PLAN.md` — fases e issues.
- Issues y milestones de GitHub — tareas con criterios de aceptación.

## Stack
- Next.js (App Router) + TypeScript estricto + Tailwind CSS + shadcn/ui + Motion.
- Payload CMS dentro del mismo proyecto Next.js (admin en `/admin`).
- Cloudflare: Workers vía OpenNext, D1 (SQLite) como base, R2 para imágenes.
- Plan B (si el prototipo en Cloudflare falla): Vercel + Neon (Postgres), mismo código.
- Calidad: ESLint, Prettier, Vitest, Playwright. CI en GitHub Actions.
- Pagos (fase 2): Mercado Pago Checkout Pro. Mails: Resend.

## Comandos
- Primera vez: `pnpm install` y `cp .env.example .env` con `PAYLOAD_SECRET=$(openssl rand -hex 32)`.
- `pnpm dev` — desarrollo en http://localhost:3000 (admin en `/admin`). Usa D1 y R2 **locales** de wrangler (`.wrangler/state`), no hace falta cuenta de Cloudflare.
- `pnpm lint` · `pnpm typecheck` · `pnpm test:int` (Vitest) · `pnpm test:e2e` (Playwright).
- `CF_LOCAL_BINDINGS=true pnpm exec opennextjs-cloudflare build` — compila el Worker sin credenciales (CI). Después `pnpm exec wrangler dev --local` lo corre en workerd en http://localhost:8787.
- `pnpm deploy` — migra D1 remota y deploya el Worker (necesita `CLOUDFLARE_API_TOKEN` y los IDs reales en `wrangler.jsonc`).
- Cambios en colecciones: `pnpm payload migrate:create` y commitear la migración en `src/migrations/`.
- Antes de dar una tarea por terminada: lint + typecheck + tests de lo tocado.
- Ojo: en Workers no hay `sharp`, así que Payload no recorta ni redimensiona imágenes; eso se resuelve aparte (Cloudflare Images o similar).

## Diseño
- Figma de diseños (aprobado para arrancar): https://www.figma.com/design/ZCQFJ02LtKpIJFmmNNre3I — página "Base" (variables, logo, componentes) y "Diseños" (escritorio: Home, Ficha collar, Deportes catálogo y ficha, Accesorios; celular: Home y Ficha collar; panel admin: Login, Elegir sección, Accesorios productos, Nueva pieza, Editar piedra).
- Figma de exploración de paletas (histórico): https://www.figma.com/design/CphdbbJsOKSldLAUiINffY
- Paleta aprobada (ver DEC-005): fondo `#FFFDF6`, superficie `#E6EFE9`, texto/logo/botón principal verde `#02462E`, detalle amarillo `#FEC700` (pico y ola del logo), acento sandía `#F25F5C`, texto sobre primario `#FFFDF6`. Fuente de verdad: variables "Austral / Color" en la página "Base" del Figma.
- Tipografías: Archivo Black (títulos), DM Sans (texto, menú, botones).
- Estética minimalista: header flotante redondeado, cinta de anuncios, títulos numerados ("01 / La selección"), filtros pill, botones redondeados, cards limpias con badge, WhatsApp flotante.
- Los colores van como variables CSS / tokens de Tailwind; nunca hex sueltos en componentes.

## Modelo de datos base
- **Piedra:** nombre, slug, significado, propiedades, color, foto.
- **Producto:** nombre, slug, mundo (deportes | bijouterie), tipo, precio, fotos, materiales, medidas, stock (1 por defecto en bijouterie), estado (borrador | disponible | vendida).
- **Piedra en producto:** producto + piedra + posición x/y en % sobre la foto.
- Roles: `admin` (todo) y `editora` (productos, piedras, pedidos). La editora puede cambiar nombre, color y significado de cada piedra.
- Panel: al entrar se elige la sección (Accesorios, Deportes, Inicio, Pedidos) y se va a sus colecciones.

## Convenciones
- Ramas: `feat/<issue>-<nombre>`, `fix/...`, `docs/...`.
- Commits: `tipo(área): descripción` — tipos `feat`, `fix`, `docs`, `refactor`, `test`, `chore`; áreas `deportes`, `bijouterie`, `admin`, `infra`, `ui`.
- PRs con `Closes #n`, qué cambió, cómo probarlo y capturas si es visual.
- Nunca commitear secretos (`.env*`, claves de Cloudflare, `PAYLOAD_SECRET`).
- Mobile first: todo se prueba primero en ancho de celular.

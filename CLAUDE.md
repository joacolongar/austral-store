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
> Completar cuando exista el proyecto (issue 0.2).
- `pnpm dev` — desarrollo local
- `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm build`
- Antes de dar una tarea por terminada: lint + typecheck + tests de lo tocado.

## Diseño
- Figma (home y ficha del collar): https://www.figma.com/design/ZCQFJ02LtKpIJFmmNNre3I
- Figma (paletas y logo): https://www.figma.com/design/CphdbbJsOKSldLAUiINffY
- Paleta **Tropical**: fondo `#FFFDF6`, superficie `#E3F4EE`, texto/logo/primario petróleo `#0F3D3E`, detalle amarillo mango `#FFB627`, acento sandía `#F25F5C`, texto sobre primario `#FFFDF6`.
- Tipografías: Archivo Black (títulos), DM Sans (texto, menú, botones).
- Estética minimalista: header flotante redondeado, cinta de anuncios, títulos numerados ("01 / La selección"), filtros pill, botones redondeados, cards limpias con badge, WhatsApp flotante.
- Los colores van como variables CSS / tokens de Tailwind; nunca hex sueltos en componentes.

## Modelo de datos base
- **Piedra:** nombre, slug, significado, propiedades, color, foto.
- **Producto:** nombre, slug, mundo (deportes | bijouterie), tipo, precio, fotos, materiales, medidas, stock (1 por defecto en bijouterie), estado (borrador | disponible | vendida).
- **Piedra en producto:** producto + piedra + posición x/y en % sobre la foto.
- Roles: `admin` (todo) y `editora` (productos, piedras, pedidos).

## Convenciones
- Ramas: `feat/<issue>-<nombre>`, `fix/...`, `docs/...`.
- Commits: `tipo(área): descripción` — tipos `feat`, `fix`, `docs`, `refactor`, `test`, `chore`; áreas `deportes`, `bijouterie`, `admin`, `infra`, `ui`.
- PRs con `Closes #n`, qué cambió, cómo probarlo y capturas si es visual.
- Nunca commitear secretos (`.env*`, claves de Cloudflare, `PAYLOAD_SECRET`).
- Mobile first: todo se prueba primero en ancho de celular.

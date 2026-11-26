# Plan de desarrollo

Fuente: doc "Plan de desarrollo con Claude Code" (https://claude.ai/artifact/JeaRBwdbDSCTHosDrs315f) y "Plan web Austral Store" (https://claude.ai/artifact/4rqic1KGu5WFPwL9QsfRsG).

Cada fila es un issue de GitHub dentro del milestone de su fase. Issues #1 a #12 = filas 0.1 a 1.8, en orden.

| # | Fase | Issue | Listo cuando |
| --- | --- | --- | --- |
| 0.1 | 0 · Base | Crear repo, `CLAUDE.md`, bitácora y comandos | El kit está en `main` y `/retomar` responde bien |
| 0.2 | 0 · Base | Prototipo Next.js + Payload en Cloudflare (D1 + R2) | Se sube una foto desde `/admin` y se ve en una página pública deployada |
| 0.3 | 0 · Base | CI en GitHub Actions + preview por PR | Un PR muestra checks verdes y link de preview |
| 0.4 | 0 · Base | Tokens de diseño: paleta Tropical, Archivo Black + DM Sans, temas Deportes / Bijouterie | Tailwind usa las variables y hay una página de muestra |
| 1.1 | 1 · Catálogo | Modelo de datos en Payload: Piedra, Producto, Piedra en producto, roles | La editora puede crear una piedra y una pieza |
| 1.2 | 1 · Catálogo | Layout: cinta de anuncios, header flotante, footer, botón de WhatsApp | Coincide con Figma en celular y compu |
| 1.3 | 1 · Catálogo | Home de marca | Hero con los dos mundos, destacados y recién hechas |
| 1.4 | 1 · Catálogo | Catálogo y ficha de Deportes | Filtros por deporte, talle y precio |
| 1.5 | 1 · Catálogo | Catálogo de Bijouterie y Guía de piedras | Filtro por piedra y página por piedra |
| 1.6 | 1 · Catálogo | Ficha interactiva: puntos sobre la foto | Tocar una piedra abre su tarjeta; anda en celular |
| 1.7 | 1 · Catálogo | Editor de puntos en el panel | Se marcan piedras tocando la foto, guardado en % |
| 1.8 | 1 · Catálogo | "Lo quiero" por WhatsApp, Nosotros, legales, SEO básico | Lanzamiento con dominio propio |
| 2.x | 2 · Pagos | Carrito, Mercado Pago, envíos por zona, mails, reserva de piezas | Primera venta online |
| 3.x | 3 · Crecer | Analítica, SEO de piedras, armá tu pulsera, visor 3D, newsletter | Continuo |

Las fases 2 y 3 se parten en issues al terminar la fase 1.

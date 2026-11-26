# Austral Store

Web de Austral Store: deportes y bijouterie artesanal.

Stack: Next.js + TypeScript + Tailwind + Payload CMS sobre Cloudflare.

El estado del proyecto y los próximos pasos están en [`docs/BITACORA.md`](docs/BITACORA.md).

## Correr en local

```bash
pnpm install
cp .env.example .env   # y completá PAYLOAD_SECRET con: openssl rand -hex 32
pnpm dev               # http://localhost:3000 · panel en /admin
```

No hace falta cuenta de Cloudflare para desarrollar: D1 y R2 corren locales con wrangler. Más comandos en [`CLAUDE.md`](CLAUDE.md).

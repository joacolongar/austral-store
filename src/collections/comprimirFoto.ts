import type { CollectionBeforeOperationHook } from 'payload'

/** Lado más largo de la foto guardada, en píxeles. */
export const LADO_MAXIMO = 2000
const CALIDAD_WEBP = 80
const FORMATOS = /^image\/(jpeg|png|webp|avif|heic|heif)$/

/**
 * Comprime cada foto antes de guardarla en R2: la achica a 2000 px como máximo y la pasa a WebP,
 * con el binding de Cloudflare Images (en Workers no hay sharp). Si algo falla, guarda la original.
 */
export const comprimirFoto =
  (images: ImagesBinding | undefined): CollectionBeforeOperationHook =>
  async ({ args, operation, req }) => {
    const archivo = req.file
    if (!images || !archivo || (operation !== 'create' && operation !== 'update')) return args
    if (!FORMATOS.test(archivo.mimetype)) return args

    try {
      const resultado = await images
        .input(new Blob([new Uint8Array(archivo.data)]).stream())
        .transform({ width: LADO_MAXIMO, height: LADO_MAXIMO, fit: 'scale-down' })
        .output({ format: 'image/webp', quality: CALIDAD_WEBP })
      const data = Buffer.from(await new Response(resultado.image()).arrayBuffer())

      // Una WebP chica que ya venía optimizada puede crecer: en ese caso queda la original.
      if (archivo.mimetype === 'image/webp' && data.length >= archivo.size) return args

      req.file = {
        ...archivo,
        data,
        mimetype: 'image/webp',
        name: `${archivo.name.replace(/\.[^.]+$/, '')}.webp`,
        size: data.length,
      }
      req.payload.logger.info({
        msg: 'Foto comprimida',
        antes: archivo.size,
        despues: data.length,
      })
    } catch (error) {
      req.payload.logger.warn({ msg: 'No se pudo comprimir la foto; se guarda la original', error })
    }
    return args
  }

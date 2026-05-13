/**
 * Convierte PNG/JPEG nombrados como `Nombre-<uuid>.png` a WebP en public/photos/.
 * Los archivos genéricos `image-<uuid>.png` pasan a `image_<primer-bloque-uuid>.webp`.
 *
 * Uso:
 *   node scripts/import-workspace-images-webp.mjs "<ruta-carpeta-imagenes>"
 *
 * Ejemplo (Cursor workspaceStorage):
 *   node scripts/import-workspace-images-webp.mjs "%APPDATA%/Cursor/User/workspaceStorage/<id>/images"
 */
import sharp from 'sharp'
import { readdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DEST_DIR = join(__dirname, '..', 'public', 'photos')

const UUID_TAIL =
  /^(.+)-([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(png|jpe?g)$/i

async function main() {
  const sourceDir = process.argv[2]
  if (!sourceDir) {
    console.error(
      'Uso: node scripts/import-workspace-images-webp.mjs <carpeta-con-imagenes>'
    )
    process.exit(1)
  }

  for (const file of readdirSync(sourceDir)) {
    const m = file.match(UUID_TAIL)
    if (!m) {
      console.warn('omitido (patron no coincide):', file)
      continue
    }
    let base = m[1]
    if (base === 'image') base = `image_${m[2].slice(0, 8)}`

    const inputPath = join(sourceDir, file)
    const outputPath = join(DEST_DIR, `${base}.webp`)
    await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath)
    console.log('OK', `${base}.webp`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Convierte imágenes de public/photos a WebP (quality 85).
 * Uso: node scripts/convert-photos-to-webp.mjs
 */
import sharp from 'sharp'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PHOTOS_DIR = join(__dirname, '..', 'public', 'photos')

const FILES = [
  'adultos_full_corte.png',
  'AF_002.jpg',
  'baby_tkd01.jpg',
  'babyTkd_ceremony_1.jpg',
  'bg_competitive.jpg',
  'bg_exp.jpg',
  'bg_exp1.jpg',
  'bg_exp2.jpg',
  'bg_team.jpg',
  'bg_tkd.jpg',
  'Bomberos_01-1518x2048.jpg',
  'Bomberos_03-1139x1536.jpg',
  'Bomberos_05-1152x1536.jpg',
  'combat01.jpg',
  'combate.jpg',
  'cropped-LOGOTIPO-Photoroom.png',
  'equipo_.jpg',
  'equipo_2-2048x1518.jpg',
  'equipo_main.jpg',
  'Franco.jpg',
  'gall_nos.jpg',
  'gall_nos01.jpg',
  'Javier.jpg',
  'Joaquin.jpg',
  'kids00.jpg',
  'kids01.jpg',
  'kids02.jpg',
  'kyurugi_ex.jpg',
  'Letras-coreanas-Taekwondo.jpg',
]

async function main() {
  for (const name of FILES) {
    const inputPath = join(PHOTOS_DIR, name)
    const base = name.replace(/\.(png|jpe?g)$/i, '')
    const outputPath = join(PHOTOS_DIR, `${base}.webp`)
    await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath)
    console.log('OK', `${base}.webp`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

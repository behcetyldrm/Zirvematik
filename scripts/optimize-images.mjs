/**
 * optimize-images.mjs
 * Tek seferlik / tekrar çalıştırılabilir görsel optimizasyon aracı.
 *  1) Harici makine görsellerini indirip yerel WebP'ye çevirir (public/images/makineler).
 *  2) Galeri JPEG'lerini sıkıştırır (yerinde).
 *  3) teklif-logo.png'yi küçültüp optimize eder.
 *  4) Sosyal paylaşım için 1200x630 og-image.jpg üretir.
 *
 * Çalıştırma: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'public', 'images');
const machinesDir = path.join(imagesDir, 'makineler');
const galleryDir = path.join(imagesDir, 'galeri');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const machineSources = [
  { url: 'https://otomatyanimda.com.tr/wp-content/uploads/2023/01/Untitled-1-8.png', out: 'makine-otomat.webp' },
  { url: 'https://www.ankaraotomat.com/wp-content/uploads/2025/09/nectaastro.jpg', out: 'makine-necta.webp' },
  { url: 'https://hexabrand.fr/cdn/shop/files/M-KKTF-1_05c83397-5711-41ad-9e5e-510fcbc236d6.jpg?v=1762447916', out: 'makine-kktf.webp' },
  { url: 'https://www.macgalotomat.com/wp-content/uploads/2022/09/magma-s-711-al-01.webp', out: 'makine-magma.webp' },
];

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'image/*,*/*' } });
  if (!res.ok) throw new Error(`Indirilemedi (${res.status}): ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processMachines() {
  await mkdir(machinesDir, { recursive: true });
  for (const { url, out } of machineSources) {
    try {
      const buf = await download(url);
      await sharp(buf)
        .resize({ width: 600, height: 450, fit: 'cover', position: 'centre' })
        .webp({ quality: 80 })
        .toFile(path.join(machinesDir, out));
      console.log(`[makine] ${out} olusturuldu (${(buf.length / 1024).toFixed(0)} KB kaynak)`);
    } catch (err) {
      console.error(`[makine] HATA ${out}: ${err.message}`);
      process.exitCode = 1;
    }
  }
}

async function makeOgImage(logoBuf) {
  const logo = await sharp(logoBuf)
    .resize({ width: 460, height: 460, fit: 'inside' })
    .png()
    .toBuffer();
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { r: 250, g: 246, b: 240, alpha: 1 } },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(imagesDir, 'og-image.jpg'));
  console.log('[og] og-image.jpg olusturuldu (1200x630)');
}

async function optimizeLogo() {
  const p = path.join(imagesDir, 'teklif-logo.png');
  const buf = await readFile(p);
  await makeOgImage(buf);
  const out = await sharp(buf)
    .resize({ width: 512, height: 512, fit: 'inside' })
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toBuffer();
  await writeFile(p, out);
  console.log(`[logo] teklif-logo.png ${(buf.length / 1024).toFixed(0)} KB -> ${(out.length / 1024).toFixed(0)} KB`);
}

async function optimizeGallery() {
  const files = (await readdir(galleryDir)).filter((f) => /\.(jpe?g)$/i.test(f));
  for (const f of files) {
    const p = path.join(galleryDir, f);
    const buf = await readFile(p);
    const out = await sharp(buf)
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer();
    if (out.length < buf.length) {
      await writeFile(p, out);
      console.log(`[galeri] ${f} ${(buf.length / 1024).toFixed(0)} KB -> ${(out.length / 1024).toFixed(0)} KB`);
    } else {
      console.log(`[galeri] ${f} zaten optimize (${(buf.length / 1024).toFixed(0)} KB)`);
    }
  }
}

await processMachines();
await optimizeLogo();
await optimizeGallery();
console.log('Tamamlandi.');

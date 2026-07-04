/** @type {import('tailwindcss').Config} */
module.exports = {
  // Dark mode ayarı (class tabanlı, butona basıldığında html etiketine 'dark' class'ı eklenecek)
  darkMode: 'class',
  content: [
    "./*.html",
    "./src/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Yeni Botanical Earth Renk Paleti (Hex kodları ve anlamları config üzerinden yönetilecek)
        primary: {
          DEFAULT: '#B4522A', // BURNT SIENNA - Ana CTA, aktif linkler, ana butonlar
          hover: '#C6562E',   // GOLDEN AMBER - Hover durumları ve ikincil butonlar
          light: '#D0A552',   // SUNBAKED CLAY - Açık tondaki butonlar veya vurgular
          dark: '#933D1C',    // Daha koyu ton (active)
          // Kısılmış/soft dark mod metin/vurgu renkleri (göz yormaması ve WCAG kontrastı için)
          soft: '#D57C5A',
        },
        secondary: {
          DEFAULT: '#C6562E', // GOLDEN AMBER
          hover: '#B4522A',
          soft: '#DFBD7F',   // Kısılmış clay/amber tonu
        },
        accent: {
          DEFAULT: '#6B6F3C', // OLIVE MOSS - Hover efektleri, rozetler ve yan vurgular
          soft: '#8B905C',    // Kısılmış yeşil tonu
        },
        // Nötr Renk Tonları (Sayfa arka planları, kartlar, başlıklar ve section ayrımı için)
        neutral: {
          light: {
            sand: '#FAF6F0',   // En açık nötr arka plan (Light mod genel body)
            clay: '#EBE2D7',   // Makinelerimiz gibi bölümleri ayırmak için orta açık nötr
            beige: '#F0E5D8',  // Blog gibi bölümleri ayırmak için koyu açık nötr
            pure: '#FFFFFF',   // Kartlar ve üst üste binen elemanlar için temiz beyaz
          },
          dark: {
            DEFAULT: '#1E2F44', // MIDNIGHT HARBOR - Başlıklar, ana metinler ve dark mod section
            pure: '#0F1824',    // Dark mod genel body arka planı (Çok koyu Midnight Harbor)
            card: '#24374D',    // Dark mod kart arka planı
            walnut: '#0B1220',  // Koyu lacivert/soğuk zemin (Footer arka planı, kahverengiden laciverte çekildi)
            walnutDark: '#070A14', // Çok koyu soğuk zemin (Footer alt şeridi / koyu zemin bölümleri)
            charcoal: '#232526', // Koyu gri section arka planı (Blog ve makine listelemeleri için)
          },
          'dark-DEFAULT': '#1E2F44', // Desteklenen neutral-dark-DEFAULT sınıfı için
        },
        // WhatsApp yeşili (Değiştirilmedi, olduğu gibi korundu)
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1da851',
        }
      },
      fontFamily: {
        // Özel font tanımları
        sans: ['Inter', 'sans-serif'], // Gövde metinleri
        display: ['Playfair Display', 'serif'], // Başlıklar ve marka adı
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}


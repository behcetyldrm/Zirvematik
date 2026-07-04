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
        // Kahve temalı özel renk paleti
        coffee: {
          50: '#fdf8f5',
          100: '#f9eee6',
          200: '#f0dcd0',
          300: '#e3c2b0',
          400: '#d1a086',
          500: '#c28362',
          600: '#b56a47',
          700: '#975338',
          800: '#7a4531',
          900: '#63392a', // Koyu espresso
          950: '#351c13', // Çok koyu antrasit
        },
        // Vurgu rengi (Amber/Karamel)
        caramel: {
          light: '#f59e0b',
          DEFAULT: '#d97706',
          dark: '#b45309',
        }
      },
      fontFamily: {
        // Özel font tanımları
        sans: ['Inter', 'sans-serif'], // Gövde metinleri
        display: ['Playfair Display', 'serif'], // Başlıklar ve marka adı
      }
    },
  },
  plugins: [],
}

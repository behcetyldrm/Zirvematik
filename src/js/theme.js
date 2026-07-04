/**
 * theme.js
 * Sayfanın karanlık (dark) ve aydınlık (light) temaları arasındaki geçişi yönetir.
 * Kullanıcı seçimini localStorage'da saklar. İlk ziyarette sistem tercihini (prefers-color-scheme) kullanır.
 */

const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// Sistem veya kaydedilmiş temayı kontrol et
function initTheme() {
    // Daha önce kaydedilmiş bir tema varsa onu kullan
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        
        document.documentElement.classList.add('dark');
        // Ikonları ayarla
        lightIcon?.classList.remove('hidden');
        darkIcon?.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        // Ikonları ayarla
        darkIcon?.classList.remove('hidden');
        lightIcon?.classList.add('hidden');
    }
}

// Butona tıklandığında temayı değiştir
function toggleTheme() {
    // Ikonları değiştir
    darkIcon?.classList.toggle('hidden');
    lightIcon?.classList.toggle('hidden');

    // Tema değiştirme mantığı
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        // Eğer localStorage'da ayar yoksa, sistem ayarlarına göre hareket et
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
}

// Olay dinleyicilerini ekle
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// Sayfa yüklendiğinde temayı ayarla (bu script head'de veya body sonunda çalışabilir, main.js'den de çağrılabilir)
export { initTheme, toggleTheme };

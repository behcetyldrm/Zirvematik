/**
 * nav.js
 * Mobil cihazlar için menü aç/kapat işlevini ve 
 * navbar'ın scroll yapıldığında gölgeli (sticky) görünüm kazanmasını yönetir.
 */

function initNav() {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    // Mobil menü açma kapama
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Scroll olduğunda navbar'a gölge ve arkaplan ekleme (estetik geçiş)
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                // Sayfa aşağı kaydırıldığında
                navbar.classList.add('shadow-md', 'bg-coffee-50/90', 'dark:bg-coffee-950/90', 'backdrop-blur-sm');
                navbar.classList.remove('bg-coffee-50', 'dark:bg-coffee-950');
            } else {
                // Sayfa en üstteyken
                navbar.classList.remove('shadow-md', 'bg-coffee-50/90', 'dark:bg-coffee-950/90', 'backdrop-blur-sm');
                navbar.classList.add('bg-coffee-50', 'dark:bg-coffee-950');
            }
        });
    }
}

export { initNav };

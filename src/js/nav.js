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
            const isHidden = menu.classList.toggle('hidden');
            // Menü görünürken aria-expanded=true olmalı
            btn.setAttribute('aria-expanded', String(!isHidden));
        });
    }

    // Scroll olduğunda navbar'a gölge ve arkaplan ekleme (estetik geçiş)
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                // Sayfa aşağı kaydırıldığında
                navbar.classList.add('shadow-md', 'bg-neutral-light-sand/90', 'dark:bg-neutral-dark-pure/90', 'backdrop-blur-sm');
                navbar.classList.remove('bg-neutral-light-sand', 'dark:bg-neutral-dark-pure');
            } else {
                // Sayfa en üstteyken
                navbar.classList.remove('shadow-md', 'bg-neutral-light-sand/90', 'dark:bg-neutral-dark-pure/90', 'backdrop-blur-sm');
                navbar.classList.add('bg-neutral-light-sand', 'dark:bg-neutral-dark-pure');
            }
        });
    }
}

export { initNav };

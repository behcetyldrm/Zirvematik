/**
 * main.js
 * Sayfa yüklendiğinde gerekli modülleri ve animasyonları başlatır.
 */

import { initTheme } from './theme.js';
import { initNav } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Temayı başlat
    initTheme();

    // 2. Navigasyon özelliklerini başlat
    initNav();

    // 3. Scroll Reveal animasyonlarını kur (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Bir kez göründükten sonra izlemeyi bırak
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Elemanın %10'u göründüğünde tetikle
            rootMargin: '0px 0px -50px 0px' 
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 4. Makineler Scroll Butonları
    const machinesContainer = document.getElementById('machinesContainer');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');

    if (machinesContainer && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            const firstCard = machinesContainer.firstElementChild;
            if (firstCard) {
                // Kart genişliği ve aradaki boşluk (gap-6 = 24px)
                const scrollAmount = firstCard.clientWidth + 24;
                machinesContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });

        scrollRightBtn.addEventListener('click', () => {
            const firstCard = machinesContainer.firstElementChild;
            if (firstCard) {
                const scrollAmount = firstCard.clientWidth + 24;
                machinesContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    }
});

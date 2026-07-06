/**
 * main.js
 * Sayfa yüklendiğinde gerekli modülleri ve animasyonları başlatır.
 */

import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { blogPosts } from './blogs.js';

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

    // 5. Blog Kartlarını Oluştur ve Scroll Butonlarını Kur
    const blogContainer = document.getElementById('blogContainer');
    const blogScrollLeftBtn = document.getElementById('blogScrollLeftBtn');
    const blogScrollRightBtn = document.getElementById('blogScrollRightBtn');

    if (blogContainer && blogPosts && blogPosts.length > 0) {
        blogPosts.forEach((post, index) => {
            const card = document.createElement('article');
            card.className = 'snap-center bg-neutral-light-pure dark:bg-neutral-dark-walnut rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-light-beige dark:border-neutral-dark-DEFAULT/20 scroll-reveal';
            card.style.cssText = `min-width: 320px; width: 320px; flex-shrink: 0;`;
            if (index > 0) {
                card.style.transitionDelay = `${index * 100}ms`;
            }

            // Yapı innerHTML ile kurulur; kullanıcı/dinamik veri alanları (title, excerpt, slug)
            // XSS'e karşı textContent / güvenli property ile yerleştirilir.
            card.innerHTML = `
                <div class="p-6 flex flex-col h-full">
                    <div class="flex-grow">
                        <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                            </svg>
                        </div>
                        <h3 class="js-blog-title text-xl font-bold text-neutral-dark-DEFAULT dark:text-neutral-light-pure mb-3"></h3>
                        <p class="js-blog-excerpt text-neutral-dark-DEFAULT/75 dark:text-neutral-light-clay mb-6 leading-relaxed line-clamp-3"></p>
                    </div>
                    <a class="js-blog-link text-primary font-semibold flex items-center text-sm group hover:text-primary-hover">
                        Devamını Oku
                        <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                </div>
            `;

            card.querySelector('.js-blog-title').textContent = post.title;
            card.querySelector('.js-blog-excerpt').textContent = post.excerpt;
            card.querySelector('.js-blog-link').href = `/blog-detay?slug=${encodeURIComponent(post.slug)}`;

            blogContainer.appendChild(card);
        });

        // Blog kartları için scroll reveal
        const blogRevealElements = blogContainer.querySelectorAll('.scroll-reveal');
        if (blogRevealElements.length > 0) {
            const blogRevealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            blogRevealElements.forEach(el => blogRevealObserver.observe(el));
        }
    }

    // Blog Scroll Butonları
    if (blogContainer && blogScrollLeftBtn && blogScrollRightBtn) {
        blogScrollLeftBtn.addEventListener('click', () => {
            const firstCard = blogContainer.firstElementChild;
            if (firstCard) {
                const scrollAmount = firstCard.clientWidth + 24;
                blogContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });

        blogScrollRightBtn.addEventListener('click', () => {
            const firstCard = blogContainer.firstElementChild;
            if (firstCard) {
                const scrollAmount = firstCard.clientWidth + 24;
                blogContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    }

    // 6. Görseller (Galeri) Scroll Butonları
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryScrollLeftBtn = document.getElementById('galleryScrollLeftBtn');
    const galleryScrollRightBtn = document.getElementById('galleryScrollRightBtn');

    if (galleryContainer && galleryScrollLeftBtn && galleryScrollRightBtn) {
        galleryScrollLeftBtn.addEventListener('click', () => {
            const firstItem = galleryContainer.firstElementChild;
            if (firstItem) {
                const scrollAmount = firstItem.clientWidth + 24;
                galleryContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });

        galleryScrollRightBtn.addEventListener('click', () => {
            const firstItem = galleryContainer.firstElementChild;
            if (firstItem) {
                const scrollAmount = firstItem.clientWidth + 24;
                galleryContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });

        // Galeri scroll reveal
        const galleryRevealElements = galleryContainer.querySelectorAll('.scroll-reveal');
        if (galleryRevealElements.length > 0) {
            const galleryRevealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            galleryRevealElements.forEach(el => galleryRevealObserver.observe(el));
        }
    }
});

// Lightbox fonksiyonları (global scope)
function openLightbox(src) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    if (modal && img) {
        img.src = src;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox(event, forceClose) {
    if (forceClose || event.target === document.getElementById('lightboxModal')) {
        const modal = document.getElementById('lightboxModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }
}

// ESC tuşu ile lightbox'ı kapatma
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox(null, true);
    }
});

// Global scope'a ekle
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;


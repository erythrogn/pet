(function() {
    'use strict';

    const CONFIG = {
        intersectionThreshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
        cascadeDelay: 150,
        animateOnce: true
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('🧶 Sistema de animação Timeline iniciado');
        initTimelineLine();
        initTimelineItems();
        initRevealElements();
        initHeader();
        initMobileMenu();
        console.log('✅ Todas as animações configuradas');
    }

    function initTimelineLine() {
        const timeline = document.querySelector('.yarn-timeline');
        if (!timeline) {
            console.warn('⚠️ Timeline não encontrada');
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('line-active');
                    if (CONFIG.animateOnce) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        observer.observe(timeline);
    }

    function initTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length === 0) {
            console.warn('⚠️ Nenhum item da timeline encontrado');
            return;
        }
        console.log(`📍 ${timelineItems.length} items da timeline detectados`);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = index * CONFIG.cascadeDelay;
                    setTimeout(() => {
                        entry.target.classList.add('active');
                        console.log(`✨ Item ${index + 1} ativado`);
                    }, delay);
                    if (CONFIG.animateOnce) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: CONFIG.intersectionThreshold,
            rootMargin: CONFIG.rootMargin
        });
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    function initRevealElements() {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) {
            return;
        }
        console.log(`👁️ ${revealElements.length} elementos reveal detectados`);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = index * 100;
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, delay);
                    if (CONFIG.animateOnce) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        revealElements.forEach(el => {
            observer.observe(el);
        });
    }

    function initHeader() {
        const header = document.querySelector('header, .mobile-header');
        if (!header) {
            return;
        }
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                header.style.background = 'rgba(255, 253, 249, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                header.classList.add('scrolled');
            } else {
                header.style.background = 'rgba(255, 253, 249, 0.95)';
                header.style.boxShadow = 'none';
                header.classList.remove('scrolled');
            }
            lastScrollY = scrollY;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }
        window.addEventListener('scroll', requestTick, { passive: true });
        updateHeader();
    }

    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-toggle');
        const sidebar = document.querySelector('.yarn-sidebar');
        if (!mobileMenuBtn || !sidebar) {
            return;
        }
        console.log('📱 Menu mobile inicializado (Correção Aplicada)');
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (sidebar.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        const navLinks = sidebar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
                document.body.style.overflow = '';
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function initParallax() {
        const cards = document.querySelectorAll('.yarn-card');
        if (cards.length === 0) return;
        const handleScroll = debounce(() => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                if (scrollPercent > 0 && scrollPercent < 1) {
                    const movement = (scrollPercent - 0.5) * 20;
                    card.style.transform = `translateY(${-movement}px)`;
                }
            });
        }, 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    console.log('⏱️ Script carregado em:', performance.now().toFixed(2), 'ms');
})();
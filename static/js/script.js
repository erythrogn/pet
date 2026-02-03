/**
 * ================================================================
 * SCRIPT DE ANIMAÇÃO - TIMELINE FIO DE LÃ
 * Sistema robusto de scroll reveal com Intersection Observer
 * ================================================================
 */

(function() {
    'use strict';
    
    // ===== CONFIGURAÇÕES GLOBAIS =====
    const CONFIG = {
        // Threshold para ativar animação (10% visível)
        intersectionThreshold: 0.1,
        // Margem para disparar antes do elemento aparecer
        rootMargin: '0px 0px -100px 0px',
        // Delay entre animações em cascata (ms)
        cascadeDelay: 150,
        // Se deve animar apenas uma vez
        animateOnce: true
    };
    
    // ===== ESPERA O DOM CARREGAR =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    /**
     * Função principal de inicialização
     */
    function init() {
        console.log('🧶 Sistema de animação Timeline iniciado');
        
        // Inicializa animação da linha central
        initTimelineLine();
        
        // Inicializa observer para items da timeline
        initTimelineItems();
        
        // Inicializa observer para elementos genéricos
        initRevealElements();
        
        // Inicializa header dinâmico
        initHeader();
        
        // Inicializa menu mobile
        initMobileMenu();
        
        console.log('✅ Todas as animações configuradas');
    }
    
    /**
     * Anima a linha central da timeline
     */
    function initTimelineLine() {
        const timeline = document.querySelector('.yarn-timeline');
        
        if (!timeline) {
            console.warn('⚠️ Timeline não encontrada');
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona classe para crescer a linha
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
    
    /**
     * Anima items da timeline sequencialmente
     */
    function initTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        if (timelineItems.length === 0) {
            console.warn('⚠️ Nenhum item da timeline encontrado');
            return;
        }
        
        console.log(`📍 ${timelineItems.length} items da timeline detectados`);
        
        // Configuração do observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Adiciona delay progressivo baseado na ordem
                    const delay = index * CONFIG.cascadeDelay;
                    
                    setTimeout(() => {
                        entry.target.classList.add('active');
                        console.log(`✨ Item ${index + 1} ativado`);
                    }, delay);
                    
                    // Remove observação se configurado para animar apenas uma vez
                    if (CONFIG.animateOnce) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: CONFIG.intersectionThreshold,
            rootMargin: CONFIG.rootMargin
        });
        
        // Observa cada item
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    /**
     * Anima elementos com classe .reveal
     */
    function initRevealElements() {
        const revealElements = document.querySelectorAll('.reveal');
        
        if (revealElements.length === 0) {
            return;
        }
        
        console.log(`👁️ ${revealElements.length} elementos reveal detectados`);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Pequeno delay para efeito cascata
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
    
    /**
     * Header dinâmico com scroll
     */
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
        
        // Executa uma vez no início
        updateHeader();
    }
    
    /**
     * Menu mobile toggle
     */
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu') || 
                             document.getElementById('mobile-toggle');
        const navList = document.getElementById('nav-list') || 
                       document.querySelector('.yarn-nav');
        
        if (!mobileMenuBtn || !navList) {
            return;
        }
        
        console.log('📱 Menu mobile inicializado');
        
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Toggle do menu
            navList.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
            
            // Troca ícone se existir
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navList.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Previne scroll quando menu aberto
            if (navList.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fecha menu ao clicar em link
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
                document.body.style.overflow = '';
                
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Fecha menu ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
                document.body.style.overflow = '';
                
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    /**
     * Utilitário: Debounce para performance
     */
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
    
    /**
     * Animação extra: Parallax suave nos cards (opcional)
     */
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
    
    // ===== LOG DE PERFORMANCE =====
    console.log('⏱️ Script carregado em:', performance.now().toFixed(2), 'ms');
    
})();

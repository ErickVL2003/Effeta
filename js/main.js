/**
 * EFFETA - Funciones Globales (Actualizado para estructura unificada)
 * Inicialización después de cargar módulos
 */

/**
 * Inicializa todas las funcionalidades después de cargar los módulos
 * @function initAfterModulesLoaded
 */
function initAfterModulesLoaded() {
    console.log('🔄 Inicializando funcionalidades después de cargar módulos...');
    
    // Inicializar componentes
    initScrollAnimations();
    initHeaderBehavior();
    initLoadingBar();
    initParticles();
    initNavigation();
    initFormHandler();
    initAnimations();
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a EFFETA! Descubre una comunidad transformadora.');
    }, 1500);
    
    // Añadir efectos de interacción a elementos
    initInteractiveElements();
    
    console.log('✅ Todas las funcionalidades inicializadas');
}

// Variables globales
let lastScrollY = window.scrollY;
const header = document.getElementById('mainHeader');

/**
 * Inicializa el comportamiento del header al hacer scroll
 * @function initHeaderBehavior
 */
function initHeaderBehavior() {
    if (!header) {
        console.warn('Header no encontrado');
        return;
    }
    
    window.addEventListener('scroll', () => {
        // Cambiar estilo del header al hacer scroll
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 25, 41, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(10, 25, 41, 0.9)';
            header.style.boxShadow = 'none';
        }

        // Ocultar/mostrar header al hacer scroll
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });
}

/**
 * Inicializa la barra de progreso de carga
 * @function initLoadingBar
 */
function initLoadingBar() {
    const loadingBar = document.getElementById('loadingBar');
    
    if (!loadingBar) return;
    
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const trackLength = docHeight - winHeight;
        const progress = Math.floor(scrollTop / trackLength * 100);
        
        loadingBar.style.width = progress + '%';
    });
}

/**
 * Inicializa las animaciones al hacer scroll
 * @function initScrollAnimations
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('.landing-section');
    
    function checkVisibility() {
        const winHeight = window.innerHeight;
        const sectionVisible = 150;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < winHeight - sectionVisible) {
                section.classList.add('visible');
            }
        });
    }
    
    // Verificar visibilidad al cargar y al hacer scroll
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    
    // Verificar visibilidad inicial
    checkVisibility();
}

/**
 * Inicializa elementos interactivos
 * @function initInteractiveElements
 */
function initInteractiveElements() {
    // Efectos de interacción con botones y enlaces
    document.querySelectorAll('.btn, .social-link, .event-button').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Muestra una notificación tipo toast
 * @function showNotification
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en milisegundos (opcional)
 */
function showNotification(message, duration = 4000) {
    const toast = document.getElementById('notificationToast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/**
 * Crea efecto de confeti visual
 * @function createConfetti
 */
function createConfetti() {
    const colors = ['#d32f2f', '#ef5350', '#42a5f5', '#66bb6a', '#ffca28'];
    const container = document.querySelector('body');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.top = '0';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.opacity = '0.8';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        
        container.appendChild(confetti);
        
        // Animación
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${360 * 3}deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Inicializar cuando los módulos estén cargados
if (typeof initAfterModulesLoaded === 'function') {
    // Esta función será llamada por modules-loader.js
} else {
    // Fallback: inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        console.log('⚠️  Inicializando sin módulos cargados');
        initAfterModulesLoaded();
    });
}
/**
 * EFFETA - Animaciones
 * Contiene funciones para animaciones y efectos visuales
 */

/**
 * Inicializa las animaciones de scroll
 * @function initScrollAnimations
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
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
 * Efecto de escritura para el título (opcional)
 * @function typeWriterEffect
 */
function typeWriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 150);
}

/**
 * Inicializa todas las animaciones
 * @function initAnimations
 */
function initAnimations() {
    initScrollAnimations();
    
    // Descomentar si se quiere el efecto de escritura
    // setTimeout(typeWriterEffect, 1000);
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initAnimations);
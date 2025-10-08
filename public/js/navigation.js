/**
 * EFFETA - Navegación
 * Maneja el menú hamburguesa y la navegación suave
 */

/**
 * Inicializa la navegación del sitio
 * @function initNavigation
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    // Menu Hamburguesa
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(n => {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navegación suave para enlaces internos
    initSmoothScrolling();
}

/**
 * Inicializa el desplazamiento suave para enlaces internos
 * @function initSmoothScrolling
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('mainHeader').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inicializar navegación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initNavigation);
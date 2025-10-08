/**
 * EFFETA - JavaScript para el Hero Section Mejorado
 * Partículas y efectos interactivos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas de fondo
    initParticles();
    
    // Efectos de interacción para el versículo
    initVerseInteractions();
    
    // Animación de scroll suave
    initSmoothScrolling();
});

function initParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Tamaño y posición aleatorios
    const size = Math.random() * 4 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    // Animación
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    container.appendChild(particle);
}

function initVerseInteractions() {
    const effetaWord = document.querySelector('.effeta-word');
    if (!effetaWord) return;
    
    effetaWord.addEventListener('click', function() {
        this.style.transform = 'scale(1.2)';
        this.style.textShadow = '0 0 30px rgba(239, 83, 80, 0.8)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1.1)';
            this.style.textShadow = '0 0 20px rgba(239, 83, 80, 0.6)';
        }, 300);
    });
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
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
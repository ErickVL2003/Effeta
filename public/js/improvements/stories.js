/**
 * EFFETA - JavaScript para la sección de Historias
 * Efectos de entrada, interacciones y animaciones
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar observador de intersección
    initStoriesIntersection();
    
    // Inicializar efectos de hover
    initStoriesHoverEffects();
    
    // Inicializar animaciones de transformación
    initTransformationAnimations();
});

function initStoriesIntersection() {
    const storiesSection = document.getElementById('stories');
    if (!storiesSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar estadísticas
                animateStats();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(storiesSection);
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const duration = 2000;
        const steps = 60;
        const stepValue = parseInt(finalValue.replace('+', '').replace('%', '')) / steps;
        let currentStep = 0;
        
        // Reset para animación
        if (finalValue.includes('+')) {
            stat.textContent = '+0';
        } else if (finalValue.includes('%')) {
            stat.textContent = '0%';
        } else {
            stat.textContent = '0';
        }
        
        const timer = setInterval(() => {
            currentStep++;
            let currentValue = Math.round(stepValue * currentStep);
            
            if (finalValue.includes('+')) {
                stat.textContent = '+' + currentValue;
            } else if (finalValue.includes('%')) {
                stat.textContent = currentValue + '%';
            } else {
                stat.textContent = currentValue;
            }
            
            if (currentStep >= steps) {
                stat.textContent = finalValue;
                clearInterval(timer);
            }
        }, duration / steps);
    });
}

function initStoriesHoverEffects() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            
            // Efecto de iluminación sutil
            const quote = this.querySelector('.story-quote');
            if (quote) {
                quote.style.color = 'rgba(255, 255, 255, 0.3)';
                quote.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            
            // Restaurar quote
            const quote = this.querySelector('.story-quote');
            if (quote) {
                quote.style.color = 'rgba(255, 255, 255, 0.1)';
                quote.style.transform = 'scale(1)';
            }
        });
    });
}

function initTransformationAnimations() {
    const transformations = document.querySelectorAll('.story-transformation');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });
    
    transformations.forEach(transformation => {
        transformation.style.opacity = '0';
        transformation.style.transform = 'translateY(20px)';
        transformation.style.transition = 'all 0.6s ease';
        observer.observe(transformation);
    });
}

// Efecto de partículas para el fondo
function initStoriesParticles() {
    const background = document.querySelector('.stories-background');
    if (!background) return;
    
    // Crear partículas adicionales
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-element';
        particle.style.cssText = `
            width: ${Math.random() * 80 + 20}px;
            height: ${Math.random() * 80 + 20}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 8 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        background.appendChild(particle);
    }
}

// Inicializar partículas cuando la sección esté lista
setTimeout(initStoriesParticles, 1000);
/**
 * EFFETA - JavaScript para la sección de Eventos
 * Contador animado, observador de intersección y más
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar observador de intersección
    initIntersectionObserver();
    
    // Inicializar contadores animados
    initCounters();
    
    // Inicializar efectos de hover
    initHoverEffects();
});

function initIntersectionObserver() {
    const eventsSection = document.getElementById('events');
    if (!eventsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Iniciar contadores cuando la sección sea visible
                startCounters();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(eventsSection);
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60 FPS
        
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Guardar la función para iniciarla después
        counter.updateCounter = updateCounter;
    });
}

function startCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        if (counter.updateCounter) {
            // Pequeño delay para mejor efecto
            setTimeout(() => {
                counter.updateCounter();
            }, 500);
        }
    });
}

function initHoverEffects() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// Efecto de partículas para el fondo (opcional)
function initEventParticles() {
    const eventsSection = document.querySelector('.events-section');
    if (!eventsSection) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        eventsSection.appendChild(particle);
    }
}

// Inicializar partículas cuando la sección esté lista
setTimeout(initEventParticles, 1000);
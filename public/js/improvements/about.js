/**
 * EFFETA - JavaScript para la sección Quiénes Somos Simplificada
 * Solo conserva funcionalidades esenciales
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar observador de intersección
    initAboutIntersection();
    
    // Inicializar contadores de estadísticas
    initStatsCounters();
});

function initAboutIntersection() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Iniciar contadores cuando la sección sea visible
                startStatsCounters();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(aboutSection);
}

function initStatsCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const steps = 60;
        const stepValue = target / steps;
        let currentStep = 0;
        
        // Guardar la función de animación
        counter.animateCounter = function() {
            currentStep++;
            let currentValue = Math.round(stepValue * currentStep);
            
            if (currentValue < target) {
                counter.textContent = currentValue;
                requestAnimationFrame(counter.animateCounter);
            } else {
                counter.textContent = target;
            }
        };
    });
}

function startStatsCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        if (counter.animateCounter) {
            // Pequeño delay para mejor efecto visual
            setTimeout(() => {
                counter.animateCounter();
            }, 500);
        }
    });
}

// Efecto de partículas para el fondo
function initAboutParticles() {
    const background = document.querySelector('.about-background');
    if (!background) return;
    
    // Crear partículas adicionales
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-shape';
        particle.style.cssText = `
            width: ${Math.random() * 60 + 20}px;
            height: ${Math.random() * 60 + 20}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 6}s;
        `;
        background.appendChild(particle);
    }
}

// Inicializar partículas cuando la sección esté lista
setTimeout(initAboutParticles, 1000);
/**
 * EFFETA - Configuración de Partículas
 * Inicializa y configura el efecto de partículas en el fondo
 */

/**
 * Inicializa las partículas en el fondo
 * @function initParticles
 */
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: "#d32f2f" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#d32f2f",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            }
        });
    } else {
        console.warn('particlesJS no está cargado');
    }
}

// Inicializar partículas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initParticles);
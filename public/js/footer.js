/**
 * EFFETA - JavaScript para el Footer Mejorado
 * Funcionalidades interactivas y efectos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades del footer
    initBackToTop();
    initNewsletter();
    initParticles();
    initSocialTooltips();
    initSmoothScroll();
});

// Botón "Volver al inicio"
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll suave al hacer clic
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Formulario de newsletter
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            showNewsletterMessage('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Simular envío (en producción, aquí iría una petición AJAX)
        showNewsletterMessage('¡Gracias por suscribirte! Te hemos enviado un email de confirmación.', 'success');
        emailInput.value = '';
        
        // Aquí iría la lógica real de suscripción
        console.log('Email suscrito:', email);
    });
}

// Validación de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar mensaje de newsletter
function showNewsletterMessage(message, type) {
    // Remover mensaje anterior si existe
    const existingMessage = document.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear nuevo mensaje
    const messageEl = document.createElement('div');
    messageEl.className = `newsletter-message newsletter-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        margin-top: 15px;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 0.9rem;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
        color: ${type === 'success' ? '#4CAF50' : '#F44336'};
        border: 1px solid ${type === 'success' ? '#4CAF50' : '#F44336'};
    `;
    
    document.querySelector('.newsletter').appendChild(messageEl);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

// Partículas de fondo
function initParticles() {
    const particlesContainer = document.getElementById('footerParticles');
    
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createFooterParticle(particlesContainer);
    }
}

function createFooterParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Tamaño y posición aleatorios
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = Math.random() * 0.2 + 0.1;
    
    // Animación
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    container.appendChild(particle);
}

// Tooltips para redes sociales
function initSocialTooltips() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Asegurar que el tooltip sea visible
            const tooltip = this.querySelector('.social-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            // Ocultar tooltip
            const tooltip = this.querySelector('.social-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                tooltip.style.transform = 'translateX(-50%) translateY(10px)';
            }
        });
    });
}

// Scroll suave para enlaces internos
function initSmoothScroll() {
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efecto de aparición al hacer scroll
function initScrollAnimation() {
    const footerElements = document.querySelectorAll('.footer-about, .footer-links-container, .footer-contact, .footer-social');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    footerElements.forEach(el => {
        observer.observe(el);
    });
}

// Inicializar animación de scroll
setTimeout(initScrollAnimation, 1000);
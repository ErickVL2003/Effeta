/**
 * EFFETA - Manejo de Formularios
 * Gestiona el envío y validación de formularios
 */

/**
 * Inicializa el manejo de formularios
 * @function initFormHandler
 */
function initFormHandler() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Añadir validación en tiempo real
    initFormValidation(contactForm);
}

/**
 * Maneja el envío del formulario de contacto
 * @function handleFormSubmission
 * @param {Event} e - Evento de envío del formulario
 */
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validar formulario antes de enviar
    if (!validateForm(this)) {
        showNotification('Por favor, completa todos los campos requeridos correctamente.', 5000);
        return;
    }
    
    // Mostrar notificación de éxito
    showNotification('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    
    // Efecto de confeti visual
    if (typeof createConfetti === 'function') {
        createConfetti();
    }
    
    // Resetear formulario después de un delay
    setTimeout(() => {
        this.reset();
    }, 2000);
}

/**
 * Inicializa la validación en tiempo real del formulario
 * @function initFormValidation
 * @param {HTMLFormElement} form - Elemento del formulario
 */
function initFormValidation(form) {
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => clearFieldError(field));
    });
}

/**
 * Valida un campo individual del formulario
 * @function validateField
 * @param {HTMLElement} field - Campo a validar
 * @returns {boolean} - True si el campo es válido
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Limpiar errores previos
    clearFieldError(field);
    
    // Validar campo requerido
    if (field.hasAttribute('required') && value === '') {
        showFieldError(field, 'Este campo es requerido');
        isValid = false;
    }
    
    // Validar email
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Por favor, introduce un email válido');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Valida todo el formulario
 * @function validateForm
 * @param {HTMLFormElement} form - Formulario a validar
 * @returns {boolean} - True si el formulario es válido
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Muestra un error en un campo del formulario
 * @function showFieldError
 * @param {HTMLElement} field - Campo donde mostrar el error
 * @param {string} message - Mensaje de error
 */
function showFieldError(field, message) {
    // Remover error previo si existe
    clearFieldError(field);
    
    // Añadir clase de error
    field.classList.add('error');
    
    // Crear elemento de error
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--primary-color)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    
    // Insertar después del campo
    field.parentNode.appendChild(errorElement);
}

/**
 * Limpia el error de un campo del formulario
 * @function clearFieldError
 * @param {HTMLElement} field - Campo a limpiar
 */
function clearFieldError(field) {
    field.classList.remove('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Inicializar manejo de formularios cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initFormHandler);
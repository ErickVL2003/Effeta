/**
 * EFFETA - Cargador de Módulos HTML (Versión Mejorada)
 * Carga dinámicamente los módulos manteniendo la estructura de landing page
 */

/**
 * Módulos disponibles en la aplicación con sus contenedores específicos
 * @constant {Array}
 */
const MODULES = [
    { 
        id: 'header', 
        file: 'modules/header.html', 
        container: 'header-container',
        type: 'fixed'
    },
    { 
        id: 'hero', 
        file: 'modules/hero.html', 
        container: 'hero-container',
        type: 'section'
    },
    { 
        id: 'about', 
        file: 'modules/about.html', 
        container: 'about-container',
        type: 'section'
    },
    { 
        id: 'stories', 
        file: 'modules/stories.html', 
        container: 'stories-container',
        type: 'section'
    },
    { 
        id: 'events', 
        file: 'modules/events.html', 
        container: 'events-container',
        type: 'section'
    },
    { 
        id: 'join', 
        file: 'modules/join.html', 
        container: 'join-container',
        type: 'section'
    },
    { 
        id: 'footer', 
        file: 'modules/footer.html', 
        container: 'footer-container',
        type: 'footer'
    }
];

/**
 * Carga un módulo HTML específico en su contenedor correspondiente
 * @async
 * @function loadModule
 * @param {string} moduleId - ID del módulo a cargar
 * @param {string} filePath - Ruta del archivo HTML del módulo
 * @param {string} containerId - ID del contenedor donde cargar el módulo
 * @param {string} type - Tipo de módulo (fixed, section, footer)
 * @returns {Promise<boolean>} - True si se cargó correctamente
 */
async function loadModule(moduleId, filePath, containerId, type) {
    try {
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`Error al cargar ${filePath}: ${response.status}`);
        }
        
        const html = await response.text();
        const container = document.getElementById(containerId);
        
        if (!container) {
            throw new Error(`Contenedor ${containerId} no encontrado`);
        }
        
        // Limpiar contenedor antes de cargar
        container.innerHTML = '';
        
        // Crear elemento wrapper según el tipo
        let wrapper;
        if (type === 'section') {
            wrapper = document.createElement('section');
            wrapper.id = moduleId;
            wrapper.className = 'landing-section';
        } else if (type === 'fixed') {
            wrapper = document.createElement('header');
            wrapper.id = moduleId;
        } else if (type === 'footer') {
            wrapper = document.createElement('footer');
            wrapper.id = moduleId;
        } else {
            wrapper = document.createElement('div');
            wrapper.id = moduleId;
        }
        
        wrapper.innerHTML = html;
        container.appendChild(wrapper);
        
        console.log(`✅ Módulo ${moduleId} cargado en ${containerId}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error cargando módulo ${moduleId}:`, error);
        
        // Cargar contenido de respaldo
        loadFallbackContent(moduleId, containerId, type);
        return false;
    }
}

/**
 * Carga contenido de respaldo si falla la carga del módulo
 * @function loadFallbackContent
 * @param {string} moduleId - ID del módulo
 * @param {string} containerId - ID del contenedor
 * @param {string} type - Tipo de módulo
 */
function loadFallbackContent(moduleId, containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let fallbackHTML = '';
    
    switch(moduleId) {
        case 'header':
            fallbackHTML = `
                <header id="mainHeader">
                    <div class="nav-container">
                        <a href="#hero" class="logo">EFF<span>ETA</span></a>
                        <nav class="nav-menu">
                            <a href="#hero">Inicio</a>
                            <a href="#about">Quiénes Somos</a>
                            <a href="#stories">Historias</a>
                            <a href="#events">Eventos</a>
                            <a href="#join">Únete</a>
                        </nav>
                    </div>
                </header>
            `;
            break;
        case 'hero':
            fallbackHTML = `
                <section id="hero" class="landing-section">
                    <div class="section-container">
                        <h1>EFFETA - Comunidad Juvenil</h1>
                        <p>Cargando contenido...</p>
                    </div>
                </section>
            `;
            break;
        // ... otros casos para cada módulo
        default:
            fallbackHTML = `<div class="error-message">Error cargando ${moduleId}</div>`;
    }
    
    container.innerHTML = fallbackHTML;
}

/**
 * Carga todos los módulos de forma secuencial
 * @async
 * @function loadAllModules
 */
async function loadAllModules() {
    console.log('🚀 Iniciando carga de módulos...');
    
    const loadPromises = MODULES.map(module => 
        loadModule(module.id, module.file, module.container, module.type)
    );
    
    try {
        await Promise.all(loadPromises);
        console.log('🎉 Todos los módulos cargados correctamente');
        
        // Inicializar funcionalidades después de cargar todos los módulos
        setTimeout(() => {
            if (typeof initAfterModulesLoaded === 'function') {
                initAfterModulesLoaded();
            }
        }, 500);
        
    } catch (error) {
        console.error('❌ Error cargando módulos:', error);
    }
}

/**
 * Carga un módulo específico por su ID
 * @function loadSpecificModule
 * @param {string} moduleId - ID del módulo a recargar
 */
async function loadSpecificModule(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    if (module) {
        await loadModule(module.id, module.file, module.container, module.type);
    }
}

/**
 * Recarga todos los módulos (útil para desarrollo)
 * @function reloadAllModules
 */
async function reloadAllModules() {
    console.log('🔄 Recargando todos los módulos...');
    await loadAllModules();
}

// Iniciar carga de módulos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadAllModules);

// Exponer funciones globalmente para desarrollo
window.EFFETA = {
    loadModule: loadSpecificModule,
    reloadAll: reloadAllModules,
    modules: MODULES
};
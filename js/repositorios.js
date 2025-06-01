// ============ CONFIGURACIÓN DE SECCIONES ============
// Array con todas las secciones disponibles
const sections = ['ai-section', 'api-section'];
// INSTRUCCIÓN: Cuando agregues nuevas secciones, añade su ID aquí

// ============ FUNCIONES PRINCIPALES ============

/**
 * Alternar visibilidad de secciones (acordeón)
 * Solo una sección puede estar abierta a la vez
 */
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const arrow = document.getElementById(sectionId.replace('-section', '-arrow'));
    
    // Si la sección ya está activa, la cerramos
    if (section.classList.contains('active')) {
        section.classList.remove('active');
        arrow.classList.remove('rotated');
        return;
    }
    
    // Cerrar todas las secciones primero
    sections.forEach(id => {
        const sec = document.getElementById(id);
        const arr = document.getElementById(id.replace('-section', '-arrow'));
        if (sec && arr) {
            sec.classList.remove('active');
            arr.classList.remove('rotated');
        }
    });
    
    // Abrir la sección seleccionada
    section.classList.add('active');
    arrow.classList.add('rotated');
    
    // Scroll suave hacia la sección
    section.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

/**
 * Función para abrir URLs en nueva pestaña
 */
function openUrl(url) {
    // Validar que la URL tenga protocolo
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    // Abrir en nueva pestaña
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Mostrar emoji de confirmación
    showClickEmoji('🚀', event);
}

/**
 * Función para regresar al inicio
 */
function goHome() {
    // Mostrar emoji de casa
    showClickEmoji('🏠', event);
    
    // Pequeño delay para el efecto visual
    setTimeout(() => {
        window.location.href = 'inicio.html';
    }, 300);
}

/**
 * Mostrar emoji flotante al hacer click
 */
function showClickEmoji(emoji, event) {
    const clickEmoji = document.createElement('div');
    clickEmoji.className = 'click-emoji';
    clickEmoji.textContent = emoji;
    
    // Posicionar en la ubicación del click
    clickEmoji.style.left = (event.clientX - 15) + 'px';
    clickEmoji.style.top = (event.clientY - 15) + 'px';
    
    document.body.appendChild(clickEmoji);
    
    // Eliminar después de la animación
    setTimeout(() => {
        if (clickEmoji.parentNode) {
            clickEmoji.parentNode.removeChild(clickEmoji);
        }
    }, 2000);
}

/**
 * Actualizar fecha de última actualización
 */
function updateLastUpdate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    const dateString = now.toLocaleDateString('es-ES', options);
    
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement) {
        lastUpdateElement.textContent = dateString;
    }
}

// ============ EVENTOS Y CONFIGURACIÓN INICIAL ============

/**
 * Configuración inicial cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar fecha
    updateLastUpdate();
    
    // Agregar efectos de hover a las tarjetas de URL
    addHoverEffects();
    
    // Configurar teclas de acceso rápido
    setupKeyboardShortcuts();
    
    console.log('🔥 Repositorios cargados correctamente');
});

/**
 * Agregar efectos de hover dinámicos
 */
function addHoverEffects() {
    const urlItems = document.querySelectorAll('.url-item');
    
    urlItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(255, 0, 64, 0.5)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

/**
 * Configurar atajos de teclado
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // ESC para cerrar todas las secciones
        if (e.key === 'Escape') {
            sections.forEach(id => {
                const sec = document.getElementById(id);
                const arr = document.getElementById(id.replace('-section', '-arrow'));
                if (sec && arr) {
                    sec.classList.remove('active');
                    arr.classList.remove('rotated');
                }
            });
        }
        
        // Ctrl + H para ir al inicio
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            goHome();
        }
    });
}

// ============ PLANTILLA PARA AGREGAR NUEVAS SECCIONES ============
/*
INSTRUCCIONES PARA AGREGAR NUEVAS SECCIONES:

1. En el HTML, copia la estructura de sección completa
2. Cambia los IDs únicos (ej: 'database-section', 'database-arrow')
3. Agrega el nuevo ID al array 'sections' al inicio de este archivo
4. La función toggleSection() funcionará automáticamente

EJEMPLO DE NUEVA SECCIÓN:
```html
<div class="repo-section">
    <div class="section-header" onclick="toggleSection('database-section')">
        <div class="header-left">
            <span class="folder-icon">📁</span>
            <h2 class="section-title">Bases de Datos</h2>
            <span class="url-count">(2 recursos)</span>
        </div>
        <span class="toggle-arrow" id="database-arrow">▼</span>
    </div>
    
    <div class="section-content" id="database-section">
        <!-- Contenido de URLs aquí -->
    </div>
</div>
```

Y agregar 'database-section' al array sections en línea 4.
*/

// ============ UTILIDADES ADICIONALES ============

/**
 * Copiar URL al portapapeles
 */
function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
        showNotification('URL copiada al portapapeles! 📋');
    }).catch(() => {
        // Fallback para navegadores antiguos
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('URL copiada al portapapeles! 📋');
    });
}

/**
 * Mostrar notificación temporal
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff0040, #ff3366);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(255, 0, 64, 0.5);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ============ EFECTOS ESPECIALES ============

/**
 * Efecto de partículas al hacer click en secciones
 */
function createParticleEffect(x, y) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: #ff0040;
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Agregar CSS para partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes particleFloat {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

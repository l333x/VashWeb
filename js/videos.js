// ============ CONFIGURACIÓN GLOBAL ============
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar fecha de última actualización
    updateLastModified();
    
    // Asegurar que todas las secciones estén cerradas al cargar
    closeAllSections();
});

// ============ ARRAY DE SECCIONES PARA CONTROL ============
const videoSections = [
    'programming-section',
    'ai-section'
    // Agregar aquí nuevas secciones cuando se creen
];

// ============ FUNCIÓN PARA ALTERNAR SECCIONES ============
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const arrow = document.getElementById(sectionId.replace('-section', '-arrow'));
    
    if (!section || !arrow) return;
    
    // Si la sección está activa, la cerramos
    if (section.classList.contains('active')) {
        section.classList.remove('active');
        arrow.classList.remove('rotated');
    } else {
        // Cerrar todas las otras secciones primero
        closeAllSections();
        
        // Abrir la sección seleccionada
        section.classList.add('active');
        arrow.classList.add('rotated');
    }
}

// ============ FUNCIÓN PARA CERRAR TODAS LAS SECCIONES ============
function closeAllSections() {
    videoSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const arrow = document.getElementById(sectionId.replace('-section', '-arrow'));
        
        if (section && arrow) {
            section.classList.remove('active');
            arrow.classList.remove('rotated');
        }
    });
}

// ============ FUNCIÓN PARA ABRIR VIDEOS ============
function openVideo(url) {
    if (url && url.trim() !== '') {
        // Abrir en nueva pestaña
        window.open(url, '_blank', 'noopener,noreferrer');
        
        // Efecto visual opcional
        showSuccessMessage('🎬 Abriendo video...');
    } else {
        showErrorMessage('❌ URL del video no válida');
    }
}

// ============ FUNCIÓN PARA VOLVER AL INICIO ============
function goHome() {
    // Efecto visual antes de navegar
    showSuccessMessage('🏠 Regresando al inicio...');
    
    // Pequeño delay para mostrar el mensaje
    setTimeout(() => {
        window.location.href = 'inicio.html';
    }, 500);
}

// ============ FUNCIÓN PARA MOSTRAR FECHA DE ACTUALIZACIÓN ============
function updateLastModified() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        lastUpdateElement.textContent = now.toLocaleDateString('es-ES', options);
    }
}

// ============ FUNCIONES DE MENSAJES ============
function showSuccessMessage(message) {
    showFloatingMessage(message, 'success');
}

function showErrorMessage(message) {
    showFloatingMessage(message, 'error');
}

function showFloatingMessage(message, type) {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #ff0040, #ff3366)' : 'linear-gradient(45deg, #ff4444, #ff6666)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(255, 0, 64, 0.5);
        z-index: 10000;
        font-weight: bold;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animar entrada
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y eliminar
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// ============ EVENTOS GLOBALES ============
// Manejar clicks en el documento para emojis (requiere emojis.js)
document.addEventListener('click', function(e) {
    // Solo crear emojis si no se hizo click en elementos interactivos
    if (!e.target.closest('button') && !e.target.closest('.section-header') && !e.target.closest('a')) {
        // Esta función debe estar definida en emojis.js
        if (typeof createClickEmoji === 'function') {
            createClickEmoji(e.clientX, e.clientY);
        }
    }
});

// ============ ATAJOS DE TECLADO ============
document.addEventListener('keydown', function(e) {
    // ESC para cerrar todas las secciones
    if (e.key === 'Escape') {
        closeAllSections();
    }
    
    // Ctrl + H para ir al inicio
    if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        goHome();
    }
});

// ============ FUNCIÓN PARA AGREGAR NUEVAS SECCIONES (HELPER) ============
/*
PARA DESARROLLADORES:
Cuando agregues una nueva sección, asegúrate de:
1. Agregar el ID de la sección al array 'videoSections' al inicio de este archivo
2. Seguir la convención de nombres: 'nombre-section' para la sección y 'nombre-arrow' para la flecha
3. Usar la función toggleSection('nombre-section') en el onclick del header

Ejemplo:
- HTML: id="webdev-section" y id="webdev-arrow"
- Array: agregar 'webdev-section' al array videoSections
- Onclick: onclick="toggleSection('webdev-section')"
*/

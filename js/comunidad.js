// Configuración de números de WhatsApp y mensajes
const whatsappConfig = {
    phoneNumber: '593995866394', // Número de WhatsApp sin el símbolo +
    messages: {
        foro: 'Hola! Me gustaría unirme al foro comunitario y participar en las discusiones.',
        compras: 'Hola! Estoy interesado en realizar una compra. ¿Podrían ayudarme con el catálogo de productos?'
    }
};

// Función para abrir WhatsApp con mensaje personalizado
function openWhatsApp(type) {
    const message = whatsappConfig.messages[type];
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`;
    
    // Abrir en una nueva pestaña
    window.open(whatsappUrl, '_blank');
    
    // Crear efecto visual al hacer click
    createClickEffect(event);
}

// Función para crear efecto visual al hacer click
function createClickEffect(event) {
    const button = event.target.closest('.module-btn');
    if (!button) return;
    
    // Crear elemento de efecto
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: clickRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    // Añadir keyframes para la animación si no existe
    if (!document.querySelector('#clickAnimation')) {
        const style = document.createElement('style');
        style.id = 'clickAnimation';
        style.textContent = `
            @keyframes clickRipple {
                0% { width: 0; height: 0; opacity: 1; }
                100% { width: 100px; height: 100px; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.appendChild(effect);
    
    // Remover el efecto después de la animación
    setTimeout(() => {
        effect.remove();
    }, 600);
}

// Función para mostrar notificación de éxito
function showSuccessNotification(message) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #25d366, #128c7e);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
        font-weight: bold;
    `;
    
    // Añadir animación si no existe
    if (!document.querySelector('#notificationAnimation')) {
        const style = document.createElement('style');
        style.id = 'notificationAnimation';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remover la notificación después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Función para detectar si el usuario está en móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Función para manejar clicks en los botones de WhatsApp
function handleWhatsAppClick(event) {
    const button = event.target.closest('.whatsapp-btn');
    const type = button.getAttribute('data-type');
    
    // Prevenir el comportamiento por defecto
    event.preventDefault();
    
    // Crear efecto visual
    createClickEffect(event);
    
    // Abrir WhatsApp después del efecto
    setTimeout(() => {
        openWhatsApp(type);
        
        // Mostrar notificación
        const messages = {
            foro: 'Redirigiendo al foro comunitario...',
            compras: 'Redirigiendo a compras en línea...'
        };
        showSuccessNotification(messages[type]);
    }, 100);
}

// Función para animar las cards al hacer scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.module-card, .benefit-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Función para crear efectos de partículas en hover
function createParticleEffect(element) {
    element.addEventListener('mouseenter', () => {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--color-primario);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat 1s ease-out forwards;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            element.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    });
}

// Función para añadir animación de partículas
function addParticleAnimation() {
    if (!document.querySelector('#particleAnimation')) {
        const style = document.createElement('style');
        style.id = 'particleAnimation';
        style.textContent = `
            @keyframes particleFloat {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(-50px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Función para mostrar hora actual
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Actualizar el texto de estado si existe
    const statusElement = document.querySelector('.status-active');
    if (statusElement) {
        statusElement.textContent = `¡Estamos en línea! - ${timeString}`;
    }
}

// Función para validar horario de atención
function isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = domingo, 1 = lunes, etc.
    
    // Horario: Lunes a Viernes 8:00 AM - 6:00 PM
    const isWeekday = day >= 1 && day <= 5;
    const isBusinessHour = hour >= 8 && hour < 18;
    
    return isWeekday && isBusinessHour;
}

// Función para actualizar estado de disponibilidad
function updateAvailabilityStatus() {
    const statusElement = document.querySelector('.status-active');
    if (!statusElement) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    if (isBusinessHours()) {
        statusElement.textContent = `¡Estamos en línea! - ${timeString}`;
        statusElement.style.color = 'var(--color-titulo)';
    } else {
        statusElement.textContent = `Fuera de horario - ${timeString}`;
        statusElement.style.color = '#ff6b6b';
    }
}

// Función para crear efecto de typing en el título
function createTypingEffect() {
    const title = document.querySelector('.sections-title');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    
    let index = 0;
    const typingInterval = setInterval(() => {
        title.textContent = originalText.substring(0, index + 1);
        index++;
        
        if (index >= originalText.length) {
            clearInterval(typingInterval);
        }
    }, 100);
}

// Función para crear efecto de contador en los beneficios
function createCounterEffect() {
    const counters = [
        { element: '.benefit-card:nth-child(1) p', target: 5000, suffix: '+ usuarios' },
        { element: '.benefit-card:nth-child(2) p', target: 24, suffix: ' horas' },
        { element: '.benefit-card:nth-child(3) p', target: 99, suffix: '% satisfacción' },
        { element: '.benefit-card:nth-child(4) p', target: 100, suffix: '% seguro' }
    ];
    
    counters.forEach(counter => {
        const element = document.querySelector(counter.element);
        if (!element) return;
        
        let current = 0;
        const increment = counter.target / 50;
        const originalText = element.textContent;
        
        const countInterval = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
                current = counter.target;
                clearInterval(countInterval);
            }
            
            element.textContent = Math.floor(current) + counter.suffix;
        }, 50);
    });
}

// Función para manejar el envío de analytics (opcional)
function trackWhatsAppClick(type) {
    // Aquí puedes añadir código para tracking/analytics
    console.log(`WhatsApp click: ${type} at ${new Date().toISOString()}`);
    
    // Ejemplo de envío a Google Analytics (si está configurado)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'event_category': 'engagement',
            'event_label': type,
            'value': 1
        });
    }
}

// Función principal de inicialización
function initializePage() {
    // Actualizar estado de disponibilidad
    updateAvailabilityStatus();
    
    // Actualizar cada minuto
    setInterval(updateAvailabilityStatus, 60000);
    
    // Añadir event listeners a los botones de WhatsApp
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            handleWhatsAppClick(event);
            trackWhatsAppClick(button.getAttribute('data-type'));
        });
    });
    
    // Añadir efectos de partículas a las cards
    addParticleAnimation();
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        createParticleEffect(card);
    });
    
    // Inicializar animaciones de scroll
    animateOnScroll();
    
    // Crear efecto de typing en el título (con delay)
    setTimeout(createTypingEffect, 500);
    
    // Añadir efectos de teclado para accesibilidad
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('whatsapp-btn')) {
                event.preventDefault();
                focusedElement.click();
            }
        }
    });
    
    // Precargar la página de WhatsApp Web para mejor performance
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'https://wa.me/';
    document.head.appendChild(link);
    
    // Mostrar mensaje de bienvenida después de cargar
    setTimeout(() => {
        showSuccessNotification('¡Bienvenido a nuestra comunidad!');
    }, 1000);
}

// Función para manejar errores
function handleError(error) {
    console.error('Error en la página de comunidad:', error);
    showErrorNotification('Algo salió mal. Por favor, intenta de nuevo.');
}

// Función para mostrar notificaciones de error
function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff4757, #ff3742);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
        font-weight: bold;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Event listener para cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializePage();
    } catch (error) {
        handleError(error);
    }
});

// Event listener para cuando la página esté completamente cargada
window.addEventListener('load', () => {
    // Añadir clase para indicar que la página está completamente cargada
    document.body.classList.add('page-loaded');
    
    // Ocultar cualquier loader si existe
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Manejar errores globales
window.addEventListener('error', (event) => {
    handleError(event.error);
});

// Función para limpiar recursos al salir de la página
window.addEventListener('beforeunload', () => {
    // Limpiar intervalos y timeouts si es necesario
    // Esto es opcional pero buena práctica
});

// Exportar funciones para uso global si es necesario
window.ComunidadApp = {
    openWhatsApp,
    showSuccessNotification,
    isBusinessHours,
    updateAvailabilityStatus
};

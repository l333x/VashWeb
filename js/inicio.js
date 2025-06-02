// Elementos del DOM que necesitamos manipular
const logoutButton = document.getElementById("logoutButton");
const repositoriosBtn = document.getElementById("repositoriosBtn");
const videosBtn = document.getElementById("videosBtn");
const configBtn = document.getElementById("configBtn");
const statsBtn = document.getElementById("statsBtn");
const adminWelcome = document.getElementById("adminWelcome");
const sessionTime = document.getElementById("sessionTime");

document.addEventListener("DOMContentLoaded", function () {
    const smokyText = document.getElementById("smokyText");
    const smokeEffect = document.getElementById("smokeEffect");
    const dashboard = document.getElementById("dashboardContent");

    // Texto personalizado smoky
    const mensaje = "BIENVENIDO VASH";

    // Limpiar y construir texto con animaciones
    mensaje.split('').forEach((letra, i) => {
        const span = document.createElement('span');
        span.textContent = letra;
        span.style.animationDelay = `${3 + i * 0.1}s`;
        smokyText.appendChild(span);
    });

    // Mostrar dashboard después del efecto smoky (≈8s)
    setTimeout(() => {
        smokeEffect.style.display = "none";
        dashboard.style.display = "block";
    }, 8000);
});

// Verificar autenticación al cargar la página
function checkAuthentication() {
    const isAdmin = sessionStorage.getItem("isAdmin");
    const username = sessionStorage.getItem("username");
    
    // Si no hay sesión de admin, redirigir al login
    if (isAdmin !== "true" || !username) {
        alert("Acceso no autorizado. Redirigiendo al login...");
        window.location.href = "index.html";
        return false;
    }
    
    return true;
}

// Inicializar información de usuario y sesión
function initializeUserInfo() {
    const username = sessionStorage.getItem("username");
    const loginTime = sessionStorage.getItem("loginTime");
    
    // Actualizar mensaje de bienvenida
    if (username) {
        adminWelcome.textContent = `Bienvenido, ${username}`;
    }
    
    // Mostrar tiempo de inicio de sesión
    if (loginTime) {
        const loginDate = new Date(loginTime);
        const formattedTime = loginDate.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        sessionTime.textContent = formattedTime;
    }
}

// Función para cerrar sesión
function handleLogout() {
    // Confirmar antes de cerrar sesión
    const confirmLogout = confirm("¿Estás seguro de que deseas cerrar sesión?");
    
    if (confirmLogout) {
        // Mostrar efecto de cierre de sesión
        showLogoutEffect();
        
        // Limpiar datos de sesión después del efecto
        setTimeout(() => {
            sessionStorage.clear(); // Limpia todos los datos de la sesión
            window.location.href = "index.html"; // Redirige al login
        }, 1000);
    }
}

// Efecto visual para el cierre de sesión
function showLogoutEffect() {
    const logoutBtn = document.getElementById("logoutButton");
    
    // Cambiar estilo del botón temporalmente
    logoutBtn.style.transform = "scale(0.8) rotate(180deg)";
    logoutBtn.style.background = "linear-gradient(45deg, #ff6b6b, #ff8e8e)";
    
    // Mostrar mensaje de despedida
    const farewell = document.createElement("div");
    farewell.textContent = "Cerrando sesión...";
    farewell.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 64, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 0 30px var(--color-primario);
    `;
    
    document.body.appendChild(farewell);
    
    // Remover mensaje después del efecto
    setTimeout(() => {
        if (farewell.parentNode) {
            farewell.parentNode.removeChild(farewell);
        }
    }, 900);
}

// Función para manejar navegación a repositorios
function handleRepositoriosClick() {
    // Mostrar efecto de carga
    showNavigationEffect(repositoriosBtn, "Cargando repositorios...");
    
    // Simular navegación (aquí conectarás con repositorios.html)
    setTimeout(() => {
        // window.location.href = "repositorios.html";
        //alert("Función de repositorios será implementada próximamente");
    }, 1500);
}

// Función para manejar navegación a videos
function handleVideosClick() {
    // Mostrar efecto de carga
    showNavigationEffect(videosBtn, "Cargando videos...");
    
    // Simular navegación (aquí conectarás con videos.html)
    setTimeout(() => {
        // window.location.href = "videos.html";
        //alert("Función de videos será implementada próximamente");
    }, 1500);
}

// Efecto visual para navegación entre módulos
function showNavigationEffect(button, message) {
    const originalText = button.querySelector("span").textContent;
    
    // Cambiar texto y estilo del botón
    button.querySelector("span").textContent = message;
    button.style.transform = "scale(0.95)";
    button.disabled = true;
    
    // Crear indicador de carga
    const loader = document.createElement("div");
    loader.textContent = "⚡";
    loader.style.cssText = `
        display: inline-block;
        margin-left: 10px;
        animation: spin 1s linear infinite;
    `;
    
    button.querySelector("span").appendChild(loader);
    
    // Restaurar estado original después del efecto
    setTimeout(() => {
        button.querySelector("span").textContent = originalText;
        button.style.transform = "scale(1)";
        button.disabled = false;
    }, 1500);
}

// Función para manejar botones deshabilitados
function handleDisabledClick(buttonName) {
    alert(`La función de ${buttonName} estará disponible en futuras versiones.`);
}

// Event listeners para todos los botones
function setupEventListeners() {
    // Botón de cerrar sesión
    logoutButton.addEventListener("click", handleLogout);
    
    // Botones de navegación principal
    repositoriosBtn.addEventListener("click", handleRepositoriosClick);
    videosBtn.addEventListener("click", handleVideosClick);
    
    // Botones deshabilitados
    //configBtn.addEventListener("click", () => handleDisabledClick("Configuración"));
    //statsBtn.addEventListener("click", () => handleDisabledClick("Estadísticas"));
    
    // Event listener para prevenir cierre accidental de la ventana
    window.addEventListener("beforeunload", function(event) {
        event.preventDefault();
        event.returnValue = "¿Estás seguro de que deseas salir? Se cerrará tu sesión.";
    });
}

// Función para actualizar el tiempo de sesión en tiempo real
function updateSessionTimer() {
    const loginTime = sessionStorage.getItem("loginTime");
    
    if (loginTime) {
        const startTime = new Date(loginTime);
        const currentTime = new Date();
        const timeDiff = Math.floor((currentTime - startTime) / 1000); // en segundos
        
        const hours = Math.floor(timeDiff / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        const seconds = timeDiff % 60;
        
        // Crear elemento para mostrar duración de sesión si no existe
        let sessionDuration = document.getElementById("sessionDuration");
        if (!sessionDuration) {
            sessionDuration = document.createElement("p");
            sessionDuration.id = "sessionDuration";
            document.querySelector(".session-info").appendChild(sessionDuration);
        }
        
        sessionDuration.innerHTML = `Duración de sesión: <span class="status-active">${hours}h ${minutes}m ${seconds}s</span>`;
    }
}

// Función para verificar la validez de la sesión periódicamente
function sessionHealthCheck() {
    const isAdmin = sessionStorage.getItem("isAdmin");
    const loginTime = sessionStorage.getItem("loginTime");
    
    // Verificar si la sesión es válida
    if (isAdmin !== "true" || !loginTime) {
        alert("Sesión expirada o inválida. Redirigiendo al login...");
        sessionStorage.clear();
        window.location.href = "index.html";
        return;
    }
    
    // Verificar si la sesión ha durado más de 8 horas (opcional)
    const startTime = new Date(loginTime);
    const currentTime = new Date();
    const hoursPassed = (currentTime - startTime) / (1000 * 60 * 60);
    
    if (hoursPassed > 8) {
        const extendSession = confirm("Tu sesión ha durado más de 8 horas. ¿Deseas extenderla?");
        if (extendSession) {
            sessionStorage.setItem("loginTime", new Date().toISOString());
        } else {
            handleLogout();
        }
    }
}

// Función principal de inicialización
function initializeDashboard() {
    // Verificar autenticación
    if (!checkAuthentication()) {
        return;
    }
    
    // Inicializar información del usuario
    initializeUserInfo();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Iniciar timer de sesión
    setInterval(updateSessionTimer, 1000);
    
    // Verificar salud de la sesión cada 5 minutos
    setInterval(sessionHealthCheck, 5 * 60 * 1000);
    
    console.log("Dashboard inicializado correctamente");
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", initializeDashboard);

// Función de utilidad para debugging (remover en producción)
function debugInfo() {
    console.log("=== DEBUG INFO ===");
    console.log("isAdmin:", sessionStorage.getItem("isAdmin"));
    console.log("username:", sessionStorage.getItem("username"));
    console.log("loginTime:", sessionStorage.getItem("loginTime"));
    console.log("==================");
}

// Exponer función de debug al objeto window para acceso desde consola
window.debugInfo = debugInfo;

// ============ VERSIÓN SIMPLE - AGREGAR AL FINAL DE inicio.js ============

document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación directa para repositorios
    document.getElementById('repositoriosBtn').addEventListener('click', function() {
        window.location.href = 'repositorios.html';
    });
    
    // Navegación directa para videos
    document.getElementById('videosBtn').addEventListener('click', function() {
        window.location.href = 'videos.html';
    });
    
    // Para configuración (cuando esté listo)
    document.getElementById('configBtn').addEventListener('click', function() {
    window.location.href = 'config.html';
     });
});
//hola

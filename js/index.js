// Configuración de credenciales de administrador
const ADMIN_CREDENTIALS = {
    username: "vash01",
    password: "v@sh@dmin"
};

// Elementos del DOM que necesitamos manipular
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");

// Función para mostrar/ocultar contraseña
function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Cambiar el icono del botón
    togglePasswordBtn.textContent = type === 'password' ? '🙈' : '🙊';
}

// Event listener para el botón de mostrar/ocultar contraseña
togglePasswordBtn.addEventListener("click", togglePasswordVisibility);

// Event listener para el envío del formulario
loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío normal del formulario
    
    // Obtener los valores ingresados por el usuario
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value;
    
    // Validar las credenciales ingresadas
    validateCredentials(enteredUsername, enteredPassword);
});

// Función principal para validar credenciales
function validateCredentials(username, password) {
    console.log("Validando credenciales:", username, password); // Debug
    
    // Ocultar mensaje de error si estaba visible
    hideErrorMessage();
    
    // Verificar si las credenciales coinciden con las del administrador
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        console.log("Credenciales correctas"); // Debug
        // Si las credenciales son correctas, proceder con login de admin
        handleAdminLogin();
    } else {
        console.log("Credenciales incorrectas"); // Debug
        // Si las credenciales son incorrectas, mostrar mensaje de error
        handleInvalidLogin();
    }
}

// Función para manejar login exitoso de administrador
function handleAdminLogin() {
    console.log("Login exitoso - Redirigiendo a inicio.html"); // Debug
    
    // Guardar información de sesión en sessionStorage
    sessionStorage.setItem("isAdmin", "true");
    sessionStorage.setItem("username", ADMIN_CREDENTIALS.username);
    sessionStorage.setItem("loginTime", new Date().toISOString());
    
    // Mostrar efecto de carga antes de redirigir
    showLoadingEffect();
    
    // Redirigir a la página de inicio después de un breve delay
    setTimeout(() => {
        window.location.href = "inicio.html";
    }, 1500);
}

// Función para manejar login inválido
function handleInvalidLogin() {
    console.log("Credenciales incorrectas"); // Debug
    
    // Mostrar mensaje de error con animación
    showErrorMessage();
    
    // Limpiar los campos del formulario
    clearFormFields();
    
    // Auto-ocultar el mensaje de error después de 5 segundos
    setTimeout(hideErrorMessage, 5000);
}

// Función para mostrar mensaje de error
function showErrorMessage() {
    errorMessage.style.display = "block";
    errorMessage.style.animation = "errorShake 0.5s ease-in-out";
}

// Función para ocultar mensaje de error
function hideErrorMessage() {
    errorMessage.style.display = "none";
}

// Función para limpiar los campos del formulario
function clearFormFields() {
    usernameInput.value = "";
    passwordInput.value = "";
    usernameInput.focus(); // Enfocar el campo de usuario
}

// Función para mostrar efecto de carga durante login exitoso
function showLoadingEffect() {
    const loginBtn = document.querySelector(".login-btn");
    const originalText = loginBtn.textContent;
    
    // Cambiar texto del botón y añadir animación
    loginBtn.textContent = "ACCEDIENDO...";
    loginBtn.style.animation = "pulseGlow 0.5s ease-in-out infinite alternate";
    loginBtn.disabled = true;
    
    // Restaurar estado original después del delay
    setTimeout(() => {
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    }, 1500);
}

// Función para manejar el evento de tecla Enter en los campos
function handleEnterKey(event) {
    if (event.key === "Enter") {
        loginForm.dispatchEvent(new Event("submit"));
    }
}

// Agregar event listeners para tecla Enter en los campos
usernameInput.addEventListener("keypress", handleEnterKey);
passwordInput.addEventListener("keypress", handleEnterKey);

// Función para verificar si ya hay una sesión activa al cargar la página
function checkExistingSession() {
    const isAdmin = sessionStorage.getItem("isAdmin");
    
    // Si ya hay una sesión de admin activa, redirigir automáticamente
    if (isAdmin === "true") {
        window.location.href = "inicio.html";
    }
}

// Verificar sesión existente cuando se carga la página
document.addEventListener("DOMContentLoaded", checkExistingSession);

// Función para limpiar la sesión (útil para debugging)
function clearSession() {
    sessionStorage.clear();
    console.log("Sesión limpiada");
}

// Efecto visual adicional: enfocar automáticamente el campo de usuario
document.addEventListener("DOMContentLoaded", function() {
    usernameInput.focus();
});
//hola
